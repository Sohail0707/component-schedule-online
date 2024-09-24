import { add_icons } from './iconpack.js';
import { init_input_el, mark_as_invalid, mark_as_valid, INPUT_ELS } from './input_el.js';
import { validation_status } from './handle_state.js';

import { initServicePage } from '../pages/01_service.js';
import { initLocationPage } from '../pages/02_location.js';
import { initAppointmentPage } from '../pages/03_appointment.js';
import { initCustomerDetailsPage } from '../pages/04_personal-details.js';

async function loadHTMLContent(filePath) {
	try {
		const response = await fetch(filePath); // Fetch the external HTML file
		if (response.ok) {
			const htmlContent = await response.text(); // Get the HTML content as a string
			return htmlContent; // Return the HTML content
		} else {
			console.error('Failed to load file:', response.status);
			return null;
		}
	} catch (error) {
		console.error('Error fetching the file:', error);
		return null;
	}
}

const mainPageContainer = document.querySelector('#__SCHEDULE-ONLINE__LARGE .schedule-online__main-page-container');

const pagesHtmlObj = {}; // Stores the DOM containers of different pages
let currentPage = 1;

// Appending the first page
loadHTMLContent('/schedule-online/markup/pages/page__service.html').then((htmlContent) => {
	if (htmlContent) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = htmlContent;

		mainPageContainer.appendChild(tempDiv.firstElementChild);
		pagesHtmlObj.service__page = document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__service');
		initServicePage();
		add_icons();
	}
});

const nextBtn = document.createElement('button');
nextBtn.className = 'schedule-online__btn schedule-online__btn--next';
nextBtn.innerHTML = `<span class="text">next</span>`;

const previousBtn = document.createElement('button');
previousBtn.className = 'schedule-online__btn schedule-online__btn--previous';
previousBtn.innerHTML = `<span class="text">previous</span>`;

const scheduleBtn = document.createElement('button');
scheduleBtn.className = 'schedule-online__btn schedule-online__btn--schedule';
scheduleBtn.innerHTML = `<span class="text">schedule</span>`;

const closeBtn = document.createElement('button');
closeBtn.className = 'schedule-online__btn schedule-online__btn--close';
closeBtn.innerHTML = `<span class="text">close</span>`;

document.addEventListener('DOMContentLoaded', () => {
	const navigationContainer = document.querySelector('#__SCHEDULE-ONLINE__LARGE .schedule-online__navigation');
	navigationContainer.appendChild(nextBtn);
});

nextBtn.addEventListener('click', () => {
	switch (currentPage) {
		case 1:
			{
				if (validation_status.service__page) navigate(true);
				else console.log('page not valid');
			}
			break;

		case 2:
			{
				if (validation_status.location__page) navigate(true);
				else mark_as_invalid(INPUT_ELS.location.address_field, 'Location is incomplete');
			}
			break;

		case 3:
			{
				if (validation_status.appointment__page) navigate(true);
				else console.log('page not valid');
			}
			break;
	}
});

function navigate(goNext) {
	if (goNext) {
		switch (currentPage) {
			case 1:
				{
					loadHTMLContent('/schedule-online/markup/pages/page__location.html').then((htmlContent) => {
						if (htmlContent) {
							const tempDiv = document.createElement('div');
							tempDiv.innerHTML = htmlContent;
							pagesHtmlObj.service__page.style.display = 'none';
							mainPageContainer.appendChild(tempDiv.firstElementChild);
							pagesHtmlObj.location__page = document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__location');
							initLocationPage();
							add_icons();
							currentPage++;
						}
					});
				}
				break;

			case 2:
				{
					loadHTMLContent('/schedule-online/markup/pages/page__appointment.html').then((htmlContent) => {
						if (htmlContent) {
							const tempDiv = document.createElement('div');
							tempDiv.innerHTML = htmlContent;
							pagesHtmlObj.location__page.style.display = 'none';
							mainPageContainer.appendChild(tempDiv.firstElementChild);
							pagesHtmlObj.appointment__page = document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__appointment');
							initAppointmentPage();
							add_icons();
							currentPage++;
						}
					});
				}
				break;

			case 3:
				{
					loadHTMLContent('/schedule-online/markup/pages/page__personal-details.html').then((htmlContent) => {
						if (htmlContent) {
							const tempDiv = document.createElement('div');
							tempDiv.innerHTML = htmlContent;
							pagesHtmlObj.appointment__page.style.display = 'none';
							mainPageContainer.appendChild(tempDiv.firstElementChild);
							pagesHtmlObj.customer_details__page = document.querySelector('#__SCHEDULE-ONLINE__LARGE .page__appointment');
							initCustomerDetailsPage();
							add_icons();
							currentPage++;
						}
					});
				}
				break;

			case 4:
				console.log('page 4');
				break;

			case 5:
				console.log('page 5');
				break;

			case 6:
				console.log('page 6');
				break;

			case 7:
				console.log('page 7');
				break;
		}
	}
}
