// Mounts the booking module into any page, with no server-side includes.
//
// Usage:
//   <div data-schedule-online="large" data-theme="1"></div>   full booking form
//   <div data-schedule-online="small" data-theme="1"></div>   compact service picker
//   <script type="module" src="schedule-online/scripts/mount.js"></script>
//
// Or call mount() yourself after changing CONFIG (see demo/demo.js).

const moduleRoot = new URL("../", import.meta.url); // the schedule-online/ folder

const VARIANTS = {
  large: { markup: "schedule.html", prefix: "SCHEDULE_LARGE__", script: "./general.js" },
  small: { markup: "schedule-small.html", prefix: "SCHEDULE_SMALL__", script: "./schedule-small.js" },
};

export async function mount(target, { variant = "large", theme = "1" } = {}) {
  const container = typeof target === "string" ? document.querySelector(target) : target;
  const settings = VARIANTS[variant];
  if (!container || !settings) throw new Error(`Cannot mount the "${variant}" booking module`);

  const response = await fetch(new URL(settings.markup, moduleRoot));
  if (!response.ok) throw new Error(`Could not load ${settings.markup}`);
  container.innerHTML = await response.text();

  // Images in the markup are written relative to a page that sits next to the schedule-online folder.
  // Resolve them against the module itself so the page can live anywhere.
  container.querySelectorAll('img[src^="./schedule-online/"]').forEach((img) => {
    img.src = new URL(img.getAttribute("src").replace("./schedule-online/", ""), moduleRoot).href;
  });

  container.firstElementChild.setAttribute("color_scheme", settings.prefix + theme);

  // The scripts look up their elements when they load, so they must load after the markup is in place
  await import(settings.script);
  return container.firstElementChild;
}

// Auto-mount any element that asks for it
if (!window.__SCHEDULE_ONLINE_MANUAL_MOUNT__) {
  document.querySelectorAll("[data-schedule-online]").forEach((el) => {
    mount(el, { variant: el.dataset.scheduleOnline, theme: el.dataset.theme || "1" }).catch((error) =>
      console.error(error)
    );
  });
}
