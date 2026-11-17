(() => {
  "use strict";
  // Menus are <details>: close them on outside click, Escape, or after following a link.
  const menus = () => document.querySelectorAll("details.mnav[open]");
  document.addEventListener("click", (e) => {
    for (const d of menus()) {
      if (!d.contains(e.target) || e.target.closest("a")) d.open = false;
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    for (const d of menus()) {
      d.open = false;
      d.querySelector("summary").focus();
    }
  });

  // Installable PWA: the service worker precaches the shell and serves /offline/ without a network.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch((err) => console.warn("service worker not registered", err));
  }

  // The offline page is shown at whatever URL failed; "Try again" retries that URL (without
  // script it falls back to the home page).
  for (const a of document.querySelectorAll("a[data-retry]")) a.href = location.href;

  // Contact form: same EmailJS service/template/public key the original bundle used.
  // These identifiers are public client-side keys by design. If sending fails, the visitor
  // is offered a prefilled mailto: link instead of a dead end.
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  const error = document.getElementById("form-error");
  const button = form.querySelector("button[type=submit]");
  const EMAILJS = {
    endpoint: "https://api.emailjs.com/api/v1.0/email/send",
    service_id: "service_f8jjzfg",
    template_id: "template_rigpoba",
    user_id: "ciBuyXvR_S4IDbXnl",
    to_email: "thomas@avarok.net",
  };
  const CONTACT = "contact@avarok.net";

  // Success is announced politely (role=status); a failure interrupts (role=alert) and says
  // the message is kept. Both regions are in the page from the start.
  const succeed = (text) => {
    error.textContent = "";
    status.textContent = text;
  };
  const fail = (mailto) => {
    status.textContent = "";
    const a = document.createElement("a");
    a.href = mailto;
    a.textContent = "email " + CONTACT;
    error.replaceChildren("Your message wasn't sent, and it is still in the form. Try again, or ", a, ".");
  };
  let sending = false;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const mailto = "mailto:" + CONTACT +
      "?subject=" + encodeURIComponent("Message from " + name) +
      "&body=" + encodeURIComponent(message + "\n\n" + name + " <" + email + ">");
    // aria-disabled rather than disabled, so the focused button keeps focus while sending.
    sending = true;
    button.setAttribute("aria-disabled", "true");
    button.textContent = "Sending...";
    status.textContent = "";
    error.textContent = "";
    try {
      const res = await fetch(EMAILJS.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lib_version: "4.4.1",
          service_id: EMAILJS.service_id,
          template_id: EMAILJS.template_id,
          user_id: EMAILJS.user_id,
          template_params: { from_name: name, from_email: email, to_email: EMAILJS.to_email, message },
        }),
      });
      if (!res.ok) throw new Error("EmailJS responded " + res.status);
      succeed("Message sent! We'll get back to you as soon as possible.");
      form.reset();
    } catch (err) {
      fail(mailto);
    } finally {
      sending = false;
      button.removeAttribute("aria-disabled");
      button.textContent = "Send message";
    }
  });
})();
