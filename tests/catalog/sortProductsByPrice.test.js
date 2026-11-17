const products = require("../../src/data/products");
const { sortProductsByPrice } = require("../../src/catalog");

describe("sortProductsByPrice", () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, "asc").map((item) => item.id)).toEqual(
      [3, 6, 5, 4, 2, 1],
    );
  });
  test("все товары без направления сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products).map((item) => item.id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ]);
  });
  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const filteredProducts = products.filter((item) =>
      [1, 3, 4].includes(item.id),
    );

    expect(
      sortProductsByPrice(filteredProducts, "asc").map((item) => item.id),
    ).toEqual([3, 4, 1]);
  });
  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(
      sortProductsByPrice(products, "desc").map((item) => item.id),
    ).toEqual([1, 2, 4, 5, 6, 3]);
  });
  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const filteredProducts = [3, 1, 4].map((id) =>
      products.find((findItem) => id === findItem.id),
    );

    expect(
      sortProductsByPrice(filteredProducts, "desc").map((item) => item.id),
    ).toEqual([1, 4, 3]);
  });
  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const filteredProducts = [5, 2, 6].map((id) =>
      products.find((item) => item.id === id),
    );

    expect(
      sortProductsByPrice(filteredProducts, "desc").map((item) => item.id),
    ).toEqual([2, 5, 6]);
  });
  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const filteredProducts = products.filter((item) =>
      [1, 3, 4].includes(item.id),
    );

    sortProductsByPrice(filteredProducts, "asc");

    expect(filteredProducts.map((item) => item.id)).toEqual([1, 3, 4]);
  });
  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const filteredProducts = products.filter((item) =>
      [1, 3, 4].includes(item.id),
    );

    sortProductsByPrice(filteredProducts, "desc");
    const ids = filteredProducts.map((item) => item.id);

    expect(ids).toEqual([1, 3, 4]);
  });
  test("направление по умолчанию не меняет исходный массив всех товаров", () => {
    const startArr = [...products];
    sortProductsByPrice(startArr);

    expect(startArr).toEqual(products);
  });
});
