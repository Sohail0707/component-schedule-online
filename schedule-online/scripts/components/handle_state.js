import { INPUT_ELS } from '../components/input_el.js';
import { INIT_LOCATION_PAGE } from '../pages/02_location.js';
import { INIT_APPOINTMENT_PAGE } from '../pages/03_appointment.js';
import { INIT_PERSONAL_DETAILS_PAGE } from '../pages/04_personal-details.js';
import { INIT_CARD_DETAILS_PAGE } from '../pages/05_card-details.js';
import { INIT_CONFIRMATION_PAGE } from '../pages/06_confirmation.js';

export const BILLING_DATA = {};
export function assign_to_billing_data(key, value) {
	BILLING_DATA[key] = value;
}
export function remove_billing_data(key) {
	delete BILLING_DATA[key];
}

export const FORM_DATA = {};
export function assign_to_form_data(key, value) {
	FORM_DATA[key] = value;
	// console.log(FORM_DATA);
}
export function remove_form_data(key) {
	delete FORM_DATA[key];
}

export const PAGES = {};
export function assign_to_pages_obj(key, value) {
	PAGES[key] = value;
	// console.log(PAGES);
}

export let PAGE_INDEX = 0;
export function set_page_index(value) {
	PAGE_INDEX = value;
}

export const validation_status = {
	_service: false,
	_location: false,
	_appointment: false,
	_personal_details: false,
	_card_details: false,
	_confirmation: false,
};
export function set_validation_status(key, value) {
	validation_status[key] = value;
}

export const main_page_container = document.querySelector('#__SCHEDULE-ONLINE__LARGE .schedule-online__page-container');

export const navigation_container = document.querySelector('#__SCHEDULE-ONLINE__LARGE .schedule-online__navigation');

export async function loadHTMLContent(filePath) {
	try {
		const response = await fetch(filePath); // Fetch the external HTML file
		if (response.ok) {
			const htmlContent = await response.text(); // Get the HTML content as a string
			return htmlContent; // Return the HTML content
		} else {
			console.error('Failed to load file:', response.status);
			return null;
		}
	} catch (error) {
		console.error('Error fetching the file:', error);
		return null;
	}
}

export const nextBtn = document.createElement('button');
nextBtn.className = 'schedule-online__btn schedule-online__btn--next';
nextBtn.innerHTML = `<span class="text">next</span>`;

export const previousBtn = document.createElement('button');
previousBtn.className = 'schedule-online__btn schedule-online__btn--previous';
previousBtn.innerHTML = `<span class="text">previous</span>`;

export const scheduleBtn = document.createElement('button');
scheduleBtn.className = 'schedule-online__btn schedule-online__btn--schedule';
scheduleBtn.innerHTML = `<span class="text">schedule</span>`;

export const closeBtn = document.createElement('button');
closeBtn.className = 'schedule-online__btn schedule-online__btn--close';
closeBtn.innerHTML = `<span class="text">close</span>`;

