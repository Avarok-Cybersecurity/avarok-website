(() => {
  "use strict";
  const doc = document.documentElement;

  // Menus are <details>: close them on outside click, Escape, or after following a link.
  const menus = () => document.querySelectorAll("details.legal[open], details.mnav[open]");
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

  // Scroll reveal for the feature groups (the original faded them in on intersection).
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    doc.classList.add("js");
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      }
    }, { threshold: 0.1 });
    reveals.forEach((el) => io.observe(el));
  }

  // Contact form: same EmailJS service/template/public key the original bundle used.
  // These identifiers are public client-side keys by design. If sending fails, the visitor
  // is offered a prefilled mailto: link instead of a dead end.
  const form = document.getElementById("contact-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  const button = form.querySelector("button[type=submit]");
  const EMAILJS = {
    endpoint: "https://api.emailjs.com/api/v1.0/email/send",
    service_id: "service_f8jjzfg",
    template_id: "template_rigpoba",
    user_id: "ciBuyXvR_S4IDbXnl",
    to_email: "thomas@avarok.net",
  };
  const CONTACT = "contact@avarok.net";

  const say = (text, mailto) => {
    status.textContent = text;
    if (mailto) {
      const a = document.createElement("a");
      a.href = mailto;
      a.textContent = "email " + CONTACT;
      status.append(" You can also ", a, ".");
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const mailto = "mailto:" + CONTACT +
      "?subject=" + encodeURIComponent("Message from " + name) +
      "&body=" + encodeURIComponent(message + "\n\n" + name + " <" + email + ">");
    button.disabled = true;
    button.textContent = "Sending...";
    status.textContent = "";
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
      say("Message sent! We'll get back to you as soon as possible.");
      form.reset();
    } catch (err) {
      say("Failed to send message.", mailto);
    } finally {
      button.disabled = false;
      button.textContent = "Submit";
    }
  });
})();
