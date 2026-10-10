// Every call the module makes to the outside world goes through this file.
// In "live" mode it talks to the booking API and Stripe.
// In "demo" mode it answers from the mock backend below, so the flow runs anywhere,
// including a static host such as GitHub Pages.

import { CONFIG } from "./config.js";

const isDemo = CONFIG.mode !== "live";

// ---------------------------------------------------------------- //
// Public API
// ---------------------------------------------------------------- //

export async function getServices() {
  if (isDemo) return delay(MOCK_SERVICES, 500);
  const url = `${CONFIG.api_base}/rest/scheduling/line-items?brand-id=${encodeURIComponent(CONFIG.brand_id)}`;
  return getJSON(url);
}

// Returns { predictions: [{ description, place_id }] }
export async function getAddressSuggestions(query) {
  if (isDemo) return delay(mockPredictions(query), 150);
  const url = `${CONFIG.api_base}/rest/form/address_autocomplete?query=${encodeURIComponent(query)}`;
  return getJSON(url);
}

// Returns { result: <Google Place Details shape> }
export async function getPlaceDetails(placeId) {
  if (isDemo) return delay(mockPlaceDetails(placeId), 200);
  const url = `${CONFIG.api_base}/rest/form/google_place_details?placeid=${encodeURIComponent(placeId)}`;
  return getJSON(url);
}

// Returns { slots: [{ start_time, end_time, start_time_display, end_time_display }], number_of_days }
export async function getSlots({ lat, lon, hours, firstDay, numberOfDays }) {
  if (isDemo) return delay(mockSlots(hours, firstDay, numberOfDays), 600);
  const params = new URLSearchParams({
    lat,
    lon,
    hours,
    first_day: firstDay.toUTCString(),
    number_of_days: numberOfDays,
    timestamp: Date.now(),
  });
  return getJSON(`${CONFIG.api_base}/rest/scheduling/get_available_appointment_slots?${params}`);
}

// Turns card details into a one-time token. The raw card number never goes to the booking API.
// Resolves with { id } or rejects with { code, message }.
export async function tokenizeCard(card) {
  if (isDemo) return delay({ id: "tok_demo_" + Math.random().toString(36).slice(2, 10) }, 700);

  await loadStripeV2();
  return new Promise((resolve, reject) => {
    window.Stripe.card.createToken(card, (status, response) => {
      if (response.error) reject(response.error);
      else resolve({ id: response.id });
    });
  });
}