nextBtn.addEventListener('click', () => {
	switch (PAGE_INDEX) {
		case 0:
			{
				if (validation_status._service === true) {
					if (PAGES._location) {
						setTimeout(() => {
							navigateTo(PAGES._location, 'left');
							PAGE_INDEX++;
							set_button_visibility();
						}, 50);
					} else {
						loadHTMLContent('/schedule-online/markup/pages/page__location.html').then((htmlContent) => {
							if (htmlContent) {
								const tempDiv = document.createElement('div');
								tempDiv.innerHTML = htmlContent;
								assign_to_pages_obj('_location', tempDiv.firstElementChild);
								navigateTo(PAGES._location, 'left');
								PAGE_INDEX++;
								set_button_visibility();
								INIT_LOCATION_PAGE();
							}
						});
					}
				}
			}

			break;
		case 1:
			{
				if (validation_status._location === true) {
					if (PAGES._appointment) {
						setTimeout(() => {
							navigateTo(PAGES._appointment, 'left');
							PAGE_INDEX++;
							set_button_visibility();
						}, 50);
					} else {
						loadHTMLContent('/schedule-online/markup/pages/page__appointment.html').then((htmlContent) => {
							if (htmlContent) {
								const tempDiv = document.createElement('div');
								tempDiv.innerHTML = htmlContent;
								assign_to_pages_obj('_appointment', tempDiv.firstElementChild);
								navigateTo(PAGES._appointment, 'left');
								PAGE_INDEX++;
								set_button_visibility();
								INIT_APPOINTMENT_PAGE();
							}
						});
					}
				}
			}

			break;
		case 2:
			{
				if (validation_status._appointment === true) {
					if (PAGES._personal_details) {
						setTimeout(() => {
							navigateTo(PAGES._personal_details, 'left');
							PAGE_INDEX++;
							set_button_visibility();
						}, 50);
					} else {
						loadHTMLContent('/schedule-online/markup/pages/page__personal-details.html').then((htmlContent) => {
							if (htmlContent) {
								const tempDiv = document.createElement('div');
								tempDiv.innerHTML = htmlContent;
								assign_to_pages_obj('_personal_details', tempDiv.firstElementChild);
								navigateTo(PAGES._personal_details, 'left');
								PAGE_INDEX++;
								set_button_visibility();
								INIT_PERSONAL_DETAILS_PAGE();
							}
						});
					}
				}
			}

			break;
		case 3:
			{
				Object.values(INPUT_ELS.personal_details).forEach((field) => {
					field.focus();
					field.blur();
				});

				if (validation_status._personal_details === true) {
					if (PAGES._card_details) {
						setTimeout(() => {
							navigateTo(PAGES._card_details, 'left');
							PAGE_INDEX++;
							set_button_visibility();
						}, 50);
					} else {
						loadHTMLContent('/schedule-online/markup/pages/page__card-details.html').then((htmlContent) => {
							if (htmlContent) {
								const tempDiv = document.createElement('div');
								tempDiv.innerHTML = htmlContent;
								assign_to_pages_obj('_card_details', tempDiv.firstElementChild);
								navigateTo(PAGES._card_details, 'left');

								PAGE_INDEX++;
								set_button_visibility();
								INIT_CARD_DETAILS_PAGE();
							}
						});
					}
				}
			}

			break;
		case 4:
			{
				Object.values(INPUT_ELS.card_details).forEach((field) => {
					field.focus();
					field.blur();
				});
				if (validation_status._card_details === true) {
					if (PAGES._confirmation) {
						setTimeout(() => {
							navigateTo(PAGES._confirmation, 'left');
							PAGE_INDEX++;
							set_button_visibility();
						}, 50);
					} else {
						const handleAsyncClick = async () => {
							nextBtn.disabled = true; // Disable the button to prevent double submissions
							try {
								console.log('Starting Stripe tokenization...');
								const stripeToken = await call_stripe();
								assign_to_form_data('cc_stripe_token', stripeToken);
								console.log('Stripe tokenization completed successfully.');

								const htmlContent = await loadHTMLContent('/schedule-online/markup/pages/page__confirmation.html');
								if (htmlContent) {
									const tempDiv = document.createElement('div');
									tempDiv.innerHTML = htmlContent;
									assign_to_pages_obj('_confirmation', tempDiv.firstElementChild);
									navigateTo(PAGES._confirmation, 'left');
									PAGE_INDEX++;
									set_button_visibility();
									INIT_CONFIRMATION_PAGE();
									nextBtn.disabled = false;
								}
							} catch (error) {
								console.error('Error during Stripe tokenization or page loading:', error);
								if (error.message) {
									document.querySelector('.payment-errors').textContent = error.message;
								}
								nextBtn.disabled = false;
							}
						};

						function call_stripe() {
							return new Promise((resolve, reject) => {
								Stripe.setPublishableKey('pk_live_teLWodrvq2Y45VeKsBquEExH');

								Stripe.card.createToken(BILLING_DATA, function (status, response) {
									if (response.error) {
										reject(response.error);
									} else {
										resolve(response.id); // Return the token
									}
								});
							});
						}

						handleAsyncClick();
					}
				}
			}

			break;

		default:
			console.log(`no page found for ${PAGE_INDEX}`);

			break;
	}
});

