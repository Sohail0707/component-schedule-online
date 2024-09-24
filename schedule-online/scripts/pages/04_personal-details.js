import { assign_to_input_el, INPUT_ELS, init_input_el, mark_as_invalid, mark_as_valid, add_placeholder } from '../components/input_el.js';

export function initCustomerDetailsPage() {
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

	//================== First Name Event Listener ===================//
	INPUT_ELS.personal_details.first_name_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
	});
	INPUT_ELS.personal_details.first_name_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
		inputValues['first_name'] = event.target.value;
	});
	INPUT_ELS.personal_details.first_name_field.addEventListener('blur', (event) => {
		event.target.value != ''
			? (event.target.value = event.target.value
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '))
			: ''; // This will capitalize the first letter of each word
		event.target.value === '' ? mark_as_invalid(event.target, 'First name cannot be empty') : mark_as_valid(event.target);
	});

	//================== Last Name Event Listener ====================//
	INPUT_ELS.personal_details.last_name_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
	});
	INPUT_ELS.personal_details.last_name_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, '');
		inputValues['last_name'] = event.target.value;
	});
	INPUT_ELS.personal_details.last_name_field.addEventListener('blur', (event) => {
		event.target.value != ''
			? (event.target.value = event.target.value
					.split(' ')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '))
			: ''; // This will capitalize the first letter of each word
		event.target.value === '' ? mark_as_invalid(event.target, 'Last name cannot be empty') : mark_as_valid(event.target);
	});

	//================ Phone Number Event Listener =================//
	INPUT_ELS.personal_details.phone_field.addEventListener('focus', (event) => {
		event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
		event.target.classList.contains('placeholder') ? event.target.classList.remove('placeholder') : '';
	});
	INPUT_ELS.personal_details.phone_field.addEventListener('input', (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g, '');
		inputValues['phone_no'] = event.target.value;
	});
	INPUT_ELS.personal_details.phone_field.addEventListener('blur', (event) => {
		let input = event.target.value;
		if (input === '') {
			mark_as_invalid(event.target, 'Phone number cannot be empty');
		} else if (input.length != 10) {
			mark_as_invalid(event.target, 'Phone number should have 10 digits');
		} else if (input.length === 10) {
			let convertedValue = `(${input.slice(0, 3)}) ${input.slice(3, 6)} ${input.slice(6)}`;
			mark_as_valid(event.target);
			add_placeholder(event.target, convertedValue);
		}
	});
}

//========== Stores the input field original values ==========//
const inputValues = {};
