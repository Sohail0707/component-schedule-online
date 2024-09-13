import { iconPack } from './iconpack.js';
import { locationPageInputBoxes, markAsValid } from './input-field.js';

export const selectedLocationData = {}; // This will store the selected location description and id

export function predictLocation(searchedValue) {
	const url = `https://sd.enterprisejazz.com/rest/form/address_autocomplete?query=${searchedValue}`;

	fetch(url) // Use the fetch API to make a GET request
		.then((response) => {
			// Check if the request was successful
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json(); // Convert the response to JSON
		})
		.then((data) => {
			generateLocationEl(data.predictions);
		})
		.catch((error) => {
			// Handle any errors that occur
			console.error('There was a problem with the fetch operation:', error);
		});
}

// The parent container of the location prediction elements
const locationPredectionList = document.querySelector('#__SCHEDULE-ONLINE__LARGE .location__prediction--list');

// Function to create the location prediction html elements
function generateLocationEl(locationData) {
	locationPredectionList.innerHTML = ''; // Reseting the previously generated elements
	locationPredectionList.classList.add('expand'); // Adding the class to set a trigger

	locationData.forEach((location, index) => {
		// <li class="location__prediction--el"></li>
		const locationEl = document.createElement('li');
		locationEl.className = 'location__prediction--el';
		locationEl.setAttribute('unique__id', index);

		// <span class="text">2021 K Street Northwest, Washington, DC, USA</span>
		const textEl = document.createElement('span');
		textEl.className = 'text';
		textEl.innerText = location.description;

		locationEl.innerHTML = iconPack.map_pin; // Putting the icon first
		locationEl.appendChild(textEl); // Putting the text element
		setTimeout(() => {
			// Inserting the prediction elements one by one after some delay
			locationPredectionList.appendChild(locationEl);
		}, 50 * index);

		setTimeout(() => {
			// Removing the loading icon
			locationPageInputBoxes.inputBox.classList.remove('loading');
		}, 50 * locationData.length);

		// If clicked on a prediction
		locationEl.addEventListener('click', () => {
			selectedLocationData.description = location.description;
			selectedLocationData.place_id = location.place_id;
			locationPageInputBoxes.inputField.value = location.description;
			markAsValid(locationPageInputBoxes.inputBox);

			const locationEls = document.querySelectorAll('#__SCHEDULE-ONLINE__LARGE .location__prediction--el');

			locationEls.forEach((location, index) => {
				setTimeout(() => {
					location.classList.add('remove'); // Setting a trigger class
					setTimeout(() => {
						location.remove();
					}, 400);
				}, 50 * (locationEls.length - 1 - index));
			});

			setTimeout(() => {
				locationPredectionList.classList.remove('expand');
			}, 30 * locationEls.length);
		});
	});
}
