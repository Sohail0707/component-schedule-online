import { PAGES, FORM_DATA } from '../components/handle_state.js';

export function INIT_CONFIRMATION_PAGE() {
	console.log('welcone to confirmation page');
	const this_page = PAGES._confirmation;
	this_page.querySelectorAll('*').forEach((child) => {
		if (child.innerHTML.includes('{_DURATION_}')) {
			child.innerHTML = child.innerHTML.replace('{_DURATION_}', FORM_DATA.service.hours);
		}

		if (child.innerHTML.includes('{_LOCATION_}')) {
			child.innerHTML = child.innerHTML.replace('{_LOCATION_}', FORM_DATA.address.formatted_address);
		}

		if (child.innerHTML.includes('{_EMAIL_}')) {
			child.innerHTML = child.innerHTML.replace('{_EMAIL_}', FORM_DATA.email);
		}

		if (child.innerHTML.includes('{_PHONE_}')) {
			child.innerHTML = child.innerHTML.replace(
				'{_PHONE_}',
				`(${FORM_DATA.phone.slice(0, 3)}) ${FORM_DATA.phone.slice(3, 6)} ${FORM_DATA.phone.slice(6)}`,
			);
		}

		if (child.innerHTML.includes('{_NAME_}')) {
			child.innerHTML = child.innerHTML.replace('{_NAME_}', `${FORM_DATA.first_name} ${FORM_DATA.last_name}`);
		}

		if (child.innerHTML.includes('{_CC_NUMBER_}')) {
			child.innerHTML = child.innerHTML.replace('{_CC_NUMBER_}', FORM_DATA.cc_number);
		}

		if (child.innerHTML.includes('{_CC_EXP_MONTH_}')) {
			child.innerHTML = child.innerHTML.replace('{_CC_EXP_MONTH_}', FORM_DATA.cc_exp_month);
		}

		if (child.innerHTML.includes('{_CC_EXP_YEAR_}')) {
			child.innerHTML = child.innerHTML.replace('{_CC_EXP_YEAR_}', FORM_DATA.cc_exp_year);
		}

		if (child.innerHTML.includes('{_PRICE_}')) {
			child.innerHTML = child.innerHTML.replace('{_PRICE_}', FORM_DATA.service.price);
		}

		if (child.innerHTML.includes('{_TIME_}')) {
			child.innerHTML = child.innerHTML.replace('{_TIME_}', 'Tuesday, September 26th 2024 at 8:45am');
		}

		if (child.innerHTML.includes('{_SERVICE_}')) {
			child.innerHTML = child.innerHTML.replace('{_SERVICE_}', FORM_DATA.service.name);
		}

		if (child.innerHTML.includes('{_NOTE_}')) {
			child.innerHTML = child.innerHTML.replace('{_NOTE_}', FORM_DATA.notes ? FORM_DATA.notes : 'null');
		}
	});
}
