// Import necessary helper functions and constants
import {
  UI_ELEMENTS,
  SESSION_DATA,
  BILLING_INFO,
  STATE_RECORD,
  assign_data_to_SESSION_DATA,
  FORMATTED_CUSTOM_DATE,
  SHOW_SERVER_ERROR,
  addIcons,
  escapeHTML,
  clear_BILLING_INFO,
} from "./common.js";
import { tokenizeCard, scheduleAppointment as sendBooking } from "./api.js";
import { checkPageValid, makeCurrentPage } from "./general.js";
import { init_time_slot } from "./PAGE-03-SELECT-TIME-SLOT.js";

export let APPOINTMENT_DATA = {}; // This object stores the returned data by the server

// ================================================================ //
// THIS IS THE MAIN FUNCTION THAT WILL BE CALLED FOR INITIALIZATION //
// ================================================================ //
export function init_confirmation_page() {
  const page = UI_ELEMENTS.PAGE_06;
  const e = escapeHTML;

  page.serviceNamePreview.innerHTML = `<span>${e(SESSION_DATA.service.name)} ${e(SESSION_DATA.service.hours)}Hrs (Approx)</span>`;

  page.appointmentTimePreview.innerHTML = `${e(FORMATTED_CUSTOM_DATE(SESSION_DATA.time_slot.start_time_display))}
  <br /><span class="attention">*Please allow the technician a two hours arrival window</span>`;

  page.serviceLocationPreview.innerHTML = e(SESSION_DATA.address.formatted_address);
  page.customerNamePreview.innerHTML = `${e(SESSION_DATA.first_name)} ${e(SESSION_DATA.last_name)}`;
  page.customerPhonePreview.innerHTML = e(SESSION_DATA.phone);
  page.customerEmailPreview.innerHTML = e(SESSION_DATA.email);

  page.billingDetailsPreview.innerHTML = `${e(SESSION_DATA.cc_number)} &nbsp; ${e(SESSION_DATA.cc_exp_month)}/${e(SESSION_DATA.cc_exp_year)}
  <br /><span class="attention">**The card will not be charged until after service is complete</span>`;

  page.totalAmmountPreview.innerHTML = `$${e(SESSION_DATA.service.price)}`;
  page.serviceNotePreview.innerHTML = e(SESSION_DATA.notes || "");
}

// Step 1: turn the card into a token. Step 2: send the booking with the token.
export async function tokenizeAndSchedule() {
  addProcessAnimation();
  const cardDetails = {
    number: BILLING_INFO.cc_number,
    cvc: BILLING_INFO.cc_cvc,
    exp_month: BILLING_INFO.cc_exp_month,
    exp_year: BILLING_INFO.cc_exp_year,
    address_zip: BILLING_INFO.cc_zip,
  };

  let token;
  try {
    token = await tokenizeCard(cardDetails);
  } catch (error) {
    console.error("Card tokenization failed:", error && error.message);
    updateAnimation("Invalid card details", "ERROR");
    if (error && error.code === "invalid_expiry_year") {
      SHOW_SERVER_ERROR("Your card expiration is invalid. Please enter the year correctly");
    } else {
      SHOW_SERVER_ERROR("We couldn't verify this card. Please check your card details");
    }
    STATE_RECORD.CURRENT_PAGE_INDEX = 5;
    makeCurrentPage(STATE_RECORD.CURRENT_PAGE_INDEX - 1, true, -1); // Back to the card details page
    return;
  }

  clear_BILLING_INFO(); // The raw card details are no longer needed
  assign_data_to_SESSION_DATA("cc_stripe_token", token.id);
  await scheduleAppointment();
}

// Sends the booking to the server
async function scheduleAppointment() {
  updateAnimation("confirming appointment...");

  let result;
  try {
    result = await sendBooking(SESSION_DATA);
  } catch (error) {
    console.error("Booking request failed:", error);
    updateAnimation("Error scheduling appointment", "ERROR");
    SHOW_SERVER_ERROR("We couldn't reach the booking system. Please try again in a moment");
    return;
  }

  const { ok, data } = result;
  if (ok) {
    updateAnimation("APPOINTMENT SUCCESSFUL !!!", "SUCCESS");
    APPOINTMENT_DATA = data;
    if (STATE_RECORD.CURRENT_PAGE_INDEX === 5) checkPageValid(STATE_RECORD.CURRENT_PAGE_INDEX);
    return;
  }

  updateAnimation("Error scheduling appointment", "ERROR");

  if (data.error_id === "STRIPE_ERROR") {
    SHOW_SERVER_ERROR("Your card was declined. Please check your card details");
    STATE_RECORD.CURRENT_PAGE_INDEX = 5;
    makeCurrentPage(STATE_RECORD.CURRENT_PAGE_INDEX - 1, true, -1); // Back to the card details page
  } else if (data.error_id === "SCHEDULING_CONFLICT") {
    SHOW_SERVER_ERROR("That time slot was just booked. Please pick another time");
    STATE_RECORD.CURRENT_PAGE_INDEX = 3;
    makeCurrentPage(STATE_RECORD.CURRENT_PAGE_INDEX - 1, true, -1); // Back to the time slot page
    STATE_RECORD.RECENT_LOCATION_OF_GENERATED_SLOT = "";
    init_time_slot(); // Reload the slots so the taken one disappears
  } else {
    SHOW_SERVER_ERROR("Something went wrong while booking. Please try again");
  }
}

// SCHEDULING ANIMATION
function addProcessAnimation() {
  let animateEl = document.createElement("div"); // This is the entire animation element. it will be displayed to the front during the scheduling process
  animateEl.className = "animation_background process_animation_el";
  animateEl.innerHTML = `<div class="animation_container">
          <span id="process_indication" class="spin_animation"></span>
          <span class="process_text">Creating Token...</span>
        </div>`;

  document
    .querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE")
    .insertAdjacentElement("beforeend", animateEl);
}

/* This function updates the content and classes from the existing animation element to show the process.
It require two arguments. status, which can be ERROR, SUCCESS or none. and the text to display for the current process
*/
function updateAnimation(text = "", status = "") {
  const processAnimationEl = document.querySelector(
    "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .process_animation_el"
  );
  if (status === "ERROR") {
    processAnimationEl.classList.add("ERROR");
    processAnimationEl.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #process_indication").className =
      "";
    processAnimationEl.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #process_indication"
    ).innerHTML = `<i class="i" name="cross"></i>`;
    addIcons();
    processAnimationEl.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .process_text").innerHTML = text;
    setTimeout(() => {
      processAnimationEl.style.opacity = 0;
    }, 1500);
    setTimeout(() => {
      processAnimationEl.remove();
    }, 2000);
  } else if (status === "SUCCESS") {
    processAnimationEl.classList.add("SUCCESS");
    processAnimationEl.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #process_indication").className =
      "";
    processAnimationEl.querySelector(
      "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE #process_indication"
    ).innerHTML = `<i class="i" name="checkmark"></i>`;
    processAnimationEl.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .process_text").innerHTML = text;
    addIcons();
    setTimeout(() => {
      processAnimationEl.style.opacity = 0;
    }, 1500); // waits for a moment to read the successful text by the user
    setTimeout(() => {
      processAnimationEl.remove();
    }, 2000); // Completely removing the animation element after successfully scheduling
  } else
    processAnimationEl.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .process_text").innerHTML = text;
}
