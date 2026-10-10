// Import necessary helper functions and constants
import {
  assign_data_to_SESSION_DATA,
  UI_ELEMENTS,
  MARK_INPUTFIELD_AS_VALID,
  MARK_INPUTFIELD_AS_INVALID,
  RESET_INPUTFIELD_VISUALS,
} from "./common.js";

// Temporary storage for the data
let tempDataStorage = {};
function assignDataToTempStorage(key, value) {
  tempDataStorage[key] = value;
}

// This function will save the data from the tempDataStorage to the global object
function saveTempDataToSession() {
  for (const key in tempDataStorage) {
    assign_data_to_SESSION_DATA(key, tempDataStorage[key]);
  }
}

// VAlidation status of all the input fields
const inputValidationStatus = {
  first_name: false,
  last_name: false,
  phone: false,
  email: false,
  notes: true, // because notes field doesn't require validation in the same way
};

// ================================================================ //
// THIS IS THE MAIN FUNCTION THAT WILL BE CALLED FOR INITIALIZATION //
// ================================================================ //
export function init_customer_details_page() {
  // This value holds a status flag for input field. this can be used by other code to optimize the code
  const functionHandleStatus = {
    firstName: true,
    lastName: true,
    phoneNumber: true,
    emailId: true,
    customerNote: true,
  };

  // UI_ELEMENTS.PAGE_04.firstNameInputField.removeAttribute("disabled");
  // UI_ELEMENTS.PAGE_04.lastNameInputField.removeAttribute("disabled");
  // UI_ELEMENTS.PAGE_04.phoneNumberInputField.removeAttribute("disabled");
  // UI_ELEMENTS.PAGE_04.emailIdInputField.removeAttribute("disabled");

  // DEFINING SOME FUNCTIONS TO EXECUTE IN DIFFERENT STATE OF THE INPUT FIELD
  UI_ELEMENTS.PAGE_04.firstNameInputField.addEventListener("input", handleInputFirstName);
  UI_ELEMENTS.PAGE_04.firstNameInputField.addEventListener("blur", handleBlurFirstName);
  UI_ELEMENTS.PAGE_04.lastNameInputField.addEventListener("input", handleInputLastName);
  UI_ELEMENTS.PAGE_04.lastNameInputField.addEventListener("blur", handleBlurLastName);
  UI_ELEMENTS.PAGE_04.phoneNumberInputField.addEventListener("input", handleInputPhone);
  UI_ELEMENTS.PAGE_04.phoneNumberInputField.addEventListener("blur", handleBlurPhone);
  UI_ELEMENTS.PAGE_04.emailIdInputField.addEventListener("input", handleInputEmail);
  UI_ELEMENTS.PAGE_04.emailIdInputField.addEventListener("blur", handleBlurEmail);
  UI_ELEMENTS.PAGE_04.customerNoteInputField.addEventListener("input", handleInputNote);
  UI_ELEMENTS.PAGE_04.customerNoteInputField.addEventListener("blur", handleBlurNote);

  function setValueWithCaretPosition(input, newValue) {
    const caretPos = input.selectionStart;
    const oldValue = input.value;

    input.value = newValue;

    let newCaretPos = caretPos + (newValue.length - oldValue.length);
    if (newCaretPos < 0) newCaretPos = 0;
    if (newCaretPos > newValue.length) newCaretPos = newValue.length;

    input.setSelectionRange(newCaretPos, newCaretPos);
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function isValidEmail(email) {
    // Basic pattern for email validation
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return pattern.test(email);
  }

  // ===============FirstName=============== //
  function handleInputFirstName(event) {
    const input_field = event.target;
    functionHandleStatus["firstName"] === true ? RESET_INPUTFIELD_VISUALS(input_field) : "";
    let value = input_field.value.replace(/[^A-Za-z]/g, ""); // Filter out non-alphabetical characters
    value = capitalizeFirstLetter(value); // Capitalize the first letter
    input_field.value = value; // Set the filtered and capitalized value back to the input field

    // Update the validation status and visual state based on whether the field is empty or not
    if (value) {
      inputValidationStatus.first_name = true;
      MARK_INPUTFIELD_AS_VALID(input_field);
      assignDataToTempStorage("first_name", value); // Store the value in temporary storage
    } else {
      inputValidationStatus.first_name = false;
    }
    functionHandleStatus["firstName"] === false ? "" : (functionHandleStatus["firstName"] = false); // Now no code will execute for the true value
  }
  function handleBlurFirstName(event) {
    const input_field = event.target;
    if (!input_field.value.trim()) {
      MARK_INPUTFIELD_AS_INVALID(input_field, "First Name cannot be empty");
      inputValidationStatus.first_name = false; // The validation status is false now
    }
    functionHandleStatus["firstName"] = true; // Now the codes for the true value can execute
  }

  // ================LastName================ //
  function handleInputLastName(event) {
    const input_field = event.target;
    functionHandleStatus["lastName"] === true ? RESET_INPUTFIELD_VISUALS(input_field) : "";
    let value = input_field.value.replace(/[^A-Za-z]/g, ""); // Filter out non-alphabetical characters
    value = capitalizeFirstLetter(value); // Capitalize the first letter
    input_field.value = value; // Set the filtered and capitalized value back to the input field

    // Update the validation status and visual state based on whether the field is empty or not
    if (value) {
      inputValidationStatus.last_name = true;
      MARK_INPUTFIELD_AS_VALID(input_field);
      assignDataToTempStorage("last_name", value); // Store the value in temporary storage
    } else {
      inputValidationStatus.last_name = false;
    }
    functionHandleStatus["lastName"] === false ? "" : (functionHandleStatus["lastName"] = false); // Now no code will execute for the true value
  }
  function handleBlurLastName(event) {
    const input_field = event.target;
    if (!input_field.value.trim()) {
      MARK_INPUTFIELD_AS_INVALID(input_field, "Last Name cannot be empty");
      inputValidationStatus.last_name = false; // The validation status is false now
    }
    functionHandleStatus["lastName"] = true; // Now the codes for the true value can execute
  }

  // ===============PhoneNumber=============== //
  function handleInputPhone(event) {
    const input_field = event.target;
    functionHandleStatus["phoneNumber"] === true ? RESET_INPUTFIELD_VISUALS(input_field) : "";

    let value = input_field.value.replace(/\D/g, "");
    let formattedValue;
    if (value.length > 6) {
      formattedValue = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
    } else if (value.length > 3) {
      formattedValue = `${value.slice(0, 3)} ${value.slice(3)}`;
    } else {
      formattedValue = value;
    }

    setValueWithCaretPosition(input_field, formattedValue);
    if (value.length === 10) {
      MARK_INPUTFIELD_AS_VALID(input_field);
      inputValidationStatus.phone = true; // Changed the validation status as soon as it became valid
      assignDataToTempStorage("phone", formattedValue); // Asigned the value into the temporary storage
      UI_ELEMENTS.PAGE_04.emailIdInputField.focus(); // As soon as the phone number become valid, focusing on the email field
    } else inputValidationStatus.phone = false; // The validation status is false as the input is not valid

    functionHandleStatus["phoneNumber"] === false ? "" : (functionHandleStatus["phoneNumber"] = false); // Now no code can execute for the true value
  }
  function handleBlurPhone(event) {
    const input_field = event.target;
    const onlyDigits = input_field.value.replace(/\D/g, "");
    if (!onlyDigits) {
      MARK_INPUTFIELD_AS_INVALID(input_field, "Phone Number cannot be empty");
      inputValidationStatus.phone = false; // The status is invalid as the field is not valid
    } else if (onlyDigits.length < 10) {
      MARK_INPUTFIELD_AS_INVALID(input_field, "Phone Number is incomplete");
      inputValidationStatus.phone = false; // The status is invalid as the field is not valid
    }
    functionHandleStatus["phoneNumber"] = true; // Now the codes for the true value can execute
  }

  // =================EmailId================= //
  function handleInputEmail(event) {
    const input_field = event.target;
    functionHandleStatus["emailId"] === true ? RESET_INPUTFIELD_VISUALS(input_field) : "";

    let value = input_field.value.trim();
    if (isValidEmail(value)) {
      MARK_INPUTFIELD_AS_VALID(input_field);
      inputValidationStatus.email = true; // The validation status become true as the input is valid
      assignDataToTempStorage("email", value); // Asigned the value into the temporary storage
    } else {
      inputValidationStatus.email = false; // The validation status become false as the input is invalid
    }

    functionHandleStatus["emailId"] === false ? "" : (functionHandleStatus["emailId"] = false); // Now no code for the true value can execute
  }

  function handleBlurEmail(event) {
    const input_field = event.target;
    if (!input_field.value.trim()) {
      MARK_INPUTFIELD_AS_INVALID(input_field, "Email ID cannot be empty");
      inputValidationStatus.email = false;
    } else if (!inputValidationStatus.email) {
      MARK_INPUTFIELD_AS_INVALID(input_field, "Invalid Email ID");
    }
    functionHandleStatus["emailId"] = true; // Now the code for the true value can execute
  }

  // CustomerNote
  function handleInputNote(event) {
    const input_field = event.target;
    let value = input_field.value;
    if (value) functionHandleStatus["customerNote"] === true ? MARK_INPUTFIELD_AS_VALID(input_field) : "";
    if (value.length > 500) setValueWithCaretPosition(input_field, value.substr(0, 500));
    assignDataToTempStorage("notes", input_field.value);
    functionHandleStatus["customerNote"] === false ? "" : (functionHandleStatus["customerNote"] = false);
  }
  function handleBlurNote(event) {
    const input_field = event.target;
    let value = input_field.value;
    if (!value) {
      RESET_INPUTFIELD_VISUALS(input_field);
    }
  }

  /* THis function will check if all the fields valid or not and then it 
call the saveTempDataToSession() to add the data to the SESSION_DATA */
  function addCustomerDataToSession() {
    // Check if all inputValidationStatus values are true
    if (Object.values(inputValidationStatus).every((status) => status)) {
      saveTempDataToSession();
      return true;
    } else {
      // Each invalid field already shows its own message
      return false;
    }
  }

  // Returning some functions that it can be used by other function
  return {
    handleBlurFirstName,
    handleBlurLastName,
    handleBlurPhone,
    handleBlurEmail,
    handleBlurNote,
    addCustomerDataToSession,
    inputValidationStatus,
  };
}
