export default function sortProducts(products, sortValue) {
  const result = [...products];

  if (sortValue === "price-min") {
    result.sort((a, b) => a.price.new - b.price.new);
  }

  if (sortValue === "price-max") {
    result.sort((a, b) => b.price.new - a.price.new);
  }

  if (sortValue === "rating-max") {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}
