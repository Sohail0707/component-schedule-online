"use strict";
// ***THIS JAVASCRIPT FILE IS TO ADD INTERACTION INTO THE PAGE***
// Importing commonly used global functions and objects from the common.js file
import {
  addIcons,
  SESSION_DATA,
  UI_ELEMENTS,
  STATE_RECORD,
  SHOW_POPUP_ERROR,
  assign_data_to_SESSION_DATA,
  RESET_INPUTFIELD_VISUALS,
  onReady,
} from "./common.js";

import { CONFIG } from "./config.js";

import {
  scrollLeftRight,
  init_service_page,
} from "./PAGE-01-SELECT-SERVICE.js"; // This function shows or hides the scroll left-right button on the select service page
import { init_location_page } from "./PAGE-02-SELECT-LOCATION.js"; // This function initializes the location page
import { init_time_slot } from "./PAGE-03-SELECT-TIME-SLOT.js"; // This function initializes the time slot page
import { init_customer_details_page } from "./PAGE-04-CUSTOMER-DETAILS.js"; // This function initializes the customer details page
import { init_card_details_page } from "./PAGE-05-CARD-DETAILS.js"; // This function initializes the card details page
import {
  init_confirmation_page,
  tokenizeAndSchedule,
} from "./PAGE-06-CONFIRMATION.js"; // Initialize the confirmation page and scheduling the appointment
import { init_complete_page } from "./PAGE-07-COMPLETE-PAGE.js"; // This function initializes the complete page

// All the nested functions that is been returned by the init functions from other pages
const nestedFunctions = {
  location: "", // include all the functions that is been retured by 'init_location_page'
  customerInfo: "", // include all the functions that is been returned by 'init_customer_details_page'
  cardDetails: "", // include all the functions that is been returned by the 'init_card_details_page'
};

// ADDING INITIAL LOADING ELEMENTS
onReady(function () {
  navigateToPage(0);
  showHideButtons();
  addIcons();
  inputFieldInteraction();
  assign_data_to_SESSION_DATA("brand_id", CONFIG.brand_id);
  checkLocalStorage(); // Check for the localstorage
  init_service_page(); // Initialized the first page
});

// Checks into the local storage that if there is an object present for selected service
function checkLocalStorage() {
  let selectedService = null;
  try {
    selectedService = localStorage.getItem("SELECTED_SERVICE");
  } catch (e) {
    return; // Storage is blocked; the customer simply starts at the first step
  }

  if (selectedService) {
    const selectedServiceObject = JSON.parse(selectedService);
    assign_data_to_SESSION_DATA("service", selectedServiceObject);
    if (STATE_RECORD.CURRENT_PAGE_INDEX < 5) {
      checkPageValid(STATE_RECORD.CURRENT_PAGE_INDEX);
    }
    try {
      localStorage.removeItem("SELECTED_SERVICE");
    } catch (e) {}
  }
}

// This function helps to navigate between different pages
function navigateToPage(index) {
  const mainModule = UI_ELEMENTS.GLOBAL.mainModule;
  const topPosition =
    mainModule.getBoundingClientRect().top + window.pageYOffset;

  // Scroll to the top
  window.scrollTo({ top: topPosition, behavior: "smooth" });

}

// Function to focus on input field when clicked on input box
function inputFieldInteraction() {
  UI_ELEMENTS.GLOBAL.inputBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      box
        .querySelector(
          "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .input_field"
        )
        .focus();
    });
  });
}

// This function adjusts the visibility of the buttons in different pages
function showHideButtons() {
  STATE_RECORD.CURRENT_PAGE_INDEX === 0 || STATE_RECORD.CURRENT_PAGE_INDEX === 6
    ? (UI_ELEMENTS.GLOBAL.previousBtn.style.display = "none")
    : (UI_ELEMENTS.GLOBAL.previousBtn.style.display = "flex");

  STATE_RECORD.CURRENT_PAGE_INDEX != 5
    ? (UI_ELEMENTS.GLOBAL.scheduleBtn.style.display = "none")
    : (UI_ELEMENTS.GLOBAL.scheduleBtn.style.display = "flex");

  STATE_RECORD.CURRENT_PAGE_INDEX >= 5
    ? (UI_ELEMENTS.GLOBAL.nextBtn.style.display = "none")
    : (UI_ELEMENTS.GLOBAL.nextBtn.style.display = "flex");

  STATE_RECORD.CURRENT_PAGE_INDEX != 6
    ? (UI_ELEMENTS.GLOBAL.closeBtn.style.display = "none")
    : (UI_ELEMENTS.GLOBAL.closeBtn.style.display = "flex");
}

