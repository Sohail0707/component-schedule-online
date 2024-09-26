import {
	main_page_container,
	nextBtn,
	previousBtn,
	PAGE_INDEX,
	PAGES,
	assign_to_pages_obj,
	validation_status,
	loadHTMLContent,
	set_page_index,
	set_validation_status,
	FORM_DATA,
	BILLING_DATA,
	assign_to_form_data,
	assign_to_billing_data,
	remove_billing_data,
} from '../components/handle_state.js';
import { add_icons } from '../components/iconpack.js';

import { assign_to_input_el, INPUT_ELS, init_input_el, mark_as_invalid, mark_as_valid, add_placeholder } from '../components/input_el.js';

export function INIT_CARD_DETAILS_PAGE() {
	assign_to_input_el('card_details', 'card_number_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .card-number--input-box'));
	assign_to_input_el('card_details', 'card_number_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .card-number--input-field'));

	assign_to_input_el('card_details', 'expiration_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .expiration--input-box'));
	assign_to_input_el('card_details', 'expiration_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .expiration--input-field'));

	assign_to_input_el('card_details', 'cvc_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .cvc--input-box'));
	assign_to_input_el('card_details', 'cvc_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .cvc--input-field'));

	assign_to_input_el('card_details', 'zipcode_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .zipcode--input-box'));
	assign_to_input_el('card_details', 'zipcode_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .zipcode--input-field'));

	init_input_el();
	add_icons();

	//================== Credit Card Event Listener ===================//
	INPUT_ELS.card_details.card_number_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
		event.target.classList.contains('placeholder') ? event.target.classList.remove('placeholder') : '';
	});
	INPUT_ELS.card_details.card_number_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
	});
	INPUT_ELS.card_details.card_number_field.addEventListener('blur', (event) => {
		let input = event.target.value;
		if (input === '') {
			remove_billing_data('number');
			input_validation_status.card_number = false;
			mark_as_invalid(event.target, 'please enter a card number');
		} else if (luhnAlgorithm(input)) {
			let convertedValue = `${input.slice(0, 4)} ${input.slice(4, 8)} ${input.slice(8, 12)} ${input.slice(12, 16)}`;
			assign_to_billing_data('number', input);
			input_validation_status.card_number = true;
			mark_as_valid(event.target);
			add_placeholder(event.target, convertedValue);
		} else {
			mark_as_invalid(event.target, 'please enter a valid card number');
		}
	});

	//================== Expiration Event Listener ===================//
	INPUT_ELS.card_details.expiration_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
		event.target.classList.contains('placeholder') ? event.target.classList.remove('placeholder') : '';
	});
	INPUT_ELS.card_details.expiration_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^0-9\/-]/g, '');
	});
	INPUT_ELS.card_details.expiration_field.addEventListener('blur', (event) => {
		const regEx = /^(\d{4}|\d{6}|\d{2}-\d{2}|\d{2}-\d{4}|\d{2}\/\d{2}|\d{2}\/\d{4})$/;
		let input = event.target.value;

		if (input === '') {
			remove_billing_data('exp_month');
			remove_billing_data('exp_year');
			input_validation_status.expiration_month = false;
			input_validation_status.expiration_year = false;
			mark_as_invalid(event.target, 'please enter expiration');
		} else if (regEx.test(input)) {
			const cleanInput = input.replace(/[-/]/g, '');
			const result = checkExpiration(cleanInput);
			let convertedValue = `${result.month} / ${result.year}`;

			if (result.isExpired) {
				remove_billing_data('exp_month');
				remove_billing_data('exp_year');
				input_validation_status.expiration_month = false;
				input_validation_status.expiration_year = false;
				mark_as_invalid(event.target, 'card is expired');
				add_placeholder(event.target, convertedValue);
			}
			if (!result.isExpired) {
				assign_to_billing_data('exp_month', result.month);
				assign_to_billing_data('exp_year', result.year);
				input_validation_status.expiration_month = true;
				input_validation_status.expiration_year = true;
				mark_as_valid(event.target);
				add_placeholder(event.target, convertedValue);
			}
		} else {
			mark_as_invalid(event.target, 'try typing MMYY or MMYYYY');
		}
	});

	//================== CVC Event Listener ===================//
	INPUT_ELS.card_details.cvc_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
		event.target.classList.contains('placeholder') ? event.target.classList.remove('placeholder') : '';
	});
	INPUT_ELS.card_details.cvc_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
	});
	INPUT_ELS.card_details.cvc_field.addEventListener('blur', (event) => {
		let input = event.target.value;
		if (input === '') {
			remove_billing_data('cvc');
			input_validation_status.cvc = false;
			mark_as_invalid(event.target, 'please enter a CVC');
		} else if (input.length >= 3 && input.length <= 5) {
			assign_to_billing_data('cvc', input);
			input_validation_status.cvc = true;
			mark_as_valid(event.target);
		} else {
			mark_as_invalid(event.target, 'please enter a valid CVC');
		}
	});

	//================== Zipcode Event Listener ===================//
	INPUT_ELS.card_details.zipcode_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
		event.target.classList.contains('placeholder') ? event.target.classList.remove('placeholder') : '';
	});
	INPUT_ELS.card_details.zipcode_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^0-9-]/g, '');
	});
	INPUT_ELS.card_details.zipcode_field.addEventListener('blur', (event) => {
		let input = event.target.value;
		const regEx = /^\d{5}(-\d{4})?$/;
		if (input === '') {
			remove_billing_data('address_zip');
			input_validation_status.zipcode = false;
			mark_as_invalid(event.target, 'please enter a zipcode');
		} else if (regEx.test(input)) {
			assign_to_billing_data('address_zip', input);
			input_validation_status.zipcode = true;
			mark_as_valid(event.target);
		} else {
			mark_as_invalid(event.target, 'please enter a valid zipcode');
		}
	});
}

