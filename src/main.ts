import "../styles.css";

const navbar = document.querySelector<HTMLElement>(".navbar");
const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const menuLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-menu a");

if (!navbar || !menuToggle) {
  throw new Error("The primary navigation elements are missing from the page.");
}

const closeMenu = (): void => {
  navbar.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle.addEventListener("click", (): void => {
  const isOpen = navbar.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

menuLinks.forEach((link): void => {
  link.addEventListener("click", closeMenu);
});

const heroWord = document.querySelector<HTMLElement>(".hero-word");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (heroWord && !prefersReducedMotion.matches) {
  const words = ["Businesses", "Developers"];
  let activeWord = 0;

  window.setInterval((): void => {
    heroWord.classList.add("is-flipping");
    window.setTimeout((): void => {
      activeWord = (activeWord + 1) % words.length;
      heroWord.textContent = words[activeWord];
    }, 190);
    window.setTimeout((): void => heroWord.classList.remove("is-flipping"), 430);
  }, 1800);
}

const revealTargets = document.querySelectorAll<HTMLElement>("main > section:not(.hero), .site-footer");
const revealChildSelector = [
  ".hero-copy",
  ".partners",
  ".use-cases-heading",
  ".use-case-card",
  ".features > h2",
  ".feature-item",
  ".developer-heading",
  ".capabilities-intro",
  ".capability-card",
  ".faq-column",
  ".faq-contact-column",
  ".pricing > h2",
  ".billing-toggle",
  ".price-card",
  ".footer-cta",
  ".footer-content",
].join(", ");

if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries): void => {
      entries.forEach((entry): void => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -9%", threshold: 0.08 },
  );

  revealTargets.forEach((target): void => {
    target.classList.add("scroll-reveal");
    target.querySelectorAll<HTMLElement>(revealChildSelector).forEach((child, index): void => {
      child.classList.add("scroll-reveal-child");
      child.style.setProperty("--reveal-delay", `${Math.min(index * 65, 390)}ms`);
    });
    revealObserver.observe(target);
  });
} else {
  revealTargets.forEach((target): void => target.classList.add("is-visible"));
}

const rollingButtons = document.querySelectorAll<HTMLAnchorElement>(
  ".button, .capabilities-cta, .contact-cta, .price-card > a, .footer-cta > a",
);

const addRollingCharacters = (element: HTMLElement, label: string): void => {
  Array.from(label).forEach((character, index): void => {
    const letter = document.createElement("span");
    letter.className = character === " " ? "rolling-character is-space" : "rolling-character";
    letter.style.setProperty("--char-index", String(index));
    letter.textContent = character === " " ? "\u00a0" : character;
    element.append(letter);
  });
};

rollingButtons.forEach((button): void => {
  const label = button.textContent?.trim();
  if (!label) return;

  const icon = button.querySelector("img")?.cloneNode(true);
  const content = document.createElement("span");
  const window = document.createElement("span");
  const outgoing = document.createElement("span");
  const incoming = document.createElement("span");

  button.setAttribute("aria-label", label);
  content.className = "rolling-button-content";
  content.setAttribute("aria-hidden", "true");
  window.className = "rolling-label-window";
  outgoing.className = "rolling-label";
  incoming.className = "rolling-label rolling-label-incoming";
  addRollingCharacters(outgoing, label);
  addRollingCharacters(incoming, label);
  window.append(outgoing, incoming);
  content.append(window);
  if (icon) content.append(icon);
  button.replaceChildren(content);
});

const faqItems = document.querySelectorAll<HTMLElement>(".faq-item");

faqItems.forEach((item): void => {
  const trigger = item.querySelector<HTMLButtonElement>(".faq-trigger");
  if (!trigger) return;

  trigger.addEventListener("click", (): void => {
    const willOpen = !item.classList.contains("is-open");
    faqItems.forEach((other): void => {
      other.classList.remove("is-open");
      other.querySelector<HTMLButtonElement>(".faq-trigger")?.setAttribute("aria-expanded", "false");
    });
    if (willOpen) {
      item.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
});

const billingOptions = document.querySelectorAll<HTMLButtonElement>(".billing-option");
const billingToggle = document.querySelector<HTMLElement>(".billing-toggle");
const planPrices = document.querySelectorAll<HTMLElement>(".price-card strong[data-monthly]");

billingOptions.forEach((option): void => {
  option.addEventListener("click", (): void => {
    billingOptions.forEach((other): void => other.classList.remove("is-selected"));
    option.classList.add("is-selected");
    billingOptions.forEach((other): void => other.setAttribute("aria-pressed", String(other === option)));
    billingToggle?.classList.toggle("is-yearly", option.dataset.period === "yearly");
    const priceKey = option.dataset.period === "yearly" ? "yearly" : "monthly";
    planPrices.forEach((price): void => {
      price.textContent = price.dataset[priceKey] ?? price.textContent;
    });
  });
});