previousBtn.addEventListener('click', () => {
	switch (PAGE_INDEX) {
		case 1:
			{
				navigateTo(PAGES._service, 'right');
				PAGE_INDEX--;
			}
			break;
		case 2:
			{
				navigateTo(PAGES._location, 'right');
				PAGE_INDEX--;
			}
			break;
		case 3:
			{
				navigateTo(PAGES._appointment, 'right');
				PAGE_INDEX--;
			}
			break;
		case 4:
			{
				navigateTo(PAGES._confirmation, 'right');
				PAGE_INDEX--;
			}
			break;
		case 5:
			{
				navigateTo(PAGES._card_details, 'right');
				PAGE_INDEX--;
			}
			break;

		default:
			console.log(`no page found for ${PAGE_INDEX}`);
			break;
	}
	set_button_visibility();
});

scheduleBtn.addEventListener('click', () => {
	// Self test
	if (FORM_DATA.service) {
		if (FORM_DATA.address) {
			if (FORM_DATA.time_slot) {
				if (FORM_DATA.first_name && FORM_DATA.last_name && FORM_DATA.phone && FORM_DATA.email) {
					if (FORM_DATA.cc_stripe_token && FORM_DATA.cc_cvc && FORM_DATA.cc_exp_year && FORM_DATA.cc_exp_month) {
					}
				}
			}
		}
	}
});

function set_button_visibility() {
	switch (PAGE_INDEX) {
		case 0:
			{
				navigation_container.contains(scheduleBtn) ? scheduleBtn.remove() : '';
				navigation_container.contains(previousBtn) ? previousBtn.remove() : '';
				navigation_container.contains(nextBtn) ? '' : navigation_container.appendChild(nextBtn);
			}

			break;
		case 1:
			{
				navigation_container.contains(scheduleBtn) ? scheduleBtn.remove() : '';
				navigation_container.contains(nextBtn) ? nextBtn.remove() : '';

				navigation_container.contains(previousBtn) ? '' : navigation_container.appendChild(previousBtn);
				navigation_container.appendChild(nextBtn);
			}

			break;
		case 2:
			{
				navigation_container.contains(scheduleBtn) ? scheduleBtn.remove() : '';
				navigation_container.contains(nextBtn) ? nextBtn.remove() : '';

				navigation_container.contains(previousBtn) ? '' : navigation_container.appendChild(previousBtn);
				navigation_container.appendChild(nextBtn);
			}

			break;
		case 3:
			{
				navigation_container.contains(scheduleBtn) ? scheduleBtn.remove() : '';
				navigation_container.contains(nextBtn) ? nextBtn.remove() : '';

				navigation_container.contains(previousBtn) ? '' : navigation_container.appendChild(previousBtn);
				navigation_container.appendChild(nextBtn);
			}

			break;
		case 4:
			{
				navigation_container.contains(scheduleBtn) ? scheduleBtn.remove() : '';
				navigation_container.contains(nextBtn) ? nextBtn.remove() : '';

				navigation_container.contains(previousBtn) ? '' : navigation_container.appendChild(previousBtn);
				navigation_container.appendChild(nextBtn);
			}

			break;
		case 5:
			{
				navigation_container.contains(scheduleBtn) ? scheduleBtn.remove() : '';
				navigation_container.contains(nextBtn) ? nextBtn.remove() : '';

				navigation_container.contains(previousBtn) ? '' : navigation_container.appendChild(previousBtn);
				navigation_container.appendChild(scheduleBtn);
			}

			break;

		default:
			break;
	}
}

function navigateTo(newEl, direction = ['left', 'right']) {
	for (const [name, currentEl] of Object.entries(PAGES)) {
		if (document.contains(currentEl)) {
			// console.log(newEl.offsetHeight);
			// main_page_container.style.maxHeight = `${newEl.offsetHeight}px`;
			if (direction === 'left') {
				currentEl.classList.add('exit-left');
				newEl.classList.add('enter-left');
				main_page_container.appendChild(newEl);
				setTimeout(() => {
					currentEl.classList.remove('exit-left');
					newEl.classList.remove('enter-left');
					currentEl.remove();
				}, 300);
			}

			if (direction === 'right') {
				currentEl.classList.add('exit-right');
				newEl.classList.add('enter-right');
				main_page_container.appendChild(newEl);
				setTimeout(() => {
					currentEl.classList.remove('exit-right');
					newEl.classList.remove('enter-right');
					currentEl.remove();
				}, 300);
			}
			break;
		}
	}
}
