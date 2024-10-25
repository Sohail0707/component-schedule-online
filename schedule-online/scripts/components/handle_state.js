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
	console.log(FORM_DATA);
}
export function remove_form_data(key) {
	delete FORM_DATA[key];
}

export const PAGES = {};
export function assign_to_pages_obj(key, value) {
	PAGES[key] = value;
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
