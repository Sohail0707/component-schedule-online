import { markAsInvalid, locationPageInputBoxes } from '../components/input-field.js';
import { predictLocation, selectedLocationData } from '../components/location-suggestion.js';

let typingTimer; // Timer identifier
const doneTypingInterval = 1000; // Time in ms (1 second)
let firstKeyPressed = false;
// This function will be called as the use stops typing for 1 second. This will minimize the API calling
locationPageInputBoxes.inputField.addEventListener('input', () => {
	if (!firstKeyPressed) {
		// Displaying the loading icon
		locationPageInputBoxes.inputBox.classList.add('loading');
		locationPageInputBoxes.inputBox.classList.contains('invalid') ? locationPageInputBoxes.inputBox.classList.remove('invalid') : '';
		locationPageInputBoxes.inputBox.classList.contains('valid') ? locationPageInputBoxes.inputBox.classList.remove('valid') : '';
		firstKeyPressed = true;
	}
	clearTimeout(typingTimer); // Clear the previous timer if the user is still typing
	typingTimer = setTimeout(() => {
		locationPageInputBoxes.inputField.value == '' ? '' : predictLocation(locationPageInputBoxes.inputField.value);
		firstKeyPressed = false;
	}, doneTypingInterval); // Set a new timer for calling the function after 1 second
});
