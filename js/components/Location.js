export default function getLocation() {
  const locationCityBtnEl = document.querySelector(".location__city");
  const locationCityName = document.querySelector(".location__city-name");
  const locationCityLinks = document.querySelectorAll(".location__sublink");

  locationCityBtnEl.addEventListener("click", function () {
    locationCityBtnEl.classList.toggle("location__city--active");
  });

  locationCityLinks.forEach((link) => {
    link.addEventListener("click", () => {
      locationCityName.textContent = link.textContent;
      locationCityBtnEl.classList.remove("location__city--active");
    });
  });
}
