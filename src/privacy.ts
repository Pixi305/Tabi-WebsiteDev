const navbar = document.querySelector<HTMLElement>(".navbar");
const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");

menuToggle?.addEventListener("click", (): void => {
  const isOpen = navbar?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
