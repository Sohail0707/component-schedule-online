"use strict";
import {
  addIcons,
  assign_data_to_SESSION_DATA,
  SESSION_DATA,
  STATE_RECORD,
  UI_ELEMENTS,
  DISPLAY_SELECTED_ITEM_PREVIEW,
} from "./common.js";
import { getSlots } from "./api.js";
import { checkPageValid } from "./general.js"; // This function will be used to navigate to the next page

// SlotStorage using closure to protect slots data
const SlotStorage = (function () {
  let slots = [];

  return {
    getSlots: function () {
      return [...slots];
    },
    setSlots: function (newSlots) {
      slots = [...newSlots];
    },
  };
})();

function getFormattedDate(date) {
  // THIS FUNCTION RETURNS THE DATE AS (26th September) FORMAT
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  let suffix;
  if (day % 10 === 1 && day !== 11) {
    suffix = "st";
  } else if (day % 10 === 2 && day !== 12) {
    suffix = "nd";
  } else if (day % 10 === 3 && day !== 13) {
    suffix = "rd";
  } else {
    suffix = "th";
  }

  return `${day}${suffix} ${month}`;
}

// Sends a GET request to the server to get time slots
async function fetchAvailableSlots(lat, lon, hours, startDate, number_of_days) {
  try {
    const data = await getSlots({ lat, lon, hours, firstDay: startDate, numberOfDays: number_of_days });
    data.slots = sortSlots(data.slots); // Sort slots after fetching
    return data; //Returning the data, which is an object
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw error;
  }
}

// Function to sort the slot based on the date and time
function sortSlots(slotListObject) {
  return slotListObject.sort((a, b) => {
    const dateA = new Date(a.start_time);
    const dateB = new Date(b.start_time);
    return dateA - dateB;
  });
}

// Creates HTML code for available slots. Here 'slotObject' is the single object from the list of object
function createSlotElement(slotObject) {
  const li = document.createElement("li");
  li.className = "slot";

  const startTime = new Date(slotObject.start_time_display);
  const endTime = new Date(slotObject.end_time_display);

  const formattedStartTime = startTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedEndTime = endTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const formattedDate = getFormattedDate(startTime);

  li.innerHTML = `
        <div class="day_date_box">
            <span class="slot_day">${startTime.toLocaleString("en-US", {
              weekday: "long",
            })}</span>
            <span class="slot_date">${formattedDate}</span> <!-- Adjusted this line -->
        </div>
        <div class="start_end_time_box">
            <span class="slot_start_time">${formattedStartTime}</span>
            <i class="i" name="arrow_1_right"></i>
            <span class="slot_end_time">${formattedEndTime}</span>
        </div>
        <div class="btn__icon_box"></div>`;

  const button = document.createElement("button"); // Creating the label
  button.className = "btn_select_slot";
  button.innerHTML += "<span>select</span>";

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    if (SESSION_DATA.time_slot === li.data_slot && SESSION_DATA.time_slot) {
      delete SESSION_DATA.time_slot;
      li.classList.remove("selected");
    } else {
      assign_data_to_SESSION_DATA("time_slot", li.data_slot);
      document.querySelectorAll("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .slot").forEach((slot) => {
        slot.classList.remove("selected");
      });
      li.classList.add("selected");
      setTimeout(() => {
        // Navigate to the next page as soon as a slot is selected
        if (STATE_RECORD.CURRENT_PAGE_INDEX < 5) {
          checkPageValid(STATE_RECORD.CURRENT_PAGE_INDEX);
        }
      }, 150); // This is small time delay to complete the animation when select a slot
    }
  });

  const icon = document.createElement("i"); // Creating the icon element
  icon.className = "i";
  icon.setAttribute("name", "cross_circle_outline");

  const btnIconBox = li.querySelector(".btn__icon_box");
  btnIconBox.appendChild(button); // Inserting the label inside the 'btn__icon_box' container
  btnIconBox.appendChild(icon); // Inserting the icon inside the 'btn__icon_box' container

  li.data_slot = slotObject; // Attach the slotObject data to the li element
  return li;
}

