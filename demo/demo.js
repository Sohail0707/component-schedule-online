// Demo only: shows the same booking module running for three different brands.
// On a real site you would edit schedule-online/scripts/config.js once and skip this file.

window.__SCHEDULE_ONLINE_MANUAL_MOUNT__ = true;

import { CONFIG } from "../schedule-online/scripts/config.js";
import { mount } from "../schedule-online/scripts/mount.js";

const BRANDS = {
  shine: {
    theme: "1",
    business_name: "Shine Mobile Detailing",
    tagline: "Showroom finish, in your driveway.",
    business_email: "bookings@shine.example",
    business_phone: "+1 555 010 0199",
  },
  evergreen: {
    theme: "2",
    business_name: "Evergreen Auto Spa",
    tagline: "Eco-friendly detailing that comes to you.",
    business_email: "hello@evergreen.example",
    business_phone: "+1 555 010 0142",
  },
  redline: {
    theme: "3",
    business_name: "Redline Detail Co.",
    tagline: "Fast, precise detailing for busy drivers.",
    business_email: "team@redline.example",
    business_phone: "+1 555 010 0177",
  },
};

const params = new URLSearchParams(location.search);
const brandKey = BRANDS[params.get("brand")] ? params.get("brand") : "shine";
const brand = BRANDS[brandKey];

// Same module, different settings
Object.assign(CONFIG, {
  business_name: brand.business_name,
  business_email: brand.business_email,
  business_phone: brand.business_phone,
  booking_page_url: `book.html?brand=${brandKey}`,
});

document.documentElement.dataset.brand = brandKey;
document.title = document.title.replace("{brand}", brand.business_name);
document.querySelectorAll("[data-brand-name]").forEach((el) => (el.textContent = brand.business_name));
document.querySelectorAll("[data-brand-tagline]").forEach((el) => (el.textContent = brand.tagline));
document.querySelectorAll("[data-keep-brand]").forEach((a) => {
  const url = new URL(a.getAttribute("href"), location.href);
  url.searchParams.set("brand", brandKey);
  a.href = url.pathname.split("/").pop() + url.search;
});

// Brand switcher: reloads the page so the module starts fresh with the new settings
document.querySelectorAll("[data-switch-brand]").forEach((button) => {
  const key = button.dataset.switchBrand;
  button.setAttribute("aria-pressed", String(key === brandKey));
  button.addEventListener("click", () => {
    if (key === brandKey) return;
    params.set("brand", key);
    location.search = params.toString();
  });
});

const target = document.querySelector("[data-demo-mount]");
mount(target, { variant: target.dataset.demoMount, theme: brand.theme }).catch((error) => {
  console.error(error);
  target.innerHTML =
    '<p class="demo-error">The booking form could not load. Open this page through a web server, not as a local file.</p>';
});
