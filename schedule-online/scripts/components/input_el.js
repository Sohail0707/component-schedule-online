export const INPUT_ELS = {
	service: {},
	location: {},
	time_slot: {},
	personal_details: {},
	card_details: {},
};

export function assign_to_input_el(page_name, key, value) {
	INPUT_ELS[page_name][key] = value;
}

export function init_input_el() {
	const inputBoxes = document.querySelectorAll('#__SCHEDULE-ONLINE__LARGE .input-box'); // All input boxes

	inputBoxes.forEach((box) => {
		// If clicked anywhere of the input Box the input field get selected
		box.addEventListener('click', () => {
			box.querySelector('.input-field').focus();
		});
	});
}

export function mark_as_invalid(inputField, message) {
	inputField.classList.contains('valid') ? inputField.classList.remove('valid') : '';
	inputField.classList.contains('invalid') ? '' : inputField.classList.add('invalid');
	const errorTextEl = document.createElement('p');
	errorTextEl.className = 'input__error--text';
	errorTextEl.innerText = message;

	const errorEl = inputField.parentElement.querySelector('.input__error');
	errorEl.innerHTML = '';
	errorEl.appendChild(errorTextEl);
}

export function mark_as_valid(inputField) {
	inputField.classList.contains('invalid') ? inputField.classList.remove('invalid') : '';
	inputField.classList.contains('valid') ? '' : inputField.classList.add('valid');
}

export function add_placeholder(inputField, value) {
	const placeholderEl = inputField.parentElement.querySelector('.placeholder--value');
	inputField.classList.contains('placeholder') ? '' : inputField.classList.add('placeholder');
	placeholderEl.innerHTML = `<span>${value}</span>`;
}
