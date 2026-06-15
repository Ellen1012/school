const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id], article[id]");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const submitButton = document.querySelector(".contact-form button[type='submit']");

function closeMenu() {
    navMenu?.classList.remove("is-open");
    navToggle?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Բացել մենյուն");
}

// Toggle the responsive navigation for phone and tablet layouts.
navToggle?.addEventListener("click", () => {
    const isOpen = navMenu?.classList.toggle("is-open");

    navToggle.classList.toggle("is-open", Boolean(isOpen));
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
    navToggle.setAttribute("aria-label", isOpen ? "Փակել մենյուն" : "Բացել մենյուն");
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Highlight the current section in the header while scrolling.
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    },
    {
        rootMargin: "-40% 0px -52% 0px",
        threshold: 0
    }
);

sections.forEach((section) => observer.observe(section));

// Static preview feedback for the contact form.
function showFormSuccess(event) {
    event.preventDefault();

    if (!contactForm?.reportValidity()) {
        return;
    }

    formStatus.textContent = "Շնորհակալություն։ Ձեր հաղորդագրությունը հաջողությամբ ընդունվեց։";
    contactForm.reset();
}

contactForm?.addEventListener("submit", showFormSuccess);
submitButton?.addEventListener("click", showFormSuccess);