/* Function to make a pages as current page style. This function will be used to navigate between different pages.
This function can be used by the other files in the codebase. It will require 3 arguments. the page index where you want to navigate. make the valid = true. 
If the page where you want to navigate is the previous page, set the direction = -1. if it is the next page, set the direction = 1 */
export function makeCurrentPage(nextPageIndex, valid, direction) {
  if (valid) {
    UI_ELEMENTS.GLOBAL.pages.forEach((page) => {
      page.classList.remove("current");
    });
    UI_ELEMENTS.GLOBAL.pages[nextPageIndex].classList.add("current");

    for (let i = 0; i < UI_ELEMENTS.GLOBAL.navIndicators.length; i++) {
      if (i < nextPageIndex) {
        UI_ELEMENTS.GLOBAL.navIndicators[i].classList.add("visited");
        UI_ELEMENTS.GLOBAL.navIndicators[i].classList.remove("current");
      } else if (i === nextPageIndex) {
        UI_ELEMENTS.GLOBAL.navIndicators[i].classList.add("current");
        UI_ELEMENTS.GLOBAL.navIndicators[i].classList.remove("visited");
      } else {
        UI_ELEMENTS.GLOBAL.navIndicators[i].classList.remove(
          "current",
          "visited"
        );
      }
    }

    for (let i = 0; i < UI_ELEMENTS.GLOBAL.navIndicatorIcons.length; i++) {
      if (i <= nextPageIndex) {
        UI_ELEMENTS.GLOBAL.navIndicatorIcons[i].classList.add("current");
      } else {
        UI_ELEMENTS.GLOBAL.navIndicatorIcons[i].classList.remove("current");
      }
      addIcons();
    }

    if (direction === 1) {
      STATE_RECORD.CURRENT_PAGE_INDEX++;
      showHideButtons();
    } else if (direction === -1) {
      STATE_RECORD.CURRENT_PAGE_INDEX--;
      nextPageIndex === 0 ? scrollLeftRight() : "";
      showHideButtons();
    }
  } else {
    SHOW_POPUP_ERROR("All fields are not valid");
  }
}

// Function to check if the page is valid or not
export function checkPageValid(currentPageIndex) {
  let valid = false; // Status flag that indicates the validation status of different pages
  switch (currentPageIndex) {
    case 0: // The select service page
      {
        if (SESSION_DATA.service) {
          valid = true;
          nestedFunctions["location"] = init_location_page();
          makeCurrentPage(currentPageIndex + 1, valid, 1);
        } else SHOW_POPUP_ERROR("Please select a service card to move further");
      }
      break;

    case 1: // The address input page
      {
        // The address must be picked from the suggestions and include a street number
        if (SESSION_DATA.address && nestedFunctions["location"].inputValidationStatus.location_street) {
          valid = true;
          init_time_slot();
          makeCurrentPage(currentPageIndex + 1, valid, 1);
        } else {
          // This part will trigger the blur event of the input field to show error if the field is not valid
          nestedFunctions["location"].handleBlur({
            target: UI_ELEMENTS.PAGE_02.locationInputField,
          });
        }
      }
      break;

    case 2: // The time slot page
      {
        if (SESSION_DATA.time_slot) {
          valid = true;
          nestedFunctions["customerInfo"] = init_customer_details_page();
          makeCurrentPage(currentPageIndex + 1, valid, 1);
        } else SHOW_POPUP_ERROR("Please select a time slot to move further");
      }
      break;

    case 3: // The customer info page
      {
        if (nestedFunctions["customerInfo"].addCustomerDataToSession()) {
          valid = true;
          nestedFunctions["cardDetails"] = init_card_details_page();
          makeCurrentPage(currentPageIndex + 1, valid, 1);
        } else {
          // This part will trigger the blur events of the input fields to show error if fields are not valid
          nestedFunctions["customerInfo"].handleBlurFirstName({
            target: UI_ELEMENTS.PAGE_04.firstNameInputField,
          });
          nestedFunctions["customerInfo"].handleBlurLastName({
            target: UI_ELEMENTS.PAGE_04.lastNameInputField,
          });
          nestedFunctions["customerInfo"].handleBlurPhone({
            target: UI_ELEMENTS.PAGE_04.phoneNumberInputField,
          });
          nestedFunctions["customerInfo"].handleBlurEmail({
            target: UI_ELEMENTS.PAGE_04.emailIdInputField,
          });
        }
      }
      break;

    case 4: // The card details page
      {
        if (nestedFunctions["cardDetails"].addCardDataToSession()) {
          valid = true;
          init_confirmation_page();
          makeCurrentPage(currentPageIndex + 1, valid, 1);
        } else {
          // This part will trigger the blur events of the input fields to show error if fields are not valid
          nestedFunctions["cardDetails"].handleBlurCardNumber({
            target: UI_ELEMENTS.PAGE_05.cardNumberInputField,
          });
          nestedFunctions["cardDetails"].handleBlurExpiration({
            target: UI_ELEMENTS.PAGE_05.expirationInputField,
          });
          nestedFunctions["cardDetails"].handleBlurCVV({
            target: UI_ELEMENTS.PAGE_05.cvvInputField,
          });
          nestedFunctions["cardDetails"].handleBlurZipCode({
            target: UI_ELEMENTS.PAGE_05.billingZipcodeInputField,
          });
        }
      }
      break;

    case 5: // The confirmation page
      {
        valid = true;
        init_complete_page();
        makeCurrentPage(currentPageIndex + 1, valid, 1);
      }
      break;

    // What about the last page (case 6) ?
    // From the last page there is no come back option. That's why it doesn't requered
  }
}

