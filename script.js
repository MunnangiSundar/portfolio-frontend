if (window.location.search.includes("utm_")) {
  window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
}

// Mobile menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Dark / Light mode
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

// Contact form backend connection
const form = document.getElementById("contactForm");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
  const res = await fetch("https://portfolio-backend-leje.onrender.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  const result = await res.json();
  statusText.innerText = result.message;
  form.reset();
} catch (error) {
  console.error("❌ Fetch error:", error);
  statusText.innerText = "Server unreachable. Try again later ❌";
}

});
