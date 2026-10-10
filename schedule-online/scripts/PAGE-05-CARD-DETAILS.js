import {
  assign_data_to_SESSION_DATA,
  assign_data_to_BILLING_INFO,
  UI_ELEMENTS,
  MARK_INPUTFIELD_AS_VALID,
  MARK_INPUTFIELD_AS_INVALID,
  RESET_INPUTFIELD_VISUALS,
} from "./common.js";

let tempDataStorage = {}; // For storing the card information till the user goes to the next step

function assignDataToTempStorage(key, value) {
  if (key === "expiration") {
    const [month, year] = value.split(" / ");
    tempDataStorage["cc_exp_month"] = month;
    tempDataStorage["cc_exp_year"] = year;
  } else {
    tempDataStorage[key] = value;
  }
}

function maskCardDetails(cardNumber) {
  const maskedSection = cardNumber.slice(0, -4).replace(/\d/g, "*");
  const visibleSection = cardNumber.slice(-4);
  return maskedSection.match(/.{1,4}/g).join(" ") + " " + visibleSection;
}

// Only a masked card number and the expiry are kept with the booking data.
// The full number and CVV stay in BILLING_INFO, are used once to create the payment token,
// and are then cleared. They are never sent to the booking API or written to the console.
function saveTempDataToSession() {
  assign_data_to_SESSION_DATA("cc_number", maskCardDetails(tempDataStorage.cc_number));
  assign_data_to_SESSION_DATA("cc_exp_month", tempDataStorage.cc_exp_month);
  assign_data_to_SESSION_DATA("cc_exp_year", tempDataStorage.cc_exp_year);

  assign_data_to_BILLING_INFO("cc_number", tempDataStorage.cc_number);
  assign_data_to_BILLING_INFO("cc_cvc", tempDataStorage.cc_cvc);
  assign_data_to_BILLING_INFO("cc_exp_month", tempDataStorage.cc_exp_month);
  assign_data_to_BILLING_INFO("cc_exp_year", tempDataStorage.cc_exp_year);
  assign_data_to_BILLING_INFO("cc_zip", tempDataStorage.cc_zip);
}

const inputValidationStatus = {
  cardNumber: false,
  expiration: false,
  cvv: false,
  billingZipcode: false,
};

