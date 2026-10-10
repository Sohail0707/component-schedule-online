const iconpack = {
  checkmark: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon">
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M4.5 12.75l6 6 9-13.5" />
    </svg>`,

  checkmark_circle_outline: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon">
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,

  cross_circle_outline: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon">
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,

  cross: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon"
    >
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>`,

  arrow_right: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon">
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>`,

  arrow_left: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon">
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>`,

  arrow_1_right: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon">
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>`,

  arrow_bottom: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>`,

  calander: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon"
    >
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
    />
    </svg>`,

  map_pin: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon"
    >
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
    </svg>`,

  email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>`,

  email_outline: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon"
    >
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
    </svg>`,

  phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
    <path
    fill-rule="evenodd"
    d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
    clip-rule="evenodd" />
    </svg>`,

  phone_outline: `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="icon"
    >
    <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
    </svg>`,
};

// FUNCTION TO ADD THE ICON INTO THE HTML BY REPLACING THE CONTENT OF 'i' BY THE SVG
// TO ADD AN ICON, PLACE AN 'i' TAG WITH THE CLASS 'i' AND SET THE NAME ATTRIBUTE BY THE ACTUAL ICON NAME FROM THE OBJECT
export function addIcons() {
  const icons = document.querySelectorAll(
    "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .i"
  ); // getting all the elements with the class 'i'
  icons.forEach((icon) => {
    icon.innerHTML = iconpack[icon.getAttribute("name")];
  });
}

// Function to mark the inputfield valid (visually)
export function MARK_INPUTFIELD_AS_VALID(inputField) {
  const parentElement = inputField.parentElement;
  parentElement.classList.remove("invalid");
  parentElement.classList.add("valid");

  let iconElement = parentElement.querySelector(
    "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .i"
  );
  if (iconElement) {
    iconElement.setAttribute("name", "checkmark_circle_outline");
  } else {
    iconElement = document.createElement("i");
    iconElement.className = "i";
    iconElement.setAttribute("name", "checkmark_circle_outline");
    parentElement.appendChild(iconElement);
  }
  addIcons();
  const errorEl = parentElement.querySelector(".error");
  if (errorEl) errorEl.remove();
}

// Function to mark the inputfield invalid (visually)
export function MARK_INPUTFIELD_AS_INVALID(inputField, message) {
  RESET_INPUTFIELD_VISUALS(inputField);
  const parentElement = inputField.parentElement;
  parentElement.classList.remove("valid");
  parentElement.classList.add("invalid");

  let iconElement = parentElement.querySelector(".i");
  if (iconElement) {
    iconElement.setAttribute("name", "cross_circle_outline");
  } else {
    iconElement = document.createElement("i");
    iconElement.className = "i";
    iconElement.setAttribute("name", "cross_circle_outline");
    parentElement.appendChild(iconElement);
  }
  addIcons();
  parentElement.insertAdjacentHTML(
    "beforeend",
    `<div class="error"><span>${message}</span></div>`
  );
}

// Function to reset the input field visual changes
export function RESET_INPUTFIELD_VISUALS(inputField) {
  const parentElement = inputField.parentElement;
  parentElement.classList.remove("valid", "invalid");
  const iconElement = parentElement.querySelector("i");
  if (iconElement) {
    iconElement.remove();
  }
  const errorEl = parentElement.querySelector(".error");
  if (errorEl) errorEl.remove();
}

// Function to handle general errors
export function SHOW_POPUP_ERROR(message) {
  UI_ELEMENTS.GLOBAL.mainContainer.insertAdjacentHTML(
    "beforeend",
    `<span class="popup_warning"><span>${message}</span><i class="i" name="cross_circle_outline"></i></span>`
  );
  addIcons();
  setTimeout(() => {
    UI_ELEMENTS.GLOBAL.mainContainer.querySelector(".popup_warning").remove();
  }, 3100); // 3100 milliseconds = 3.1 seconds
}

// Function to handle Server errors
export function SHOW_SERVER_ERROR(message) {
  // Define the HTML content
  let htmlContent = `
    <div class="pop_up_message_background">
      <div class="pop_up_message_body">
        <p class="warning_message">${message}</p>
        <button type="button" class="warning_button"><span>ok</span></button>
      </div>
    </div>`;

  // Insert the HTML content
  UI_ELEMENTS.GLOBAL.mainContainer.insertAdjacentHTML("beforeend", htmlContent);

  // Find the newly added button in the DOM
  const newButton =
    UI_ELEMENTS.GLOBAL.mainContainer.querySelector(".warning_button");

  // Attach the event listener to the new button
  newButton.addEventListener("click", () => {
    UI_ELEMENTS.GLOBAL.mainContainer
      .querySelector(".pop_up_message_background")
      .remove();
  });
}

// This function displays a preview of the previous input of the user like 'service', 'location' etc.
export function DISPLAY_SELECTED_ITEM_PREVIEW(
  container,
  location = true,
  service = true
) {
  container.innerHTML = "";

  if (location) {
    const locationPreviewItem = `
  <h2 class="label location_preview_label">address:</h2>
  <h2 class="location__preview"><span>${escapeHTML(SESSION_DATA.address.formatted_address)}</span></h2>`;

    container.insertAdjacentHTML("beforeend", locationPreviewItem);
  }

  if (service) {
    const servicePreviewItem = `
  <h2 class="label service_preview_label">service:</h2>
  <div class="service_preview_box">
  <span class="service__name_price_preview">${escapeHTML(SESSION_DATA.service.name)} $${escapeHTML(SESSION_DATA.service.price)} ${escapeHTML(SESSION_DATA.service.hours)}Hrs. (approx)</span>
  </div>`;

    container.insertAdjacentHTML("beforeend", servicePreviewItem);
  }
}

// A Global Object that will hold user details through out the scheduling process
export const SESSION_DATA = {};
export const BILLING_INFO = {};

// This function assigns the value into the SESSION_DATA object
export function assign_data_to_SESSION_DATA(key, value) {
  // Validate key and value
  if (typeof key !== "string" || !key.trim()) {
    console.error("Invalid key:", key);
    return;
  }
  if (value == null) {
    console.error("Invalid value for key:", key);
    return;
  }

  // Assign the data to the global object
  SESSION_DATA[key] = value;
}

// This function assigns the value into the BILLING_INFO object
export function assign_data_to_BILLING_INFO(key, value) {
  // Validate key and value
  if (typeof key !== "string" || !key.trim()) {
    console.error("Invalid key:", key);
    return;
  }
  if (value == null) {
    console.error("Invalid value for key:", key);
    return;
  }

  // Assign the data to the global object
  BILLING_INFO[key] = value;
}

// Removes the raw card details from memory once they have been turned into a token
export function clear_BILLING_INFO() {
  Object.keys(BILLING_INFO).forEach((key) => delete BILLING_INFO[key]);
}

// Escapes text before it is placed inside HTML, so names, notes or addresses can't inject markup
export function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Runs the callback once the page has loaded, or straight away if it already has.
// This lets the module start correctly even when its scripts are loaded after the page.
export function onReady(callback) {
  if (document.readyState === "complete") callback();
  else window.addEventListener("load", callback);
}

// Function to format the date into a simple readable manner
export function FORMATTED_CUSTOM_DATE(inputDate) {
  if (!inputDate) {
    console.error("Please pass the date");
    return;
  }

  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    console.error("The date is invalid");
    return;
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // Add ordinal suffix to the day
  const day = date.getUTCDate();
  let suffix = "th";
  if (day === 1 || day === 21 || day === 31) suffix = "st";
  else if (day === 2 || day === 22) suffix = "nd";
  else if (day === 3 || day === 23) suffix = "rd";

  // Replace the day number with the day number and its suffix
  formattedDate = formattedDate.replace(day, `${day}${suffix}`);

  // Insert a comma after the weekday
  formattedDate = formattedDate.replace(/^(.*?),/, "$1,");

  // Ensure "at" is placed correctly before the time
  formattedDate = formattedDate.replace(", at", " at");

  return formattedDate;
}

// A Global object that holds some frequently used DOM elements
export const UI_ELEMENTS = {
  GLOBAL: {
    mainModule: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE"
    ),
    mainSmallModule: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL"
    ),
    mainContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .main_container"
    ),
    mainPageContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .main_page_container"
    ),
    nextBtn: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn_next"
    ),
    previousBtn: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn_previous"
    ),
    scheduleBtn: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn_schedule"
    ),
    closeBtn: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn_close"
    ),
    navIndicators: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .page_ind_container .indicator"
    ),
    navIndicatorIcons: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .page_ind_container .ind_icon"
    ),
    inputBoxes: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .input_box"
    ),
    inputFields: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .input_box .input_field"
    ),
    pages: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .pages"
    ),
  },

  SMALL_MODULE: {
    selectLabelIndicator: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL .selected_button_indicator"
    ),
    selectLevelButtons: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL .btn__level"
    ),
    serviceList: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL .service_list"
    ),
    serviceServiceContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL .select_service_section"
    ),
    serviceInputBox: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL .input_box"
    ),
    serviceInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL #service_name_input"
    ),

    topServiceContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL #TOP_SERVICE"
    ),
    middleServiceContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL #MIDDLE_SERVICE"
    ),
    basicServiceContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL #BASIC_SERVICE"
    ),
  },

  PAGE_01: {
    animationElements: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .section_service_container .animate_element"
    ),
    selectLevelButtons: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn__level"
    ),
    selectLabelIndicator: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .selected_button_indicator"
    ),

    topButton: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn__level.top"
    ),
    middleButton: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn__level.middle"
    ),
    basicButton: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .btn__level.basic"
    ),

    topServiceMainContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_category_container.top_category_container"
    ),
    middleServiceMainContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_category_container.middle_category_container"
    ),
    basicServiceMainContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_category_container.basic_category_container"
    ),

    topServiceContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #TOP_SERVICE"
    ),
    middleServiceContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #MIDDLE_SERVICE"
    ),
    basicServiceContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #BASIC_SERVICE"
    ),
  },

  PAGE_02: {
    suggestLocationContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .location_list_container ul"
    ),
    locationInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .address_box input"
    ),
    previewSelectedContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .location_page .selected_items_preview_container"
    ),
  },

  PAGE_03: {
    animationElements: document.querySelectorAll(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .section_time_slot_container .animate_element"
    ),
    dateInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .time_slot_page #service_date[type='date']"
    ),
    timeSlotContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .section_time_slot_container .timeslot_container"
    ),
    previewSelectedContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .time_slot_page .selected_items_preview_container"
    ),
    slotListContainer: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .time_slot_page .slot_list"
    ),
  },

  PAGE_04: {
    firstNameInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #first_name[name='first_name']"
    ),
    lastNameInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #last_name[name='last_name']"
    ),
    phoneNumberInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #phone_num[name='phone_num']"
    ),
    emailIdInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #email[name='email']"
    ),
    customerNoteInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #customer_notes[name='customer_notes']"
    ),
  },

  PAGE_05: {
    cardNumberInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #card_number[name='card_number']"
    ),
    expirationInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #expiration_date[name='expiration_date']"
    ),
    cvvInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #cvv[name='cvv']"
    ),
    billingZipcodeInputField: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #billing_zipcode[name='billing_zipcode']"
    ),
  },

  PAGE_06: {
    serviceNamePreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .service_name_preview"
    ),
    appointmentTimePreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .appointment_time_preview"
    ),
    serviceLocationPreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .service_location_preview"
    ),
    customerNamePreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .customer_name_preview"
    ),
    customerPhonePreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .customer_phone_preview"
    ),
    customerEmailPreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .customer_email_preview"
    ),
    billingDetailsPreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .billing_details_preview"
    ),
    totalAmmountPreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .total_amount_preview"
    ),
    serviceNotePreview: document.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .confirmation_page .service_note_preview"
    ),
  },

  PAGE_07: {
    sectionCompletePage: document.querySelector(
      ".complete_page .section_complete_page"
    ),
    completeMessageBody: document.querySelector(
      ".complete_page .complete_message_body"
    ),
  },
};

//This function will save the states of all the functions and tasks
export const STATE_RECORD = {
  CURRENT_PAGE_INDEX: 0,
  RECENT_LOCATION_OF_GENERATED_SLOT: "",
  RECENT_SELECTED_SERVICE: "",
};
