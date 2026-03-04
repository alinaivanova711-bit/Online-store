import loadProducts from "./Data.js";
import createProductCard from "./ProductCard.js";

export async function getCardOfDay() {
  const productDayListEl = document.querySelector(".day-products__list");
  const products = await loadProducts();
  const goodsOfDay = products.filter((product) => product.goodsOfDay === true);

  goodsOfDay.forEach((product) => {
    const productDayItemEl = document.createElement("li");
    productDayItemEl.classList.add("day-products__item", "swiper-slide");
    const card = createProductCard(product);
    productDayItemEl.append(card);
    productDayListEl.append(productDayItemEl);
  });
}

export function getSlider() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: ".day-products__navigation-btn--next",
      prevEl: ".day-products__navigation-btn--prev",
    },
  });
}
