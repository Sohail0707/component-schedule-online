import {
	navigation_container,
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
} from '../components/handle_state.js';

import { add_icons } from '../components/iconpack.js';
import { predict_location } from '../components/predict_location.js';
import { assign_to_input_el, INPUT_ELS, init_input_el } from '../components/input_el.js';
import { INIT_APPOINTMENT_PAGE } from './03_appointment.js';

let typingTimer; // Timer identifier
const doneTypingInterval = 1000; // Time in ms (1 second)
let firstKeyPressed = false;

export function INIT_LOCATION_PAGE() {
	assign_to_input_el('location', 'address_box', document.querySelector('#__SCHEDULE-ONLINE__LARGE .location--input-box'));

	assign_to_input_el('location', 'address_field', document.querySelector('#__SCHEDULE-ONLINE__LARGE .location--input-field'));

	assign_to_input_el('location', 'address_box_icon', document.querySelector('#__SCHEDULE-ONLINE__LARGE .location--input-box .icon'));

	init_input_el();
	add_icons();

	// This function will be called as the use stops typing for 1 second. This will minimize the API calling
	INPUT_ELS.location.address_field.addEventListener('input', (event) => {
		if (!firstKeyPressed) {
			set_validation_status('_location', false); // Seting the status to false
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

	PAGE_INDEX === 1 ? navigation_container.appendChild(previousBtn) : '';
	nextBtn.addEventListener('click', () => {
		if (PAGE_INDEX === 1 && validation_status._location === true) {
			loadHTMLContent('/schedule-online/markup/pages/page__appointment.html').then((htmlContent) => {
				if (htmlContent) {
					const tempDiv = document.createElement('div');
					tempDiv.innerHTML = htmlContent;

					PAGES._location.style.display = 'none';
					main_page_container.appendChild(tempDiv.firstElementChild);

					assign_to_pages_obj('_appointment', document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__appointment'));
					set_page_index(2);
					INIT_APPOINTMENT_PAGE();
				}
			});
		}
	});
}
