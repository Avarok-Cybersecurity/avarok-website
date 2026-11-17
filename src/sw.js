// The service worker. tools/build.py emits it as /sw.js prefixed with VERSION (a SHA3 digest of
// everything precached) and PRECACHE (the shell, the offline page, the icons and the script).
// It makes avarok.net installable and gives it an offline page. Navigations always try the
// network first, so a visitor online never sees a stale page; nothing is cached at run time.
/* global VERSION, PRECACHE */
const OFFLINE = "/offline/";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() =>
      caches.match(OFFLINE, { cacheName: VERSION }).then((hit) => hit ?? Response.error())));
    return;
  }
  if (!PRECACHE.includes(url.pathname)) return;
  event.respondWith(caches.match(request, { cacheName: VERSION }).then((hit) => hit ?? fetch(request)));
});
