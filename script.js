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

  // Contact form
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
      // Send to backend
      const res = await fetch("https://portfolio-backend-leje.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Backend failed");

      // Send email (non-blocking)
      emailjs.send("service_b20zgmx", "template_Ik04Ixm", data)
        .catch(err => console.warn("EmailJS failed:", err));

      const result = await res.json();
      statusText.innerText = result.message || "Message sent successfully ✅";
      form.reset();

    } catch (error) {
      console.error("❌ Submit error:", error);
      statusText.innerText = "Server unreachable. Try again ❌";
    }
  });

});
