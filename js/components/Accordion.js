export default function getAccordion() {
  const buttonAccordion = document.querySelectorAll(".accordion__btn");
  buttonAccordion.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("accordion__btn--active")) {
        btn.classList.remove("accordion__btn--active");
        return;
      }

      buttonAccordion.forEach((btnAll) =>
        btnAll.classList.remove("accordion__btn--active"),
      );
      btn.classList.add("accordion__btn--active");
    });
  });
}
