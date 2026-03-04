export default function updateTypeCounts(products) {
  const form = document.querySelector(".catalog-form");
  const checkboxes = form.querySelectorAll(".custom-checkbox__field");

  checkboxes.forEach(checkbox => {
    let count = 0;

    products.forEach(product => {
      if (product.type.includes(checkbox.value)) {
        count++;
      }
    });

    const countElement = checkbox
      .closest(".custom-checkbox")
      .querySelector(".custom-checkbox__count");

    if (!countElement) return;

    countElement.textContent = count;
  });
}