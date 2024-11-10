import { navigation_container, nextBtn, PAGE_INDEX, assign_to_pages_obj } from '../components/handle_state.js';
import { get_services } from '../components/get_services.js';

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
}
INIT_SERVICE_PAGE();
