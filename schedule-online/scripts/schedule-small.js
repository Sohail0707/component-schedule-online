"use strict";

import { UI_ELEMENTS, escapeHTML } from "./common.js";
import { getServices } from "./api.js";
import { CONFIG } from "./config.js";

// The chosen service is handed to the full booking form through localStorage
const storageKey = "SELECTED_SERVICE";

function handleLocalStorage(object, key) {
  try {
    if (key === "update") localStorage.setItem(storageKey, JSON.stringify(object));
    else if (key === "delete") localStorage.removeItem(storageKey);
  } catch (e) {
    // Storage is blocked; the customer will pick the service again on the booking page
  }
}

function getStoredServiceId() {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored).id : null;
  } catch (e) {
    return null;
  }
}

const ServiceStorage = (function () {
  let Service = [];

  return {
    getService: function () {
      return [...Service];
    },
    setService: function (newService) {
      Service = [...newService];
    },
  };
})();

async function fetchServiceList() {
  try {
    return await getServices();
  } catch (error) {
    console.error("There was a problem fetching the service list:", error);
    throw error;
  }
}

function getServiceDescription(serviceSize) {
  return serviceSize.toLowerCase() === "regular" ? "for regular small car" : "for larger car";
}

function getServiceTemplate(serviceObject) {
  const roundedPrice = Math.round(serviceObject.price);
  const descriptionText = getServiceDescription(serviceObject.size);

  // Extracting and formatting the service name to include only the first three words
  const formattedServiceName = serviceObject.name
    .split(/\s+/)
    .filter((word) => !word.match(/[^A-Za-z0-9]/))
    .slice(0, 3)
    .join(" ");

  const serviceCard = document.createElement("div");
  serviceCard.className = "service_card";
  serviceCard.innerHTML = `
      <h4 class="service_title">${escapeHTML(formattedServiceName)}</h4>
      <h2 class="service_price">$${escapeHTML(roundedPrice)}</h2>
      <p class="service_est_time">${escapeHTML(serviceObject.duration)}Hrs.</p>
      <p class="service_description">${escapeHTML(descriptionText)}</p>`;

  serviceCard.service__data = serviceObject;

  serviceCard.addEventListener("click", () => {
    if (getStoredServiceId() === essentialServiceData.id) {
      // To delete from local storage
      handleLocalStorage(essentialServiceData, "delete");
      serviceCard.classList.remove("selected_card");
    } else {
      // To update local storage
      handleLocalStorage(essentialServiceData, "update");
      UI_ELEMENTS.SMALL_MODULE.serviceInputField.value = `${essentialServiceData["name"]} $${essentialServiceData["price"]}`;

      document.querySelectorAll("#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL .service_card").forEach((card) => {
        if (card === serviceCard) serviceCard.classList.add("selected_card");
        else card.classList.remove("selected_card");
      });

      UI_ELEMENTS.SMALL_MODULE.serviceServiceContainer.classList.toggle("hide_list");
    }
  });

  const essentialServiceData = {
    hours: serviceCard.service__data.duration,
    id: serviceCard.service__data.id,
    name: serviceCard.service__data.name,
    order: serviceCard.service__data.order,
    price: serviceCard.service__data.price,
  };

  return serviceCard;
}