// HANDLING THE 'NEXT', 'PREVIOUS', 'SCHEDULE', 'CLOSE' BUTTON CLICK
onReady(() => {
  if (UI_ELEMENTS.GLOBAL.nextBtn) {
    UI_ELEMENTS.GLOBAL.nextBtn.addEventListener("click", () => {
      if (STATE_RECORD.CURRENT_PAGE_INDEX < 5) {
        checkPageValid(STATE_RECORD.CURRENT_PAGE_INDEX);
      }
    });
  }

  if (UI_ELEMENTS.GLOBAL.previousBtn) {
    UI_ELEMENTS.GLOBAL.previousBtn.addEventListener("click", () => {
      if (STATE_RECORD.CURRENT_PAGE_INDEX > 0) {
        makeCurrentPage(STATE_RECORD.CURRENT_PAGE_INDEX - 1, true, -1);
      }
    });
  }

  if (UI_ELEMENTS.GLOBAL.scheduleBtn) {
    UI_ELEMENTS.GLOBAL.scheduleBtn.addEventListener("click", () => {
      if (STATE_RECORD.CURRENT_PAGE_INDEX === 5) {
        tokenizeAndSchedule();
      }
    });
  }

  if (UI_ELEMENTS.GLOBAL.closeBtn) {
    UI_ELEMENTS.GLOBAL.closeBtn.addEventListener("click", () => {
      if (STATE_RECORD.CURRENT_PAGE_INDEX === 6) {
        // Reset the SESSION_DATA object
        Object.keys(SESSION_DATA).forEach((key) => delete SESSION_DATA[key]);
        assign_data_to_SESSION_DATA("brand_id", CONFIG.brand_id);

        // Reset all the global functions and objects
        STATE_RECORD.CURRENT_PAGE_INDEX = 1;
        STATE_RECORD.RECENT_LOCATION_OF_GENERATED_SLOT = "";
        STATE_RECORD.RECENT_SELECTED_SERVICE = "";

        // Reset the input fields
        UI_ELEMENTS.GLOBAL.inputFields.forEach((inputField) => {
          inputField.value = "";
          RESET_INPUTFIELD_VISUALS(inputField);
        }); // selected all the input fields and reset their visuals

        // Reset all the input field validation status
        nestedFunctions["location"].inputValidationStatus.location = false;
        nestedFunctions["customerInfo"].inputValidationStatus.location = false;
        nestedFunctions["cardDetails"].inputValidationStatus.location = false;

        document
          .querySelectorAll(
            "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_page .service_card"
          )
          .forEach((card) => {
            card.classList.contains("selected_card")
              ? card.classList.remove("selected_card")
              : "";
          }); // Removed all the selected card visuals

        // This will add the initial loading animation element into the timeSlotContainer
        UI_ELEMENTS.PAGE_03.timeSlotContainer.innerHTML = `
          <div class="animate_container">
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

        makeCurrentPage(STATE_RECORD.CURRENT_PAGE_INDEX - 1, true, -1); // Directly navigate to the first page
        showHideButtons(); // Adjust the button visibility for the new changes
      }
    });
  }
});
