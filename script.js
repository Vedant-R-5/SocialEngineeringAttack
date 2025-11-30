// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close nav when clicking a link (mobile)
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    }
  });
}

// Scroll reveal using IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: just show all
  revealElements.forEach((el) => el.classList.add("reveal-visible"));
}

// Fake action buttons (home quick actions)
const fakeButtons = document.querySelectorAll(".fake-action-btn");

fakeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    btn.textContent = "Action simulated ✔";
    setTimeout(() => {
      btn.classList.remove("clicked");
      btn.textContent = btn.dataset.originalText || btn.textContent.replace(" ✔", "");
    }, 1500);
  });

  // Store original text for restore
  if (!btn.dataset.originalText) {
    btn.dataset.originalText = btn.textContent;
  }
});

// Demo contact form handler (front-end only)
function handleDemoForm(event) {
  event.preventDefault();
  const statusEl = document.getElementById("demoFormStatus");
  if (!statusEl) return;

  statusEl.textContent = "Form submitted in demo mode. No data was sent to any server.";
  statusEl.style.color = "#a7f3d0";

  // Optionally clear fields to show effect
  event.target.reset();
}
