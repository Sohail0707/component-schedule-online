import { FORM_DATA } from '../components/handle_state.js';
import { get_time_slot } from '../components/get_appointment_slot.js';

export function INIT_APPOINTMENT_PAGE() {
	const startDate = new Date();
	get_time_slot(FORM_DATA.address.lat, FORM_DATA.address.lon, FORM_DATA.service.hours, startDate, 7);
}
