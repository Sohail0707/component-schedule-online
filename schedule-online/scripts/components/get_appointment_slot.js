import { iconPack } from './iconpack.js';
import { assign_to_form_data, set_validation_status } from './handle_state.js';

export function get_time_slot(lat, lon, hours, startDate, numberOfDays) {
	const url =
		`https://sd.jazzd.cc/rest/scheduling/get_available_appointment_slots` +
		`?lat=${lat}&lon=${lon}&hours=${hours}&first_day=${startDate.toUTCString()}` +
		`&number_of_days=${numberOfDays}&timestamp=${new Date().getTime()}`;

	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			set_validation_status('appointment__page', false);
			const sortedData = data.slots.sort((a, b) => a.start_time_display - b.start_time_display);
			const endDate = new Date(startDate);
			endDate.setDate(startDate.getDate() + numberOfDays);

			const timeSlotData = fillMissingDates(sortedData, startDate, endDate);
			generateAppointmentEl(timeSlotData);
		})
		.catch((error) => {
			console.error('There was a problem with the fetch operation:', error);
		});
}

function fillMissingDates(slotData, startDate, endDate) {
	let filledData = []; // Array to store the modified data
	let currentDate = new Date(startDate); // Initialize with the first date

	// Iterate through the slotData
	for (let i = 0; i < slotData.length; i++) {
		let slotDate = new Date(slotData[i].start_time_display); // Get the current slot date

		// Only fill missing dates if they are within the startDate and endDate range
		while (currentDate < slotDate && currentDate >= startDate && currentDate <= endDate) {
			let missingDateObj = {
				start_time_display: currentDate.toISOString().split('T')[0] + ' 07:00', // Add default time as 07:00
				disabled: true,
			};
			filledData.push(missingDateObj);

			// Increment currentDate by 1 day
			currentDate.setDate(currentDate.getDate() + 1);
		}

		// After filling gaps, push the actual slot data
		filledData.push(slotData[i]);

		// Set currentDate to the next day after the current slot date
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return filledData;
}

// Converts 24-hour time to 12-hour format
function convertTo12Hour(timeString) {
	let [hours, minutes] = timeString.split(':').map(Number);
	const period = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12 || 12;
	return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
}

// Converts the date to readable format like '20th September'
function convertDate(dateString) {
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	const [year, month, day] = dateString.split('-').map(Number);
	const daySuffix = (day) => {
		if (day > 3 && day < 21) return 'th';
		switch (day % 10) {
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
			default:
				return 'th';
		}
	};
	return `${day}${daySuffix(day)} ${months[month - 1]}`;
}

// Returns the day name from the given date
function getDayName(dateString) {
	const date = new Date(dateString);
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayName = daysOfWeek[date.getDay()];
	return dayName;
}

function generateAppointmentEl(slotData) {
	const appointmentList = document.querySelector('#__SCHEDULE-ONLINE__LARGE .appointment__time-slot--list');
	let previousDate = null;

	slotData.forEach((slot, index) => {
		// Extract the date part (yyyy-mm-dd) from 'start_time_display'
		const currentDate = slot.start_time_display.split(' ')[0];

		const timeSlotEl = document.createElement('div'); // creating the li element
		timeSlotEl.className = 'appointment__time-slot--el';

		// Compare with the previous date
		if (previousDate && previousDate !== currentDate) {
			const breakEl = document.createElement('span');
			breakEl.className = 'gap-el';
			breakEl.innerHTML = '<br>';
			setTimeout(() => {
				appointmentList.appendChild(breakEl);
			}, 50 * index);
		}

		if (slot.disabled) {
			timeSlotEl.classList.add('disabled');
			const htmlEl = `
			<div class="time-slot__date--container">
				<span class="day">${getDayName(currentDate)}</span>
				<span class="date">${convertDate(currentDate)}</span>
			</div>
			<p class="time-slot__unavailable-message">We are not available today</p>
			<button class="time-slot--btn">
        	    <span class="time-slot__btn--label">select</span>
        	</button>`;
			timeSlotEl.innerHTML = htmlEl;

			setTimeout(() => {
				appointmentList.appendChild(timeSlotEl);
			}, 50 * index);
		} else {
			const startTime = slot.start_time_display.split(' ')[1];
			const endTime = slot.end_time_display.split(' ')[1];

			const htmlEl = `
			<div class="time-slot__date--container">
				<span class="day">${getDayName(currentDate)}</span>
				<span class="date">${convertDate(currentDate)}</span>
			</div>
			<div class="time-slot__time--container">
				<span class="start-time">${convertTo12Hour(startTime)}</span>
				${iconPack.arrow_1_right}
				<span class="end-time">${convertTo12Hour(endTime)}</span>
			</div>`;
			timeSlotEl.innerHTML = htmlEl;

			const btn = document.createElement('button');
			btn.className = 'time-slot--btn';
			btn.innerHTML = `<span class="time-slot__btn--label">select</span>`;

			btn.addEventListener('click', () => {
				if (timeSlotEl.classList.contains('selected')) {
					btn.innerHTML = `
					<span class="time-slot__btn--label">select</span>`;
					timeSlotEl.classList.remove('selected');
				} else {
					btn.innerHTML = iconPack.cross_circle_outline;
					document.querySelectorAll('#__SCHEDULE-ONLINE__LARGE .appointment__time-slot--el.selected').forEach((slot) => {
						slot.classList.remove('selected');
						slot.querySelector('.time-slot--btn').innerHTML = `<span class="time-slot__btn--label">select</span>`;
					});
					timeSlotEl.classList.add('selected');
					assign_to_form_data('time_slot', slot);
					set_validation_status('appointment__page', true);
				}
			});

			timeSlotEl.appendChild(btn);

			setTimeout(() => {
				appointmentList.appendChild(timeSlotEl);
			}, 50 * index);
		}

		previousDate = currentDate; // Update previousDate to current one
	});
}
