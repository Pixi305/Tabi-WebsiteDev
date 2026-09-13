const copyButton = document.querySelector<HTMLButtonElement>("[data-copy]");
const navbar = document.querySelector<HTMLElement>(".navbar");
const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");

menuToggle?.addEventListener("click", (): void => {
  const isOpen = navbar?.classList.toggle("is-open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

copyButton?.addEventListener("click", async (): Promise<void> => {
  const value = copyButton.dataset.copy;
  if (!value) return;

  await navigator.clipboard.writeText(value);
  copyButton.textContent = "Copied";
  window.setTimeout((): void => {
    copyButton.textContent = "Copy";
  }, 1600);
});
