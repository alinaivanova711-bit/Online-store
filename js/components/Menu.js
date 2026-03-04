export default function getMenu() {
  const burgerBtnEl = document.querySelector(".header__catalog-btn");
  const mainMenuEl = document.querySelector(".main-menu");
  const menuCloseBtnEl = document.querySelector(".main-menu__close");

  if (!burgerBtnEl || !mainMenuEl || !menuCloseBtnEl) return;

  burgerBtnEl.addEventListener("click", () => {
    mainMenuEl.classList.toggle("main-menu--active");
  });

  menuCloseBtnEl.addEventListener("click", () => {
    mainMenuEl.classList.remove("main-menu--active");
  });
}