// It takes the 'date' as parameter and creates missing slot HTML code
function createMissingSlotElement(date) {
  const li = document.createElement("li");
  li.className = "slot disabled";

  const day = date.toLocaleString("en-US", { weekday: "long" });

  const formattedDate = getFormattedDate(date);

  li.innerHTML = `
        <div class="day_date_box">
            <span class="slot_day">${day}</span>
            <span class="slot_date">${formattedDate}</span>
        </div>
        <div class="unavailable_comment">
            We are not available today
        </div>
        <div class="btn__icon_box">
            <label class="btn_select_slot"><span>select</span></label>
        </div>`;
  return li;
}

// Function to get an array of dates that are missing in the slotListObject
function getMissingDatesArray(allDates, slotListObject) {
  /* allDates is the array of all the dates in range. This array will be provided by 
  'getAllDatesArrayInRange' object. it returns the array of dates which is not available 
  in the slotListObject object */
  const slotDates = slotListObject.map((slot) => new Date(slot.start_time).toDateString());
  return allDates.filter((date) => !slotDates.includes(date.toDateString()));
}

// Modified function to get an array of all dates in the specified range
function getAllDatesArrayInRange(inputDate, totalDays, slotListObject) {
  // Here 'totalDays' is the range. Ex- if it is 5 means, 5 different dates
  const startDate = inputDate ? new Date(inputDate) : new Date(slotListObject[0].start_time);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + totalDays - 1);

  const arr = [];
  for (let dt = new Date(startDate); dt <= endDate; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}

// Function to append slots to the DOM with an option to keep or remove existing slots
function appendSlotsToDOM(slotListObject, DOMslotContainer, inputDate, totalDays) {
  /* Here the 'slotListObject' is the object with all the slot objects. 
  It can be fetched from the data given by the server */

  const allDates = getAllDatesArrayInRange(inputDate, totalDays, slotListObject);
  const missingDates = getMissingDatesArray(allDates, slotListObject);

  const missingslotListObject = missingDates.map((date) => ({
    // It is creating new object from the missing dates
    start_time: date.toISOString(),
    isMissing: true,
  }));

  /* Combining the objects of 'slotListObject' object and 'missingslotListObject'
  and sorting according to the start dates or time */
  const combinedslotListObject = [...slotListObject, ...missingslotListObject].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  let lastDate = null;

  // This variable will hold the last available li element for the same date
  let lastSameAvailableDate__li = null;

  combinedslotListObject.forEach((slotObject, index) => {
    const slotDate = new Date(slotObject.start_time).toDateString();
    const slotTime = new Date(slotObject.start_time);
    const formattedDate = getFormattedDate(slotTime);

    if (!slotObject.isMissing && (!lastDate || slotDate !== lastDate)) {
      // Creating a label for available time slot.
      const labelDiv = document.createElement("div");
      labelDiv.className = "slot_label";
      labelDiv.innerHTML = `
    <div class="day_date_box">
        <span class="slot_day">${slotTime.toLocaleString("en-US", { weekday: "long" })}</span>
        <span class="slot_date">${formattedDate}</span>
    </div>`;
      DOMslotContainer.appendChild(labelDiv);
    }

    // Creating element for missing or available time and appending to the 'DOMslotContainer'
    const li = slotObject.isMissing ? createMissingSlotElement(slotTime) : createSlotElement(slotObject);
    DOMslotContainer.appendChild(li);

    if (!slotObject.isMissing) {
      if (lastSameAvailableDate__li && lastDate !== slotDate) {
        lastSameAvailableDate__li.classList.add("last_slot_of_date");
      }
      lastSameAvailableDate__li = li;
    }

    if (index === combinedslotListObject.length - 1 && lastSameAvailableDate__li) {
      lastSameAvailableDate__li.classList.add("last_slot_of_date");
    }

    lastDate = slotDate;
  });

  loadingAnimation(false, DOMslotContainer);
  btnSeeMore.style.display = "block";

  addIcons();

  // saving the recent location id to make sure that we don't regenerate the slots
  STATE_RECORD.RECENT_LOCATION_OF_GENERATED_SLOT = SESSION_DATA.address.google_place_id;
  STATE_RECORD.RECENT_SELECTED_SERVICE = SESSION_DATA.service.id;
}

