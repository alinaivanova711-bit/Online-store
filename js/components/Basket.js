import loadProducts from "./Data.js";

export default async function getBasket() {
  const basketHeaderBtn = document.querySelector(".header__user-btn");
  const basketEl = document.querySelector(".basket");
  const emptyBasketBlock = document.querySelector(".basket__empty-block");
  const basketCountEl = document.querySelector(".header__user-count");
  const basketListEl = document.querySelector(".basket__list");
  const orderLinkEl = document.querySelector(".basket__link");
  const catalogListEl = document.querySelector(".catalog__list");

  const products = await loadProducts();
  let count = 0;
  updateCounter();

  basketHeaderBtn.addEventListener("click", function () {
    basketEl.classList.toggle("basket--active");
  });

  catalogListEl.addEventListener("click", (event) => {
    const cardAddBasket = event.target.closest(".product-card__link.btn--icon");
    if (!cardAddBasket) return;
    event.preventDefault();
    const id = Number(cardAddBasket.dataset.id);
    const product = products.find((p) => p.id === id);

    if (product) {
      addToBasket(product);
    }
  });

  function updateCounter() {
    basketCountEl.textContent = count;
    if (count === 0) {
      emptyBasketBlock.style.display = "block";
      orderLinkEl.style.display = "none";
    } else {
      emptyBasketBlock.style.display = "none";
      orderLinkEl.style.display = "flex";
    }
  }

  function addToBasket(product) {
    const existingItem = basketListEl.querySelector(
      `.basket__item[data-id="${product.id}"]`,
    );

    if (existingItem) {
      increaseCount(existingItem);
      return;
    }

    const itemBasketEl = document.createElement("li");
    itemBasketEl.className = "basket__item";
    itemBasketEl.dataset.id = product.id;
    itemBasketEl.dataset.count = 1;
    itemBasketEl.dataset.price = product.price.new;

    itemBasketEl.innerHTML = `
            <div class="basket__img">
                <img src="${product.image}" height="60" width="60">
            </div>
            <span class="basket__name">${product.name}</span>
            <span class="basket__price">${product.price.new} руб</span>
            <button class="basket__close" type="button">
                  <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
                  </svg>
            </button>
        `;

    const countEl = document.createElement("span");
    countEl.className = "basket__count";
    countEl.textContent = "";
    itemBasketEl.append(countEl);

    orderLinkEl.style.display = "flex";

    basketListEl.append(itemBasketEl);
    count++;
    updateCounter();
  }

  document.addEventListener("click", function (event) {
    const deleteBtnBasket = event.target.closest(".basket__close");
    if (!deleteBtnBasket) return;

    const basketItem = deleteBtnBasket.closest(".basket__item");

    let countProduct = Number(basketItem.dataset.count);

    if (countProduct > 1) {
      countProduct--;
      basketItem.dataset.count = countProduct;
      const countEl = basketItem.querySelector(".basket__count");
      countEl.textContent = `x ${countProduct}`;
      const price = Number(basketItem.dataset.price);
      const priceEl = basketItem.querySelector(".basket__price");
      priceEl.textContent = `${price * countProduct} руб`;
    } else {
      basketItem.remove();
    }

    count--;
    updateCounter();
  });

  function increaseCount(itemEl) {
    let countProduct = Number(itemEl.dataset.count) + 1;
    itemEl.dataset.count = countProduct;

    const countEl = itemEl.querySelector(".basket__count");
    countEl.textContent = `× ${countProduct}`;

    const price = Number(itemEl.dataset.price);
    const priceEl = itemEl.querySelector(".basket__price");
    priceEl.textContent = `${price * countProduct} руб`;

    count++;
    updateCounter();
  }
}
