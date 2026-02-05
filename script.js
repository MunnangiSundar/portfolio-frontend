document.addEventListener("DOMContentLoaded", () => {

  if (window.location.search.includes("utm_")) {
    window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
  }

  // Mobile menu
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  hamburger?.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Dark / Light mode
  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
  });

  // ✅ Contact form — EMAILJS ONLY (Mobile Safe)
  const form = document.getElementById("contactForm");
  const statusText = document.getElementById("status");

  if (!form) return;

  emailjs.init("oUkx6oYUy5tBaNsO1");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    statusText.innerText = "Sending... ⏳";

    try {
      await emailjs.send("service_b20zgmx", "template_Ik04Ixm", data);
      statusText.innerText = "Message sent successfully ✅";
      form.reset();
    } catch (error) {
      console.error("❌ EmailJS error:", error);
      statusText.innerText = "Failed to send ❌";
    }
  });

});
