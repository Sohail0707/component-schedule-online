import { get_time_slot } from '../components/get_appointment_slot.js';
import { FORM_DATA } from '../components/handle_state.js';

export function initAppointmentPage() {
	const startDate = new Date();
	get_time_slot(FORM_DATA.address.lat, FORM_DATA.address.lon, FORM_DATA.service.duration, startDate, 7);
}
