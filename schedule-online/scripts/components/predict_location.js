import { iconPack } from './iconpack.js';
import { mark_as_valid, INPUT_ELS, add_placeholder } from './input_el.js';
import { set_validation_status, assign_to_form_data } from './handle_state.js';

export function predict_location(searchedValue) {
	const url = `https://sd.enterprisejazz.com/rest/form/address_autocomplete?query=${searchedValue}`;

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			generateLocationEl(data.predictions);
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
		});
}

function getLocationDetails(placeId) {
	const url = `https://sd.enterprisejazz.com/rest/form/google_place_details?placeid=${placeId}`;

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json(); // Convert the response to JSON
		})
		.then((data) => {
			// Helper function to extract address components by type
			function getAddressComponent(type, data) {
				const component = data.address_components.find((comp) => comp.types.includes(type));
				return component ? component.long_name : null;
			}

			// This will store the location details
			const selectedLocationData = {};

			selectedLocationData.street_number = getAddressComponent('street_number', data.result);
			selectedLocationData.street_name = getAddressComponent('route', data.result);
			selectedLocationData.neighborhood = getAddressComponent('neighborhood', data.result);
			selectedLocationData.city = getAddressComponent('locality', data.result);
			selectedLocationData.state = getAddressComponent('administrative_area_level_1', data.result);
			selectedLocationData.zip = getAddressComponent('postal_code', data.result);
			selectedLocationData.street = `${getAddressComponent('street_number', data.result)} ${getAddressComponent('route', data.result)}`;

			selectedLocationData.formatted_address = data.result.formatted_address;
			selectedLocationData.google_place_id = data.result.place_id;
			selectedLocationData.lat = data.result.geometry.location.lat;
			selectedLocationData.lon = data.result.geometry.location.lng;
			selectedLocationData.google_place_vicinity = data.result.vicinity;

			assign_to_form_data('address', selectedLocationData); // Saving the location data
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
		});
}

// Function to create the location prediction html elements
function generateLocationEl(locationData) {
	// The parent container of the location prediction elements
	const locationPredectionList = document.querySelector('#__SCHEDULE-ONLINE__LARGE .location__prediction--list');

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
			INPUT_ELS.location.address_field.classList.remove('loading');
		}, 50 * locationData.length);

		// If clicked on a prediction
		locationEl.addEventListener('click', () => {
			getLocationDetails(location.place_id); // This will generate the location lat, lon and other details of the selected location

			set_validation_status('location__page', true); // Set the validation status to 'true'
			INPUT_ELS.location.address_field.value = location.description;
			mark_as_valid(INPUT_ELS.location.address_field); // Marked as valid

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
