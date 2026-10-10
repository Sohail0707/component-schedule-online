"use strict";

import { assign_data_to_SESSION_DATA, STATE_RECORD, UI_ELEMENTS, SESSION_DATA, escapeHTML } from "./common.js";
import { getServices } from "./api.js";
import { checkPageValid } from "./general.js"; // This function will be used to navigate to the next page

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

export function init_service_page() {
  fetchServiceList()
    .then((data) => {
      ServiceStorage.setService(data);
      appendServicesToDOM(data);
    })
    .catch((error) => {
      console.error("Failed to fetch and render service:", error);
    });
}

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

  // If already exists a service
  if (SESSION_DATA.service) {
    if (SESSION_DATA.service.id === serviceCard.service__data.id) {
      serviceCard.classList.add("selected_card");
    }
  }

  serviceCard.addEventListener("click", () => {
    if (SESSION_DATA.service === essentialServiceData && SESSION_DATA.service) {
      delete SESSION_DATA.service;
      serviceCard.classList.remove("selected_card");
    } else {
      assign_data_to_SESSION_DATA("service", essentialServiceData);
      document.querySelectorAll("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_card").forEach((card) => {
        if (card === serviceCard) serviceCard.classList.add("selected_card");
        else card.classList.remove("selected_card");
      });

      // Atutomatically navigatde the next page as a service is selected on this page
      if (STATE_RECORD.CURRENT_PAGE_INDEX < 5) {
        checkPageValid(STATE_RECORD.CURRENT_PAGE_INDEX);
      }
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
    TOP: UI_ELEMENTS.PAGE_01.topServiceContainer,
    MIDDLE: UI_ELEMENTS.PAGE_01.middleServiceContainer,
    BASIC: UI_ELEMENTS.PAGE_01.basicServiceContainer,
  };

  Object.keys(serviceLevels).forEach((level) => {
    serviceLevels[level].innerHTML = ""; // reset the animations
    const filteredServices = serviceListObject.filter((s) => s.level === level).sort((a, b) => b.price - a.price);
    filteredServices.forEach((serviceObject) => {
      const template = getServiceTemplate(serviceObject);
      serviceLevels[level].appendChild(template);
    });
  });

  scrollLeftRight();
}

function adjustScrollButtons(container) {
  const container__1 = container.querySelector(
    "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_container__1"
  );
  const container__2 = container.querySelector(
    "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_container__2"
  );
  const btnLeft = container.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .scrl__left");
  const btnRight = container.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .scrl__right");

  if (container__2.clientWidth <= container__1.clientWidth) {
    btnLeft.style.display = "none";
    btnRight.style.display = "none";
  } else {
    btnLeft.style.display = "";
    btnRight.style.display = "";
  }
}

function throttle(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return fn(...args);
  };
}

export function scrollLeftRight() {
  const serviceContainers = document.querySelectorAll(
    "#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_container"
  );
  serviceContainers.forEach((container) => {
    adjustScrollButtons(container);

    container
      .querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .scrl__left")
      .addEventListener("click", () => {
        container.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_container__1").scrollBy({
          left: -container.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_container__1")
            .clientWidth,
          behavior: "smooth",
        });
        container.classList.replace("right", "left");
      });

    container
      .querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .scrl__right")
      .addEventListener("click", () => {
        container.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_container__1").scrollBy({
          left: container.querySelector("#__SCHEDULE_ONLINE_LARGE.__SCHEDULE_ONLINE_LARGE .service_container__1")
            .clientWidth,
          behavior: "smooth",
        });
        container.classList.replace("left", "right");
      });

    window.addEventListener(
      "resize",
      throttle(() => adjustScrollButtons(container), 150)
    );
  });
}
scrollLeftRight();

/* THIS FUNCTION IS TO HANDLE THE CLICK EVENT FOR THE BUTTON IN THE SERVICE PAGE TO 
SHOW A SPECIFIC SERVICE CONTAINER. */
function handleServiceButtonClick() {
  UI_ELEMENTS.PAGE_01.selectLevelButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("selected")) {
        UI_ELEMENTS.PAGE_01.selectLevelButtons.forEach((button) => {
          button.classList.remove("selected");
        });
        btn.classList.add("selected");
        showOrHideServiceContainer(btn);
      }
    });
  });
}
handleServiceButtonClick();

window.addEventListener("resize", () => {
  if (UI_ELEMENTS.GLOBAL.mainContainer.clientWidth <= 570) handleServiceButtonClick();
});

// this function will help to show or hide a service container
function showOrHideServiceContainer(selectedButton) {
  let indicator = UI_ELEMENTS.PAGE_01.selectLabelIndicator;
  if (selectedButton.classList.contains("top")) {
    indicator.style.left = "0";
    indicator.style.transform = "translateX(0)";
    UI_ELEMENTS.PAGE_01.topServiceMainContainer.style.display = "grid";
  } else UI_ELEMENTS.PAGE_01.topServiceMainContainer.style.display = "none";

  if (selectedButton.classList.contains("middle")) {
    indicator.style.left = "50%";
    indicator.style.transform = "translateX(-50%)";
    UI_ELEMENTS.PAGE_01.middleServiceMainContainer.style.display = "grid";
  } else UI_ELEMENTS.PAGE_01.middleServiceMainContainer.style.display = "none";

  if (selectedButton.classList.contains("basic")) {
    indicator.style.left = "100%";
    indicator.style.transform = "translateX(-100%)";
    UI_ELEMENTS.PAGE_01.basicServiceMainContainer.style.display = "grid";
  } else UI_ELEMENTS.PAGE_01.basicServiceMainContainer.style.display = "none";
}
