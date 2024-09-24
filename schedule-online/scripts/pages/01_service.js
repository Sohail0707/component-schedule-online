import { get_services } from '../components/get_services.js';

let serviceContainerEl;

const serviceHtmlObj = {
	topLevelServiceEls: [],
	midLevelServiceEls: [],
	lowLevelServiceEls: [],
};

export function initServicePage() {
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
}
