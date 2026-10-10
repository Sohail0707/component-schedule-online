import { UI_ELEMENTS, FORMATTED_CUSTOM_DATE, SESSION_DATA, escapeHTML } from "./common.js";
import { APPOINTMENT_DATA } from "./PAGE-06-CONFIRMATION.js";
import { CONFIG } from "./config.js";

// This fuction returns the greeting message based on the local time
function getGreetingMessage() {
  // Get the current local time of the user
  const now = new Date();

  // Extract the hour from the local time
  const hour = now.getHours();

  // Determine the appropriate greeting based on the hour
  let greeting;
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  return greeting;
}

// ================================================================ //
// THIS IS THE MAIN FUNCTION THAT WILL BE CALLED FOR INITIALIZATION //
// ================================================================ //
export function init_complete_page() {
  const e = escapeHTML;
  const appointment = APPOINTMENT_DATA.appointment;

  // Clear anything left from a previous booking in the same visit
  UI_ELEMENTS.PAGE_07.sectionCompletePage.querySelectorAll(".greeting_txt").forEach((el) => el.remove());
  UI_ELEMENTS.PAGE_07.completeMessageBody.querySelectorAll(".successful_message").forEach((el) => el.remove());

  const greetingTextHTML = `<h1 class="greeting_txt"><span>${getGreetingMessage()} ${e(appointment.customer.first_name)},</span></h1>`;
  const messageBody = document.createElement("div");
  messageBody.className = "successful_message";
  messageBody.innerHTML = `
  <span>Thanks for choosing ${e(CONFIG.business_name)}. Your appointment is scheduled for</span>
    <span class="highlight">${e(FORMATTED_CUSTOM_DATE(appointment.start_time_text))}</span>
    <span>. We've emailed the details to</span>
    <span class="highlight">${e(appointment.customer.emails[0].email)}</span>
    <br />
    <br />
    <span>The technician will visit you at</span>
    <span class="highlight">${e(appointment.address.formatted_address)}</span>
    <span>. Please allow a two-hour arrival window. After the service is complete, you will be charged</span>
    <span class="highlight">$${e(appointment.line_items[0].price)}</span>
    <span>for</span>
    <span class="highlight">${e(String(appointment.line_items[0].name).toUpperCase())}</span>
    <span>on your card</span>
    <span class="highlight">${e(SESSION_DATA.cc_number)}</span>`;

  UI_ELEMENTS.PAGE_07.sectionCompletePage.insertAdjacentHTML("afterbegin", greetingTextHTML);
  UI_ELEMENTS.PAGE_07.completeMessageBody.insertAdjacentHTML("afterbegin", messageBody.outerHTML);

  fillBusinessContact();
}

// The contact details shown after booking come from this site's config
function fillBusinessContact() {
  const box = UI_ELEMENTS.PAGE_07.completeMessageBody.querySelector(".contact_info_box");
  if (!box) return;
  const emailLink = box.querySelector("a.business_email");
  const phoneLink = box.querySelector("a.business_phone");
  if (emailLink) {
    emailLink.href = `mailto:${CONFIG.business_email}`;
    emailLink.querySelector(".email").textContent = CONFIG.business_email;
  }
  if (phoneLink) {
    phoneLink.href = `tel:${CONFIG.business_phone.replace(/[^+\d]/g, "")}`;
    phoneLink.querySelector(".phone").textContent = CONFIG.business_phone;
  }
}
