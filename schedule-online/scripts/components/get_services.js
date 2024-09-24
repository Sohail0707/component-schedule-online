import { set_validation_status } from './handle_state.js';
import { assign_to_form_data, remove_form_data } from './handle_state.js';

export function get_services(brandId, htmlObj) {
	const url = `https://sd.jazzd.cc/rest/scheduling/line-items?brand-id=${brandId}`;

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json(); // Convert the response to JSON
		})
		.then((data) => {
			serviceData.lowLevelServices.push(data.filter((item) => item.level === 'BASIC'));
			serviceData.midLevelServices.push(data.filter((item) => item.level === 'MIDDLE'));
			serviceData.topLevelServices.push(data.filter((item) => item.level === 'TOP'));

			function getHtml(name, price, area, duration, size) {
				let areaText = '';
				if (area === 'COMPLETE') {
					areaText = 'Entire Car';
				}
				if (area === 'OUTSIDE') {
					areaText = 'Exterior Only';
				}
				if (area === 'INSIDE') {
					areaText = 'Interior Only';
				}
				const htmlEl = `
                <h3 class="service__card--name">
					<span>${name.split(' ')[0]}</span>
				</h3>
				<h4 class="service__card--price">
					<span>${parseInt(price)}</span>
				</h4>
				<p class="service__card--area">
					<span>${areaText}</span>
				</p>
				<p class="service__card--time">
					<span>${duration}Hrs.</span>
				</p>
				<p class="service__card--size">
					<span>${size === 'REGULAR' ? 'for small cars' : 'for larger cars'}</span>
				</p>`;

				return htmlEl;
			}

			function processService(serviceEls, serviceData, delayFactor) {
				serviceEls.forEach((serviceEl, index) => {
					const serviceCard = serviceEl.querySelector('.service--card');
					let cardData;

					if (serviceData[index]) {
						cardData = serviceData[index];
						serviceCard.addEventListener('click', () => {
							if (serviceCard.classList.contains('selected')) {
								serviceCard.classList.remove('selected');
								remove_form_data('service');
								set_validation_status('service__page', false);
							} else {
								assign_to_form_data('service', cardData);
								document.querySelectorAll('#__SCHEDULE-ONLINE__LARGE .service--card.selected').forEach((card) => {
									card.classList.remove('selected');
								});
								serviceCard.classList.add('selected');
								set_validation_status('service__page', true);
							}
						});

						serviceCard.innerHTML = getHtml(cardData.name, cardData.price, cardData.area, cardData.duration, cardData.size);
						setTimeout(() => {
							serviceEl.classList.add('flip');
						}, 60 * (index + delayFactor));
					} else {
						serviceEl.remove();
					}
				});
			}

			processService(htmlObj.topLevelServiceEls, serviceData.topLevelServices[0], 0);
			processService(htmlObj.midLevelServiceEls, serviceData.midLevelServices[0], 5);
			processService(htmlObj.lowLevelServiceEls, serviceData.lowLevelServices[0], 10);
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
		});
}

const serviceData = {
	topLevelServices: [],
	midLevelServices: [],
	lowLevelServices: [],
};
