# Schedule Online: embeddable booking module

A multi-step booking and payment form for service businesses. You write it once and drop it into any website. Each site sets its own name, contact details and colour theme in a config file, and the markup and scripts stay the same.

I built it as the in-house frontend developer for a US car detailing company. In production it ran on more than 20 of their brand websites, each with its own branding. This repository is a cleaned-up demo version: the backend, API keys and client details have been removed, and it runs on mock data.

<!-- Permission line, e.g. "Shared with permission from <company>." -->

**Live demo:** _add your GitHub Pages / Netlify link here_

![Booking flow](docs/booking-flow.gif) <!-- optional: add a short screen recording -->

## What it does

**Two entry points**

- **Service picker (small):** a compact dropdown for home pages. The customer picks a service and is sent to the booking page with it already selected.
- **Booking form (large):** the full seven-step flow.

**The seven steps**

1. **Service:** cards grouped into Top, Middle and Basic tiers, with price and duration.
2. **Location:** address autocomplete, with validation that a street address was chosen.
3. **Date and time:** slots load for the chosen address and service length. Taken slots are shown but disabled.
4. **Customer details:** name, phone and email, validated inline.
5. **Card details:** the number, expiry, CVC and billing ZIP are formatted as you type and validated inline.
6. **Confirm:** a summary of everything. The card is tokenized with Stripe only at this point.
7. **Done:** a personalised confirmation with the business's contact details.

**Details that matter on a live site**

- Raw card data stays in memory and is never written to `localStorage` or `sessionStorage`. It is cleared as soon as Stripe returns a token. Only the masked number is kept for the summary.
- Everything rendered from the API or from user input is HTML-escaped.
- Stale autocomplete responses are ignored, so fast typing never shows the wrong suggestions.
- Clear error states for card declines, slot conflicts (someone else booked the slot first) and network failures.
- Responsive from 360px up. On mobile the step labels collapse into numbered dots.

## Run the demo

The module uses ES modules and loads its markup with `fetch`, so the page has to be served over HTTP. Opening the file directly will not work.

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Use the switcher at the top to see the same module running as three different businesses. On the booking page, any future expiry date, any 3-digit CVC and any 5-digit ZIP will work with the test card `4242 4242 4242 4242`. Nothing is sent anywhere in demo mode.

## Project structure

```
index.html                  Demo home page with the service picker
book.html                   Demo booking page with the full form
demo/                       Demo-only brand switcher and page styles
schedule-online/
  schedule.html             Markup for the full booking form
  schedule-small.html       Markup for the service picker
  css/
    color.css               Colour themes (edit this to rebrand)
    schedule.css            Entry stylesheet for the full form
    schedule-small.css      Entry stylesheet for the picker
    general.css, style.css, query.css
  scripts/
    config.js               Per-site settings
    api.js                  Every network call, plus the mock backend
    mount.js                Drops the module into any page
    general.js              Step navigation and validation for the full form
    common.js               Shared state and helpers
    PAGE-01 … PAGE-07       One file per step
    schedule-small.js       The service picker
  assets/                   Card brand icons, loader
```

## Add it to a site

**1. Configure it** in `schedule-online/scripts/config.js`:

```js
export const CONFIG = {
  mode: "live",                 // "demo" uses mock data
  api_base: "https://api.your-backend.com",
  brand_id: "your-brand-id",
  stripe_key: "pk_live_…",
  business_name: "Your Business",
  business_email: "bookings@yourbusiness.com",
  business_phone: "+1 555 000 0000",
  booking_page_url: "/book",
};
```

**2. Add it to a page:**

```html
<link rel="stylesheet" href="/schedule-online/css/schedule.css" />

<div data-schedule-online="large" data-theme="1"></div>
<script type="module" src="/schedule-online/scripts/mount.js"></script>
```

For the picker, use `schedule-small.css` and `data-schedule-online="small"`.

On a PHP site you can also include the markup on the server (`<?php include "schedule-online/schedule.html"; ?>`) and load `scripts/general.js` as a module.

## Theming

Each site picks a theme with a `color_scheme` attribute. `mount.js` sets it from `data-theme`. Themes are blocks of CSS custom properties in `css/color.css`:

```css
[color_scheme="SCHEDULE_LARGE__4"] {
  --ScheduleHighlight: rgb(234, 88, 12);
  --SchedulePrimary: #c2410c;
  --SchedulePrimary__1: hsl(20, 80%, 60%);
  --SchedulePrimary__2: rgba(194, 65, 12, 0.15);
  --SchedulePrimary__3: rgba(194, 65, 12, 0.3);
  --SchedulePrimary__4: rgba(194, 65, 12, 0.5);
}
```

To add a theme, copy a block, change the values and set `data-theme="4"`. No other file needs to change.

## Backend contract (live mode)

All requests go through `scripts/api.js`. In live mode it expects these endpoints under `api_base`:

| Function | Request |
| --- | --- |
| `getServices()` | `GET /rest/scheduling/line-items?brand-id=…` |
| `getAddressSuggestions(q)` | `GET /rest/form/address_autocomplete?query=…` |
| `getPlaceDetails(id)` | `GET /rest/form/google_place_details?placeid=…` |
| `getSlots(…)` | `GET /rest/scheduling/get_available_appointment_slots?lat=…&lon=…&hours=…&first_day=…&number_of_days=…` |
| `scheduleAppointment(b)` | `POST /rest/scheduling/schedule_online` |

The mock functions in the same file return the exact response shapes, so they double as documentation.

## Notes

- Plain JavaScript (ES modules), HTML and CSS. No framework or build step.
- Card tokenization uses Stripe.js v2 (`Stripe.card.createToken`), which the original backend required. A new integration should use Stripe Elements or Payment Element instead.
- This code was written for a client and is shared here as a portfolio piece. It is not licensed for reuse.
