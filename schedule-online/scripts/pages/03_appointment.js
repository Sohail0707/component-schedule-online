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
} from '../components/handle_state.js';
import { get_time_slot } from '../components/get_appointment_slot.js';
import { INIT_PERSONAL_DETAILS_PAGE } from './04_personal-details.js';

export function INIT_APPOINTMENT_PAGE() {
	const startDate = new Date();
	get_time_slot(FORM_DATA.address.lat, FORM_DATA.address.lon, FORM_DATA.service.hours, startDate, 7);

	nextBtn.addEventListener('click', () => {
		if (PAGE_INDEX === 2 && validation_status._appointment === true) {
			loadHTMLContent('/schedule-online/markup/pages/page__personal-details.html').then((htmlContent) => {
				if (htmlContent) {
					const tempDiv = document.createElement('div');
					tempDiv.innerHTML = htmlContent;

					PAGES._appointment.style.display = 'none';
					main_page_container.appendChild(tempDiv.firstElementChild);

					assign_to_pages_obj('_personal_details', document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__personal-details'));
					set_page_index(3);
					INIT_PERSONAL_DETAILS_PAGE();
				}
			});
		}
	});
}
