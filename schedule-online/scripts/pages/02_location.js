import { predict_location } from '../components/predict_location.js';
import { set_validation_status } from '../components/handle_state.js';
import { assign_to_input_el, INPUT_ELS, init_input_el } from '../components/input_el.js';

let typingTimer; // Timer identifier
const doneTypingInterval = 1000; // Time in ms (1 second)
let firstKeyPressed = false;

export function initLocationPage() {
	assign_to_input_el('location', 'address_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .location--input-box'));

	assign_to_input_el('location', 'address_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .location--input-field'));

	assign_to_input_el('location', 'address_box_icon', document.querySelector('#__SCHEDULE-ONLINE__LARGE .location--input-box .icon'));

	init_input_el();

	// This function will be called as the use stops typing for 1 second. This will minimize the API calling
	INPUT_ELS.location.address_field.addEventListener('input', (event) => {
		if (!firstKeyPressed) {
			set_validation_status('location__page', false); // Seting the status to false
			event.target.classList.add('loading'); // Displaying the loading icon

			event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';

			event.target.classList.contains('valid') ? event.target.classList.remove('valid') : '';
			firstKeyPressed = true;
		}
		clearTimeout(typingTimer); // Clear the previous timer if the user is still typing
		typingTimer = setTimeout(() => {
			event.target.value == '' ? '' : predict_location(event.target.value);
			firstKeyPressed = false;
		}, doneTypingInterval); // Set a new timer for calling the function after 1 second
	});
	INPUT_ELS.location.address_field.addEventListener('focus', (event) => {
		event.target.classList.contains('invalid') ? event.target.classList.remove('invalid') : '';
	});

	// locationPageInputBoxes.inputField.addEventListener('blur', () => {
	// 	console.log(locationPageInputBoxes.inputField.value);
	// });
}
