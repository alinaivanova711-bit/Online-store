export default async function loadProducts() {
  const response = await fetch("./data/data.json");

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
