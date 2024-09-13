const inputBoxes = document.querySelectorAll('#__SCHEDULE-ONLINE__LARGE .input-box'); // All input boxes

export const locationPageInputBoxes = {
	inputBox: document.querySelector('#__SCHEDULE-ONLINE__LARGE .location__input-box'),
	inputField: document.querySelector('#__SCHEDULE-ONLINE__LARGE .location__input-box .input-field'),
	inputFieldIcon: document.querySelector('#__SCHEDULE-ONLINE__LARGE .location__input-box .icon'),
};

inputBoxes.forEach((box) => {
	// If clicked anywhere of the input Box the input field get selected
	box.addEventListener('click', () => {
		box.querySelector('.input-field').focus();
	});
});

export function markAsInvalid(inputBox, message) {
	inputBox.classList.contains('valid') ? inputBox.classList.remove('valid') : '';
	inputBox.classList.contains('invalid') ? '' : inputBox.classList.add('invalid');
	const errorTextEl = document.createElement('p');
	errorTextEl.className = 'input__error--text';
	errorTextEl.innerText = message;

	const errorEl = inputBox.querySelector('.input__error');
	errorEl.innerHTML = '';
	errorEl.appendChild(errorTextEl);
}

// markAsInvalid(locationPage.inputBox, 'address cannot be empty');

export function markAsValid(inputBox) {
	inputBox.classList.contains('invalid') ? inputBox.classList.remove('invalid') : '';
	inputBox.classList.contains('valid') ? '' : inputBox.classList.add('valid');
}
