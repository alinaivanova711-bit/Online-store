export function filterByType(products, selectedTypes) {
  if (!selectedTypes.length) {
  return products;
  } return products.filter(product =>
    product.type.some(type => selectedTypes.includes(type))
  );
}


export function filterByAvailability(products, status) {
  if (status !== 'instock') {
    return products;
  } return products.filter(product =>
        product.availability.moscow > 0 ||
        product.availability.orenburg > 0 ||
        product.availability.saintPetersburg > 0
    );
}