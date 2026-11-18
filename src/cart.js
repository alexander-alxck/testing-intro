function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cartArr, product, quantity) {
  if (quantity < 1 || product.stock < quantity || !Number.isInteger(quantity)) {
    throw new RangeError();
  }

  const existingProduct = cartArr.find((item) => item.id === product.id);

  if (existingProduct === undefined) {
    cartArr.push({ ...product, quantity });

    return cartArr;
  }

  if (existingProduct.quantity + quantity > existingProduct.stock) {
    throw new RangeError();
  }

  existingProduct.quantity += quantity;

  return cartArr;
}

function changeQuantity(cartArr, id, quantity) {
  if (quantity < 1 || !Number.isInteger(quantity)) {
    throw new RangeError();
  }

  const existingProduct = cartArr.find((item) => item.id === id);

  if (existingProduct !== undefined) {
    if (quantity > existingProduct.stock) {
      throw new RangeError();
    }

    existingProduct.quantity = quantity;
  }

  return cartArr;
}

function removeFromCart(cartArr, id) {
  const filteredArr = cartArr.filter((item) => item.id !== id);
  return filteredArr;
}
function calculateCartSubtotal(cartArr) {
  if (!Array.isArray(cartArr)) {
    throw new Error();
  }

  let sum = 0;

  cartArr.forEach((item) =>
    item.price && item.quantity > 0
      ? (sum += item.price * item.quantity)
      : item.price
        ? (sum += item.price)
        : null,
  );

  return sum;
}
function calculateOrderTotal(cartArr, promoCode) {
  const total = {};

  total.subtotal = 0;

  cartArr.forEach((item) => {
    if (Number.isInteger(item.price) && Number.isInteger(item.quantity)) {
      total["subtotal"] += item.price * item.quantity;
    }
  });

  total["delivery"] = total["subtotal"] >= 50000 ? 0 : 30000;

  total["discount"] =
    total["subtotal"] >= 20000 && promoCode === "SAVE10"
      ? Math.trunc(total["subtotal"] / 10)
      : 0;

  total["total"] = total["subtotal"] + total["delivery"] - total["discount"];

  return total;
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