const input_validation_status = {
	card_number: false,
	expiration_month: false,
	expiration_year: false,
	cvc: false,
	zipcode: false,
};

function luhnAlgorithm(cardNumber) {
	let digits = cardNumber.split('').map(Number);
	digits.reverse();

	let checksum = 0;
	for (let i = 0; i < digits.length; i++) {
		let digit = digits[i];
		if (i % 2 === 1) {
			digit *= 2;
			if (digit > 9) {
				digit -= 9;
			}
		}
		checksum += digit;
	}
	return checksum % 10 === 0;
}

function checkExpiration(exp) {
	// Convert the input to a string to handle slicing
	let expStr = exp.toString();

	// Extract month and year based on the length of the input
	let month, year;
	if (expStr.length === 4) {
		// Format: MMYY (e.g., 1027 -> 10/2027)
		month = expStr.substring(0, 2);
		year = parseInt(expStr.substring(2), 10);
	} else if (expStr.length === 6) {
		// Format: MMYYYY (e.g., 102027 -> 10/2027)
		month = expStr.substring(0, 2);
		year = parseInt(expStr.substring(2, 6), 10);
	} else {
		throw new Error('Invalid expiration date format. It should be either 4 or 6 digits.');
	}

	// If the year is 2 digits, convert it to 4 digits
	if (year < 100) {
		year += year < 50 ? 2000 : 1900;
	}

	// Ensure the month is always 2 digits
	month = month.padStart(2, '0');

	// Get the current date
	const today = new Date();
	const currentMonth = today.getMonth() + 1; // Months are 0-based, so +1
	const currentYear = today.getFullYear();

	// Check if the expiration date is in the past
	let isExpired = year < currentYear || (year === currentYear && parseInt(month, 10) < currentMonth);

	return {
		month: month,
		year: year,
		isExpired: isExpired,
	};
}