function appendServicesToDOM(serviceListObject) {
  if (!serviceListObject.length) {
    console.error("serviceList is empty!");
    return;
  }

  const serviceLevels = {
    TOP: UI_ELEMENTS.SMALL_MODULE.topServiceContainer,
    MIDDLE: UI_ELEMENTS.SMALL_MODULE.middleServiceContainer,
    BASIC: UI_ELEMENTS.SMALL_MODULE.basicServiceContainer,
  };

  // Calculate the max number of cards in any level
  let maxCards = 0;
  Object.keys(serviceLevels).forEach((levelKey) => {
    const levelCardsCount = serviceListObject.filter((s) => s.level === levelKey).length;
    maxCards = Math.max(maxCards, levelCardsCount);
  });

  Object.keys(serviceLevels).forEach((levelKey) => {
    const levelContainer = serviceLevels[levelKey];
    levelContainer.innerHTML = ""; // Clear existing content

    const filteredServices = serviceListObject.filter((s) => s.level === levelKey).sort((a, b) => b.price - a.price);

    // Append actual services
    filteredServices.forEach((serviceObject) => {
      const template = getServiceTemplate(serviceObject);
      levelContainer.appendChild(template);
    });

    // Append dummy cards if needed
    const numberOfDummyCards = maxCards - filteredServices.length;

    for (let i = 0; i < numberOfDummyCards; i++) {
      const dummyCard = document.createElement("div");
      dummyCard.className = "dummy_service_card";
      levelContainer.appendChild(dummyCard);
    }
  });

  handleServiceButtonClick();
}

function init_service_page() {
  fetchServiceList()
    .then((data) => {
      ServiceStorage.setService(data);
      appendServicesToDOM(data);
    })
    .catch((error) => {
      console.error("Failed to fetch and render service:", error);
    });

  // Point the "schedule now" button at this site's booking page
  const scheduleLink = document.querySelector("#__SCHEDULE_ONLINE_SMALL .button_schedule_online_small");
  if (scheduleLink && CONFIG.booking_page_url) scheduleLink.setAttribute("href", CONFIG.booking_page_url);

  UI_ELEMENTS.SMALL_MODULE.serviceInputBox.addEventListener("click", () => {
    UI_ELEMENTS.SMALL_MODULE.serviceServiceContainer.classList.toggle("hide_list");
  });
}
init_service_page();

/* THIS FUNCTION IS TO HANDLE THE CLICK EVENT FOR THE BUTTON IN THE SERVICE PAGE TO 
SHOW A SPECIFIC SERVICE CONTAINER. */
function handleServiceButtonClick() {
  UI_ELEMENTS.SMALL_MODULE.selectLevelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("selected")) {
        UI_ELEMENTS.SMALL_MODULE.selectLevelButtons.forEach((button) => {
          button.classList.remove("selected");
        });
        btn.classList.add("selected");
        showOrHideServiceContainer(btn);
      }
    });
  });
}

// this function will help to show or hide a service container
function showOrHideServiceContainer(selectedButton) {
  let indicator = UI_ELEMENTS.SMALL_MODULE.selectLabelIndicator;
  if (selectedButton.classList.contains("top")) {
    indicator.style.left = "0";
    indicator.style.transform = "translateX(0)";
    UI_ELEMENTS.SMALL_MODULE.serviceList.style.transform = `translateX(0)`;
  }

  if (selectedButton.classList.contains("middle")) {
    indicator.style.left = "50%";
    indicator.style.transform = "translateX(-50%)";
    UI_ELEMENTS.SMALL_MODULE.serviceList.style.transform = `translateX(calc(-100% / 3))`;
  }

  if (selectedButton.classList.contains("basic")) {
    indicator.style.left = "100%";
    indicator.style.transform = "translateX(-100%)";
    UI_ELEMENTS.SMALL_MODULE.serviceList.style.transform = `translateX(calc(-100% / 3 * 2))`;
  }
}

// Make the input field responsive
window.addEventListener("resize", fit_mainSmallModule_to_window);

function fit_mainSmallModule_to_window() {
  if (UI_ELEMENTS.GLOBAL.mainSmallModule.clientWidth <= 450) {
    UI_ELEMENTS.GLOBAL.mainSmallModule.style.fontSize = "9px";
    document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL .select_service_section"
    ).style.minWidth = `32em`;
  } else {
    document.querySelector(
      "#__SCHEDULE_ONLINE_SMALL.__SCHEDULE_ONLINE_SMALL .select_service_section"
    ).style.minWidth = `40em`;
    UI_ELEMENTS.GLOBAL.mainSmallModule.style.fontSize = "10px";
  }
}
fit_mainSmallModule_to_window();
