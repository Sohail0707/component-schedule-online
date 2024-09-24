export const FORM_DATA = {};

export function assign_to_form_data(key, value) {
	FORM_DATA[key] = value;
	console.log(FORM_DATA);
}

export function remove_form_data(key) {
	delete FORM_DATA[key];
	console.log(FORM_DATA);
}

export const validation_status = {
	service__page: false,
	location__page: false,
	appointment__page: false,
	customerDetails__page: false,
	cardDetails__page: false,
	confirmation__page: false,
};
export function set_validation_status(key, value) {
	validation_status[key] = value;
}
