// Per-site settings. Each website that installs the module gets its own copy of this file.
//
// mode: "demo" runs the whole booking flow against the mock backend in api.js,
//       with no network calls and no real payments.
//       "live" calls your booking API at `api_base` and tokenizes cards with Stripe.

export const CONFIG = {
  mode: "demo",

  // Live mode only
  api_base: "https://api.example.com", // Your booking API, no trailing slash
  brand_id: "demo-brand", // Which brand's services and calendar to load
  stripe_key: "", // Stripe publishable key (pk_live_... or pk_test_...)

  // Shown to the customer on the confirmation screen
  business_name: "Shine Mobile Detailing",
  business_email: "bookings@example.com",
  business_phone: "+1 555 010 0199",

  // Where the compact service picker sends the customer
  booking_page_url: "book.html",
};
