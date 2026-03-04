import loadProducts from "./Data.js";
import createProductCard from "./ProductCard.js";
import { filterByType, filterByAvailability } from "./Filter.js";
import sortProducts from "./Sort.js";

export default function getCatalogCards() {
  const catalogListEl = document.querySelector(".catalog__list");
  const typeCheckboxes = document.querySelectorAll('input[name="type"]');
  const statusRadios = document.querySelectorAll('input[name="status"]');
  const sortSelect = document.querySelector(".catalog__sort-select");
  let currentPage = 1;
  const itemsPerPage = 6;
  let filteredProducts = [];
  let products = [];

  async function initCatalog() {
    try {
      products = await loadProducts();
      filteredProducts = products.slice();
      render();
      renderPagination();
      initEvents();
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    }
  }

  function initEvents() {
    typeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", applyFilters);
    });

    statusRadios.forEach((radio) => {
      radio.addEventListener("change", applyFilters);
    });

    sortSelect.addEventListener("change", applyFilters);
  }

  function getSelectedTypes() {
    const selectedTypes = [];

    typeCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedTypes.push(checkbox.value);
      }
    });

    return selectedTypes;
  }

  function applyFilters() {
    let result = products.slice();
    const selectedTypes = getSelectedTypes();
    const status = document.querySelector('input[name="status"]:checked').value;

    result = filterByType(result, selectedTypes);
    result = filterByAvailability(result, status);
    result = sortProducts(result, sortSelect.value);

    filteredProducts = result;
    currentPage = 1;

    render();
    renderPagination();
  }

  function render() {
    catalogListEl.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const pageProducts = filteredProducts.slice(start, end);

    pageProducts.forEach((product) => {
      const card = createProductCard(product);
      catalogListEl.append(card);
    });
  }

  function renderPagination() {
    const paginationEl = document.querySelector(".catalog__pagination");
    paginationEl.innerHTML = "";
    const pagesCount = Math.ceil(filteredProducts.length / 6);

    if (pagesCount <= 1) return;

    for (let i = 1; i <= pagesCount; i++) {
      const itemNumberList = document.createElement("li");
      itemNumberList.className = "catalog__pagination-item";

      const numberPageBtn = document.createElement("button");
      numberPageBtn.className = "catalog__pagination-link";
      numberPageBtn.textContent = i;

      if (i === currentPage) {
        numberPageBtn.classList.add("active");
      }

      numberPageBtn.addEventListener("click", () => {
        currentPage = i;
        render();
        renderPagination();
      });

      itemNumberList.append(numberPageBtn);
      paginationEl.append(itemNumberList);
    }
  }

  initCatalog();
}
