import {
	navigation_container,
	main_page_container,
	nextBtn,
	PAGE_INDEX,
	PAGES,
	assign_to_pages_obj,
	validation_status,
	loadHTMLContent,
	set_page_index,
} from '../components/handle_state.js';
import { get_services } from '../components/get_services.js';
import { INIT_LOCATION_PAGE } from './02_location.js';

let serviceContainerEl;

const serviceHtmlObj = {
	topLevelServiceEls: [],
	midLevelServiceEls: [],
	lowLevelServiceEls: [],
};

assign_to_pages_obj('_service', document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__service'));

export function INIT_SERVICE_PAGE() {
	serviceContainerEl = document.querySelectorAll('#__SCHEDULE-ONLINE__LARGE .service__el-container--1');

	serviceContainerEl.forEach((container, index) => {
		for (let i = 0; i < 6; i++) {
			const serviceHtmlEl = document.createElement('div');
			serviceHtmlEl.className = 'service__el';
			serviceHtmlEl.innerHTML = `
			<div class="service__el--inner">
				<div class="service__el--side service__el--front animate_element">
				</div>
				<div class="service__el--side service__el--back">
					<div class="service--card"></div>
				</div>
			</div>`;
			container.appendChild(serviceHtmlEl);

			switch (index) {
				case 0:
					serviceHtmlObj.topLevelServiceEls.push(serviceHtmlEl);
					break;
				case 1:
					serviceHtmlObj.midLevelServiceEls.push(serviceHtmlEl);
					break;
				case 2:
					serviceHtmlObj.lowLevelServiceEls.push(serviceHtmlEl);
					if (i === 5) {
						get_services('TWHqif8UkQqu1jxRgRgzDA', serviceHtmlObj);
					}
					break;
			}
		}
	});

	PAGE_INDEX === 0 ? navigation_container.appendChild(nextBtn) : ''; // Putting the next button into DOM
	nextBtn.addEventListener('click', () => {
		if (PAGE_INDEX === 0 && validation_status._service === true) {
			loadHTMLContent('/schedule-online/markup/pages/page__location.html').then((htmlContent) => {
				if (htmlContent) {
					const tempDiv = document.createElement('div');
					tempDiv.innerHTML = htmlContent;

					PAGES._service.style.display = 'none';
					main_page_container.appendChild(tempDiv.firstElementChild);

					assign_to_pages_obj('_location', document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__location'));
					set_page_index(1);
					INIT_LOCATION_PAGE();
				}
			});
		}
	});
}
INIT_SERVICE_PAGE();
