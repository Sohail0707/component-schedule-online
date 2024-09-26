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
	assign_to_form_data,
} from '../components/handle_state.js';
import { add_icons } from '../components/iconpack.js';

import { assign_to_input_el, INPUT_ELS, init_input_el, mark_as_invalid, mark_as_valid, add_placeholder } from '../components/input_el.js';
import { INIT_CARD_DETAILS_PAGE } from './05_card-details.js';

export function INIT_PERSONAL_DETAILS_PAGE() {
	assign_to_input_el('personal_details', 'first_name_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .first-name--input-box'));
	assign_to_input_el('personal_details', 'first_name_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .first-name--input-field'));

	assign_to_input_el('personal_details', 'last_name_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .last-name--input-box'));
	assign_to_input_el('personal_details', 'last_name_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .last-name--input-field'));

	assign_to_input_el('personal_details', 'phone_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .phone--input-box'));
	assign_to_input_el('personal_details', 'phone_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .phone--input-field'));

	assign_to_input_el('personal_details', 'email_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .email--input-box'));
	assign_to_input_el('personal_details', 'email_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .email--input-field'));

	assign_to_input_el('personal_details', 'note_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .note--input-box'));
	assign_to_input_el('personal_details', 'note_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .note--input-field'));

	init_input_el();
	add_icons();

	//================== First Name Event Listener ===================//
	INPUT_ELS.personal_details.first_name_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
	});
	INPUT_ELS.personal_details.first_name_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
	});
	INPUT_ELS.personal_details.first_name_field.addEventListener('blur', (event) => {
		event.target.value != ''
			? (event.target.value = event.target.value
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '))
			: ''; // This will capitalize the first letter of each word

		if (event.target.value === '') {
			input_validation_status.first_name = false;
			mark_as_invalid(event.target, 'First name cannot be empty');
		} else {
			assign_to_form_data('first_name', event.target.value);
			input_validation_status.first_name = true;
			mark_as_valid(event.target);
		}
	});

	//================== Last Name Event Listener ====================//
	INPUT_ELS.personal_details.last_name_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
	});
	INPUT_ELS.personal_details.last_name_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
	});
	INPUT_ELS.personal_details.last_name_field.addEventListener('blur', (event) => {
		event.target.value != ''
			? (event.target.value = event.target.value
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '))
			: ''; // This will capitalize the first letter of each word

		if (event.target.value === '') {
			input_validation_status.last_name = false;
			mark_as_invalid(event.target, 'Last name cannot be empty');
		} else {
			assign_to_form_data('last_name', event.target.value);
			input_validation_status.last_name = true;
			mark_as_valid(event.target);
		}
	});

	//================ Phone Number Event Listener =================//
	INPUT_ELS.personal_details.phone_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
		event.target.classList.contains('placeholder') ? event.target.classList.remove('placeholder') : '';
	});
	INPUT_ELS.personal_details.phone_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
	});
	INPUT_ELS.personal_details.phone_field.addEventListener('blur', (event) => {
		let input = event.target.value;
		if (input === '') {
			input_validation_status.phone_number = false;

			mark_as_invalid(event.target, 'Phone number cannot be empty');
		} else if (input.length != 10) {
			input_validation_status.phone_number = false;

			mark_as_invalid(event.target, 'Phone number should have 10 digits');
		} else if (input.length === 10) {
			let convertedValue = `(${input.slice(0, 3)}) ${input.slice(3, 6)} ${input.slice(6)}`;
			assign_to_form_data('phone', event.target.value);
			input_validation_status.phone_number = true;
			mark_as_valid(event.target);
			add_placeholder(event.target, convertedValue);
		}
	});

	//================= Email Address Event Listener =================//
	INPUT_ELS.personal_details.email_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
	});
	INPUT_ELS.personal_details.email_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[ ]/g, '');
	});
	INPUT_ELS.personal_details.email_field.addEventListener('blur', (event) => {
		const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (!emailPattern.test(event.target.value)) {
			input_validation_status.email = false;
			mark_as_invalid(event.target, 'Please enter a valid email');
		} else {
			assign_to_form_data('email', event.target.value);
			input_validation_status.email = true;
			mark_as_valid(event.target);
		}
	});

	//================= Email Address Event Listener =================//
	INPUT_ELS.personal_details.note_field.addEventListener('blur', (event) => {
		assign_to_form_data('notes', event.target.value);
	});

	nextBtn.addEventListener('click', () => {
		INPUT_ELS.personal_details.first_name_field.blur();
		INPUT_ELS.personal_details.last_name_field.blur();
		INPUT_ELS.personal_details.phone_field.blur();
		INPUT_ELS.personal_details.email_field.blur();
		INPUT_ELS.personal_details.note_field.blur();

		if (
			input_validation_status.first_name +
				input_validation_status.last_name +
				input_validation_status.phone_number +
				input_validation_status.email ===
			4
		) {
			set_validation_status('_personal_details', true);
			console.log(FORM_DATA);
		} else {
			set_validation_status('_personal_details', false);
		}

		if (PAGE_INDEX === 3 && validation_status._personal_details === true) {
			loadHTMLContent('/schedule-online/markup/pages/page__card-details.html').then((htmlContent) => {
				if (htmlContent) {
					const tempDiv = document.createElement('div');
					tempDiv.innerHTML = htmlContent;

					PAGES._personal_details.style.display = 'none';
					main_page_container.appendChild(tempDiv.firstElementChild);

					assign_to_pages_obj('_card_details', document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__card-details'));
					set_page_index(4);

					INIT_CARD_DETAILS_PAGE();
				}
			});
		}
	});
}

const input_validation_status = {
	first_name: false,
	last_name: false,
	phone_number: false,
	email: false,
};
