window.cart = {};

function addToCart(item) {
  if (window.cart[item.id]) {
    window.cart[item.id].quantity += 1;
  } else {
    window.cart[item.id] = { item, quantity: 1 };
  }

  updateCart();
  updateDeleteButton(item);
  updateCheckoutButtonState();
}

function removeFromCart(item) {
  if (window.cart[item.id] && window.cart[item.id].quantity > 0) {
    const cartItem = window.cart[item.id];

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      delete window.cart[item.id];
    }

    updateCart();
    updateDeleteButton(item);
    updateCheckoutButtonState();
  }
}

function updateCart() {
  const cartItemCount = Object.values(window.cart).reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const formattedItemCount = String(cartItemCount).padStart(2, '0');

  const cartTotalPrice = Object.values(window.cart)
    .reduce(
      (total, cartItem) =>
        total +
        parseFloat(cartItem.item.price.replace('$', '').trim()) *
          cartItem.quantity,
      0
    )
    .toFixed(2);

  const cartItemCountElement = document.querySelector('.shop-cart-count');
  cartItemCountElement.textContent = `Total Items: ${formattedItemCount}`;

  const cartTotalPriceElement = document.querySelector('.shop-cart-total');
  cartTotalPriceElement.textContent = `Total to Pay: €${cartTotalPrice}`;
}

function updateDeleteButton(item) {
  const itemCard = document.querySelector(`.shop-item[data-id="${item.id}"]`);
  const deleteButton = itemCard.querySelector('.shop-item__delete-button');
  const inactiveDeleteButton = itemCard.querySelector(
    '.shop-item__delete-button--inactive'
  );

  if (window.cart[item.id] && window.cart[item.id].quantity > 0) {
    deleteButton.style.display = 'block';
    inactiveDeleteButton.style.display = 'none';
  } else {
    deleteButton.style.display = 'none';
    inactiveDeleteButton.style.display = 'inline-block';
  }
}

function updateCheckoutButtonState() {
  const checkoutButton = document.querySelector('.shop-checkout-btn');

  if (Object.keys(window.cart).length > 0) {
    checkoutButton.disabled = false;
    checkoutButton.title = 'Proceed to Checkout';
  } else {
    checkoutButton.disabled = true;
    checkoutButton.title = 'Add items to your cart to proceed';
  }
}

document.addEventListener('DOMContentLoaded', updateCheckoutButtonState);