// Resolves with { ok, data } so the caller can read error_id on failure
export async function scheduleAppointment(booking) {
  if (isDemo) return delay({ ok: true, data: mockAppointment(booking) }, 800);

  const response = await fetch(`${CONFIG.api_base}/rest/scheduling/schedule_online?timestamp=${Date.now()}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  const data = await response.json();
  return { ok: response.ok, data };
}

// ---------------------------------------------------------------- //
// Helpers
// ---------------------------------------------------------------- //

async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  return response.json();
}

function delay(value, ms) {
  return new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), ms));
}

let stripeLoading;
function loadStripeV2() {
  if (window.Stripe && window.Stripe.card) return Promise.resolve();
  if (!stripeLoading) {
    stripeLoading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v2/";
      script.onload = () => {
        window.Stripe.setPublishableKey(CONFIG.stripe_key);
        resolve();
      };
      script.onerror = () => reject(new Error("Could not load Stripe.js"));
      document.head.appendChild(script);
    });
  }
  return stripeLoading;
}

// ---------------------------------------------------------------- //
// Mock backend (demo mode)
// ---------------------------------------------------------------- //

const MOCK_SERVICES = [
  { id: "s1", name: "Signature Full Detail", price: 349, duration: 5, size: "large", level: "TOP", order: 1 },
  { id: "s2", name: "Signature Full Detail", price: 299, duration: 4, size: "regular", level: "TOP", order: 2 },
  { id: "s3", name: "Ceramic Shine Package", price: 449, duration: 6, size: "large", level: "TOP", order: 3 },
  { id: "s4", name: "Interior Deep Clean", price: 219, duration: 3, size: "large", level: "MIDDLE", order: 4 },
  { id: "s5", name: "Interior Deep Clean", price: 179, duration: 3, size: "regular", level: "MIDDLE", order: 5 },
  { id: "s6", name: "Exterior Wash Wax", price: 159, duration: 2, size: "large", level: "MIDDLE", order: 6 },
  { id: "s7", name: "Express Wash", price: 89, duration: 1, size: "large", level: "BASIC", order: 7 },
  { id: "s8", name: "Express Wash", price: 69, duration: 1, size: "regular", level: "BASIC", order: 8 },
];

const MOCK_ADDRESSES = [
  { street_number: "1600", route: "Pennsylvania Ave NW", city: "Washington", state: "DC", zip: "20500", lat: 38.8977, lng: -77.0365 },
  { street_number: "2021", route: "K St NW", city: "Washington", state: "DC", zip: "20006", lat: 38.9024, lng: -77.0459 },
  { street_number: "1100", route: "Wilson Blvd", city: "Arlington", state: "VA", zip: "22209", lat: 38.8951, lng: -77.0716 },
  { street_number: "700", route: "King St", city: "Alexandria", state: "VA", zip: "22314", lat: 38.8048, lng: -77.0469 },
  { street_number: "11900", route: "Market St", city: "Reston", state: "VA", zip: "20190", lat: 38.9586, lng: -77.3570 },
  { street_number: "4400", route: "Jenifer St NW", city: "Washington", state: "DC", zip: "20015", lat: 38.9578, lng: -77.0827 },
];

function formatMockAddress(a) {
  return `${a.street_number ? a.street_number + " " : ""}${a.route}, ${a.city}, ${a.state} ${a.zip}, USA`;
}

const mockPlaces = new Map();

function mockPredictions(query) {
  const q = query.trim().toLowerCase();
  let matches = MOCK_ADDRESSES.filter((a) => formatMockAddress(a).toLowerCase().includes(q));

  // Nothing in the sample list matches: offer the typed text as an address so any input can be tried.
  // Without a leading house number it fails validation, the same way a real street-only result would.
  if (!matches.length && q.length >= 3) {
    const m = query.trim().match(/^(\d+)\s+(.*)$/);
    matches = [
      {
        street_number: m ? m[1] : "",
        route: titleCase(m ? m[2] : query.trim()),
        city: "Washington",
        state: "DC",
        zip: "20001",
        lat: 38.9072,
        lng: -77.0369,
      },
    ];
  }

  return {
    predictions: matches.slice(0, 5).map((a) => {
      const place_id = "demo_" + formatMockAddress(a).toLowerCase().replace(/[^a-z0-9]+/g, "_");
      mockPlaces.set(place_id, a);
      return { description: formatMockAddress(a), place_id };
    }),
  };
}

function mockPlaceDetails(placeId) {
  const a = mockPlaces.get(placeId);
  if (!a) return { result: {} };
  const component = (type, value) => ({ types: [type], short_name: value, long_name: value });
  const components = [
    component("route", a.route),
    component("locality", a.city),
    component("administrative_area_level_1", a.state),
    component("postal_code", a.zip),
  ];
  if (a.street_number) components.unshift(component("street_number", a.street_number));

  return {
    result: {
      address_components: components,
      formatted_address: formatMockAddress(a),
      place_id: placeId,
      geometry: { location: { lat: a.lat, lng: a.lng } },
      vicinity: `${a.route}, ${a.city}`,
    },
  };
}

// Open Monday to Saturday, 8am to 6pm. A slot starts every two hours if the job fits before closing.
function mockSlots(hours, firstDay, numberOfDays) {
  const slots = [];
  const now = new Date();
  const start = new Date(firstDay);
  start.setHours(0, 0, 0, 0);

  for (let d = 0; d < numberOfDays; d++) {
    const day = new Date(start);
    day.setDate(start.getDate() + d);
    if (day.getDay() === 0) continue; // closed on Sundays

    for (let hour = 8; hour + Number(hours) <= 18; hour += 2) {
      const s = new Date(day);
      s.setHours(hour, 0, 0, 0);
      if (s <= now) continue;
      // Some slots are already taken, picked from the date so the calendar looks the same on every visit
      if ((s.getDate() * 7 + hour) % 5 === 0) continue;
      const e = new Date(s);
      e.setHours(hour + Number(hours));
      slots.push({
        start_time: s.toISOString(),
        end_time: e.toISOString(),
        start_time_display: s.toISOString(),
        end_time_display: e.toISOString(),
      });
    }
  }
  return { slots, number_of_days: numberOfDays };
}

function mockAppointment(booking) {
  return {
    appointment: {
      customer: { first_name: booking.first_name, emails: [{ email: booking.email }] },
      start_time_text: booking.time_slot.start_time_display,
      address: { formatted_address: booking.address.formatted_address },
      line_items: [{ name: booking.service.name, price: booking.service.price }],
    },
  };
}

function titleCase(text) {
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
}
