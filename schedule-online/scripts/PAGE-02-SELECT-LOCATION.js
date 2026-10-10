import {
  assign_data_to_SESSION_DATA,
  UI_ELEMENTS,
  SESSION_DATA,
  MARK_INPUTFIELD_AS_VALID,
  MARK_INPUTFIELD_AS_INVALID,
  RESET_INPUTFIELD_VISUALS,
  DISPLAY_SELECTED_ITEM_PREVIEW,
} from "./common.js";
import { getAddressSuggestions, getPlaceDetails } from "./api.js";

const suggetLocationContainer = UI_ELEMENTS.PAGE_02.suggestLocationContainer; // This is the container where all the location suggestions will be placed

const inputValidationStatus = {
  // This object will store the validation states of the input fields
  location: false,
  location_street: false,
};

// ============================================================= //
// THIS THE MAIN FUNCTION THAT WILL BE CALLED FOR INITIALIZATION //
// ============================================================= //
export function init_location_page() {
  // All the event handlers are initialized here
  UI_ELEMENTS.PAGE_02.locationInputField.addEventListener("input", handleKeyUp);
  UI_ELEMENTS.PAGE_02.locationInputField.addEventListener("input", handleInput);
  UI_ELEMENTS.PAGE_02.locationInputField.addEventListener("blur", handleBlur);
  suggetLocationContainer.addEventListener("click", handleLocationListClick);

  const functionHandleStatus = {
    // This value holds a status flag for input field. this can be used by other code to optimize the code
    location: true,
  };

  DISPLAY_SELECTED_ITEM_PREVIEW(
    UI_ELEMENTS.PAGE_02.previewSelectedContainer,
    false,
    true
  );
  let placeIdMap = new Map();

  suggetLocationContainer.addEventListener("mousedown", (e) => {
    e.preventDefault();
  }); // If clicked on the suggetLocationContainer, it will not be recognized as the click event

  function handleKeyUp() {
    const searchedValue = UI_ELEMENTS.PAGE_02.locationInputField.value; // Value of the input field
    if (searchedValue) {
      getAddressSuggestions(searchedValue)
        .then((data) => {
          // Ignore answers that arrive after the customer has kept typing
          if (UI_ELEMENTS.PAGE_02.locationInputField.value !== searchedValue) return;
          const predictions = data.predictions || []; // Assuming the response has a 'predictions' field
          handlePredictions(predictions, "OK", searchedValue);
        })
        .catch((error) => {
          console.error("Error fetching location suggestions:", error);
          updateLocationList([]); // Clear the suggestions in case of error
        });
    } else {
      updateLocationList([]);
    }
  }

  // This function will generate location suggestions based on the input field value
  function handlePredictions(predictions, status, searchedValue) {
    if (status !== "OK") {
      updateLocationList([]);
      return;
    }

    placeIdMap.clear();
    const results = predictions.map((pred) => ({
      description: pred.description,
      placeId: pred.place_id,
    }));

    const listItems = results
      .filter((data) =>
        data.description.toLowerCase().includes(searchedValue.trim().toLowerCase())
      )
      .map((data, index) => {
        placeIdMap.set(index.toString(), data.placeId);
        const li = document.createElement("li");
        li.setAttribute("data-unique-id", index.toString());
        const span = document.createElement("span");
        span.textContent = data.description;
        li.appendChild(span);
        return li;
      });

    updateLocationList(listItems);

    // Check if any suggestion matches the input exactly, it will automatically select that
    const matchedItem = listItems.find(
      (item) => item.textContent.toLowerCase() === searchedValue.toLowerCase()
    );
    if (matchedItem) {
      handleLocationSelection(matchedItem);
      // Navigate to the next page automatically. This functionality will execute when using the autocomplete service.
    }
  }

  // It will call the handleLocationSelection to update the input field for the selected location suggestion
  function handleLocationListClick(e) {
    const addressItem = e.target.closest("li");
    if (!addressItem) return;
    handleLocationSelection(addressItem);
  }

  // This function updates the location suggestion container with the newly generated location elements
  function updateLocationList(items) {
    suggetLocationContainer.innerHTML = "";
    items.forEach((item) => suggetLocationContainer.appendChild(item));

    const listClassList = suggetLocationContainer.classList;
    if (items.length > 0) {
      listClassList.remove("collapsing");
      listClassList.add("expanding");
    } else {
      listClassList.remove("expanding");
      listClassList.add("collapsing");
    }
  }

  // This function will insert the location text from the selectedItem into the input field
  function handleLocationSelection(selectedItem) {
    setTimeout(() => {
      UI_ELEMENTS.PAGE_02.locationInputField.value = selectedItem.textContent;
      // Any other actions that need to be taken after setting the value
    }, 300);
    applyVisualEffectsForSelectedItem(selectedItem);
    const uniqueId = selectedItem.getAttribute("data-unique-id");
    const placeId = placeIdMap.get(uniqueId);
    if (placeId) {
      fetchDetailsAndStore(placeId, (detailedAddress) => {
        if (detailedAddress && detailedAddress.street_number) {
          inputValidationStatus["location_street"] = true;
          MARK_INPUTFIELD_AS_VALID(UI_ELEMENTS.PAGE_02.locationInputField);
        } else {
          inputValidationStatus["location_street"] = false;
          MARK_INPUTFIELD_AS_INVALID(
            UI_ELEMENTS.PAGE_02.locationInputField,
            "Street number is missing in the location"
          );
        }
        UI_ELEMENTS.PAGE_02.locationInputField.blur();
      });
    }
    inputValidationStatus["location"] = true; // Updated the validation status of the location input field
  }

  // This will add or remove some classes, which will be used by CSS to create animation
  function applyVisualEffectsForSelectedItem(selectedItem) {
    selectedItem.style.setProperty("--index", "0");
    selectedItem.classList.add("fade-out");

    const totalItems = suggetLocationContainer.children.length;
    Array.from(suggetLocationContainer.children).forEach((child, index) => {
      if (child !== selectedItem) {
        child.style.setProperty("--index", totalItems - 1 - index);
        child.classList.add("fade-out");
      }
    });
    suggetLocationContainer.classList.replace("expanding", "collapsing");
  }

  // This function handles the behavior when given input into the input field
  function handleInput(event) {
    const input_field = event.target;
    if (functionHandleStatus["location"] === true) {
      RESET_INPUTFIELD_VISUALS(input_field);
      inputValidationStatus["location"] = false;
      delete SESSION_DATA.address; // Removed the saved address as new input is given into the input field
      functionHandleStatus["location"] === false
        ? ""
        : (functionHandleStatus["location"] = false); // Now until other code makes it true, the 'RESET_INPUTFIELD_VISUALS' will not execute any more
    }
  }

  // This function handles the behavior when the input field is out of focus
  function handleBlur(event) {
    const input_field = event.target;
    const areSuggestionsDisplayed = suggetLocationContainer.children.length > 0;

    if (!input_field.value.trim()) {
      // Case 1: Empty Location
      MARK_INPUTFIELD_AS_INVALID(input_field, "Location cannot be empty");
    } else if (inputValidationStatus["location"] === false) {
      // Check if there are suggestions displayed
      if (areSuggestionsDisplayed) {
        // Case 3: Incomplete Location
        MARK_INPUTFIELD_AS_INVALID(
          input_field,
          "Location is incomplete, please select a valid location"
        );
      }
    } else if (inputValidationStatus["location_street"] === false) {
      // Case 2: Invalid Location (could be due to missing street number)
      MARK_INPUTFIELD_AS_INVALID(
        input_field,
        "Street number is missing in the location"
      );
    }

    functionHandleStatus["location"] = true;
  }

  // This function extracts different values of the address and returns them as an object
  function extractAddressDetails(place) {
    const addressComponentsMap = {
      street_number: "street_number",
      route: "street_name",
      neighborhood: "neighborhood",
      locality: "city",
      administrative_area_level_1: "state",
      postal_code: "zip",
    };

    let refinedAddress = {};
    const components = place.address_components || [];

    components.forEach((component) => {
      component.types.forEach((type) => {
        if (addressComponentsMap[type]) {
          refinedAddress[addressComponentsMap[type]] = component.short_name;
        }
      });
    });

    // Concatenate street_number and street_name to form the street
    if (refinedAddress.street_number && refinedAddress.street_name) {
      refinedAddress.street = `${refinedAddress.street_number} ${refinedAddress.street_name}`;
    }

    // Check and safely set formatted_address, place_id, and geometry details
    refinedAddress.formatted_address = place.formatted_address || "N/A";
    refinedAddress.google_place_id = place.place_id || "N/A";

    if (place.geometry && place.geometry.location) {
      refinedAddress.lat = place.geometry.location.lat || "N/A";
      refinedAddress.lon = place.geometry.location.lng || "N/A";
    } else {
      console.warn("Geometry location is missing in the place object.");
      refinedAddress.lat = "N/A";
      refinedAddress.lon = "N/A";
    }

    refinedAddress.google_place_vicinity = place.vicinity || "N/A";

    return refinedAddress;
  }

  // This function will fetch the details of the location and store it in the global object
  function fetchDetailsAndStore(placeId, callback) {
    getPlaceDetails(placeId)
      .then((place) => {
        const detailedAddress = extractAddressDetails(place.result);

        assign_data_to_SESSION_DATA("address", detailedAddress);
        if (callback && typeof callback === "function") {
          callback(detailedAddress);
        }
      })
      .catch((error) => {
        console.error("Error fetching place details:", error);
      });
  }

  return { handleBlur, inputValidationStatus }; // Returning them so they can be used outside of this file by other codes
}