// Function to update the slot in the UI
function updateTimeSlotInDOM(DOMslotContainer, inputDate, totalDays, keepExistingSlots = false) {
  if (!keepExistingSlots) {
    DOMslotContainer.innerHTML = "";
  }
  loadingAnimation(true, DOMslotContainer);
  fetchAvailableSlots(
    SESSION_DATA.address.lat,
    SESSION_DATA.address.lon,
    SESSION_DATA.service.hours,
    inputDate,
    totalDays
  )
    .then((data) => {
      SlotStorage.setSlots(data.slots); // store the fetched slots in SlotStorage
      appendSlotsToDOM(data.slots, DOMslotContainer, inputDate, data.number_of_days);
    })
    .catch((error) => {
      console.error("Failed to fetch and render slots:", error);
      DOMslotContainer.innerHTML = '<li class="slot disabled">Failed to load slots. Please try again later.</li>';
    });
}

// Some variables of DOM elements and other parameters
const DOMslotContainer = UI_ELEMENTS.PAGE_03.slotListContainer;
const dateInputField = UI_ELEMENTS.PAGE_03.dateInputField;
const totalDays = 7;

// Initializing the date input field. It will set it's date to the current day and set the minimum date value
function init_date_inputfield() {
  dateInputField.value = new Date().toISOString().substring(0, 10);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const yyyy = today.getFullYear();
  dateInputField.min = `${yyyy}-${mm}-${dd}`;
}
init_date_inputfield();

// Generates new slots when the date are changed
dateInputField.addEventListener("input", () => {
  btnSeeMore.style.display = "none";
  DOMslotContainer.innerHTML = "";
  const inputDate = new Date(dateInputField.value);
  updateTimeSlotInDOM(DOMslotContainer, inputDate, totalDays);
});

// Generates more 7 days of slots when click on see more
const btnSeeMore = document.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn_see_more");
btnSeeMore.addEventListener("click", () => {
  const lastSlotDate = new Date(SlotStorage.getSlots()[SlotStorage.getSlots().length - 1].start_time);
  const nextWeekStartDate = new Date(lastSlotDate);
  nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1);
  updateTimeSlotInDOM(DOMslotContainer, nextWeekStartDate, totalDays, true);
});

// LOADING ANIMATION
function loadingAnimation(show = true, container) {
  if (show) {
    const loadingHTML = `<div class="animate_container">
                    <div class="label animate_element"></div>
                    <li class="animate_element"></li>
                    <li class="animate_element"></li>
                    <li class="animate_element"></li>
                    <li class="animate_element"></li>
                    <li class="animate_element last_slot_of_date"></li>

                    <div class="label animate_element"></div>
                    <li class="animate_element"></li>
                    <li class="animate_element"></li>
                    <li class="animate_element"></li>
                    <li class="animate_element"></li>
                    <li class="animate_element"></li>
                  </div>`;
    container.insertAdjacentHTML("beforeend", loadingHTML);
  } else {
    container.querySelectorAll(".animate_element").forEach((element) => {
      element.remove();
    });
  }
}

// INITIAL CALL FOR THE INITIAL DATE
export function init_time_slot() {
  DISPLAY_SELECTED_ITEM_PREVIEW(UI_ELEMENTS.PAGE_03.previewSelectedContainer, true, true);

  const initialDate = new Date(dateInputField.value);
  if (
    STATE_RECORD.RECENT_LOCATION_OF_GENERATED_SLOT != SESSION_DATA.address.google_place_id ||
    STATE_RECORD.RECENT_SELECTED_SERVICE != SESSION_DATA.service.id
  ) {
    if (SESSION_DATA.time_slot) {
      delete SESSION_DATA.time_slot;
      updateTimeSlotInDOM(DOMslotContainer, initialDate, totalDays, false);
    } else updateTimeSlotInDOM(DOMslotContainer, initialDate, totalDays, false);
  }
}
