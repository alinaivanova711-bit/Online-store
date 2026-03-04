import getMenu from "./components/Menu.js";
import getLocation from "./components/Location.js";
import loadProducts from "./components/Data.js";
import getCatalogCards from "./components/Catalog.js";
import updateTypeCounts from "./components/TypeCounts.js";
import getBasket from "./components/Basket.js";
import getAccordion from "./components/Accordion.js";
import { getCardOfDay, getSlider } from "./components/Slider.js";
import { formValidate, postForm, showModal } from "./components/Form.js";

window.addEventListener("DOMContentLoaded", async () => {
  getMenu();
  getLocation();

  const products = await loadProducts();

  updateTypeCounts(products);
  getCatalogCards();
  getBasket();
  getAccordion();
  getCardOfDay();
  getSlider();
  formValidate();
  postForm(form);
  showModal(text);
});