export function init_card_details_page() {
  const elements = UI_ELEMENTS.PAGE_05;
  const {
    cardNumberInputField,
    expirationInputField,
    cvvInputField,
    billingZipcodeInputField,
  } = elements;

  // [
  //   cardNumberInputField,
  //   expirationInputField,
  //   cvvInputField,
  //   billingZipcodeInputField,
  // ].forEach((input) => input.removeAttribute("disabled"));

  cardNumberInputField.addEventListener("input", handleInputCardNumber);
  cardNumberInputField.addEventListener("blur", handleBlurCardNumber);
  expirationInputField.addEventListener("input", handleInputExpiration);
  expirationInputField.addEventListener("blur", handleBlurExpiration);
  cvvInputField.addEventListener("input", handleInputCVV);
  cvvInputField.addEventListener("blur", handleBlurCVV);
  billingZipcodeInputField.addEventListener("input", handleInputZipCode);
  billingZipcodeInputField.addEventListener("blur", handleBlurZipCode);

  function isValidCardNumber(number) {
    let sum = 0,
      shouldDouble = false;

    // Luhn algorithm
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);
      if (shouldDouble) {
        digit = digit * 2 > 9 ? digit * 2 - 9 : digit * 2;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    // If the sum modulo 10 is 0, the card number is valid
    return sum % 10 === 0;
  }

  function isValidExpirationDate(month, year) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);

    return (
      expYear > currentYear ||
      (expYear === currentYear && expMonth >= currentMonth)
    );
  }

  function setValueWithCaretPosition(input, newValue) {
    const caretPos = input.selectionStart;
    const oldValue = input.value;

    input.value = newValue;

    let newCaretPos = caretPos + (newValue.length - oldValue.length);
    newCaretPos = Math.min(Math.max(newCaretPos, 0), newValue.length);

    input.setSelectionRange(newCaretPos, newCaretPos);
  }

  function handleInputCardNumber(event) {
    const input = event.target;
    RESET_INPUTFIELD_VISUALS(input);
    let value = input.value.replace(/\D/g, "").substring(0, 16);
    let formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setValueWithCaretPosition(input, formattedValue);
  }

  function handleBlurCardNumber(event) {
    const input = event.target;
    const value = input.value.replace(/\D/g, "");

    if (!value) {
      inputValidationStatus.cardNumber = false;
      MARK_INPUTFIELD_AS_INVALID(input, "Card number cannot be empty");
    } else if (!isValidCardNumber(value)) {
      inputValidationStatus.cardNumber = false;
      MARK_INPUTFIELD_AS_INVALID(input, "Invalid card number");
    } else {
      inputValidationStatus.cardNumber = true;
      assignDataToTempStorage("cc_number", value);
      MARK_INPUTFIELD_AS_VALID(input);
    }
  }

  function handleInputExpiration(event) {
    const input = event.target;
    RESET_INPUTFIELD_VISUALS(input); // Clear any previous validation visuals
    inputValidationStatus.expiration = false;

    let value = input.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Ensure the first two characters are treated as the month and the last two as the year.
    if (value.length > 2) {
      value = value.substring(0, 2) + " / " + value.substring(2, 4);
    } else if (value.length > 0 && value.length <= 2) {
      value = value.substring(0, 2); // Keep the first two characters as MM
    }

    // Set the formatted value back to the input with caret position maintained
    setValueWithCaretPosition(input, value);

    // Ensure the input is at most 7 characters, in the format MM / YY
    if (value.length > 7) {
      input.value = value.substring(0, 7); // Trim to 7 characters
    }
  }

  function handleBlurExpiration(event) {
    const input = event.target;
    const value = input.value;

    // Check if the input value is exactly 7 characters, representing MM / YY
    if (value.length === 7) {
      const [month, year] = value.split(" / ");

      // Simple validation for month and year format
      const expMonth = parseInt(month, 10);
      const expYear = parseInt(year, 10);

      // Check if the month is valid (1-12)
      if (expMonth >= 1 && expMonth <= 12) {
        inputValidationStatus.expiration = true;
        assignDataToTempStorage("expiration", value); // Store the valid expiration
        MARK_INPUTFIELD_AS_VALID(input); // Mark the field as valid
        // Optionally, move focus to the next field
        // cvvInputField.focus();
      } else {
        MARK_INPUTFIELD_AS_INVALID(input, "Invalid month. Use format MM / YY");
        inputValidationStatus.expiration = false;
      }
    } else {
      // If the length is not exactly 7, mark the input as invalid
      MARK_INPUTFIELD_AS_INVALID(
        input,
        "Expiration date must be in MM / YY format."
      );
      inputValidationStatus.expiration = false;
    }
  }

  function handleInputCVV(event) {
    const input = event.target;
    RESET_INPUTFIELD_VISUALS(input);
    input.value = input.value.replace(/\D/g, "");
  }

  function handleBlurCVV(event) {
    const input = event.target;
    if (!input.value) {
      inputValidationStatus.cvv = false;
      MARK_INPUTFIELD_AS_INVALID(input, "CVV cannot be empty");
    } else if (input.value.length < 3) {
      inputValidationStatus.cvv = false;
      MARK_INPUTFIELD_AS_INVALID(input, "Incomplete CVV");
    } else if (input.value.length >= 3 && input.value.length <= 4) {
      inputValidationStatus.cvv = true;
      assignDataToTempStorage("cc_cvc", input.value);
      MARK_INPUTFIELD_AS_VALID(input);
    }
  }

  function handleInputZipCode(event) {
    const input = event.target;
    RESET_INPUTFIELD_VISUALS(input);
    input.value = input.value.replace(/\D/g, "");
  }

  function handleBlurZipCode(event) {
    const input = event.target;
    if (!input.value) {
      inputValidationStatus.billingZipcode = false;
      MARK_INPUTFIELD_AS_INVALID(input, "Billing Zip Code cannot be empty");
    } else {
      const zipRegex = /^\d{5}(-\d{4})?$/;
      if (zipRegex.test(input.value)) {
        assignDataToTempStorage("cc_zip", input.value);
        inputValidationStatus.billingZipcode = true;
        MARK_INPUTFIELD_AS_VALID(input);
      } else {
        inputValidationStatus.billingZipcode = false;
        MARK_INPUTFIELD_AS_INVALID(input, "Invalid Zip Code");
      }
    }
  }

  function addCardDataToSession() {
    if (Object.values(inputValidationStatus).every((status) => status)) {
      saveTempDataToSession();
      return true;
    } else {
      return false;
    }
  }

  return {
    handleBlurCardNumber,
    handleBlurExpiration,
    handleBlurCVV,
    handleBlurZipCode,
    addCardDataToSession,
    inputValidationStatus,
  };
}
