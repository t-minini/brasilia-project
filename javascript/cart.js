// Global cart object to store item quantities
window.cart = {};

// Function to add an item to the cart
function addToCart(item) {
  // Add item to the cart or increase quantity if already in the cart
  if (window.cart[item.id]) {
    window.cart[item.id].quantity += 1;
  } else {
    window.cart[item.id] = { item, quantity: 1 }; // Store item with quantity 1
  }

  updateCart(); // Update cart UI
  updateDeleteButton(item); // Update delete button visibility
}

// Function to remove one item from the cart
function removeFromCart(item) {
  if (window.cart[item.id] && window.cart[item.id].quantity > 0) {
    const cartItem = window.cart[item.id];

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1; // Decrease quantity by 1
    } else {
      delete window.cart[item.id]; // Remove the item if quantity is 0
    }

    updateCart(); // Update cart UI
    updateDeleteButton(item); // Update delete button visibility
  }
}

// Function to update the cart UI (display item count and total price)
function updateCart() {
  const cartItemCount = Object.values(window.cart).reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  // Calculate the total price by multiplying quantity with price
  const cartTotalPrice = Object.values(window.cart)
    .reduce(
      (total, cartItem) =>
        total +
        parseFloat(cartItem.item.price.replace('$', '').trim()) *
          cartItem.quantity,
      0
    )
    .toFixed(2);

  // Update the cart item count
  const cartItemCountElement = document.querySelector('.shop-cart-count');
  cartItemCountElement.textContent = `Items: ${cartItemCount}`;

  // Update the total price
  const cartTotalPriceElement = document.querySelector('.shop-cart-total');
  cartTotalPriceElement.textContent = `Total: €${cartTotalPrice}`;
}

// Function to update the delete button visibility based on item quantity
function updateDeleteButton(item) {
  const itemCard = document.querySelector(`.shop-item[data-id="${item.id}"]`);
  const deleteButton = itemCard.querySelector('.shop-item__delete-button');

  if (window.cart[item.id] && window.cart[item.id].quantity > 0) {
    deleteButton.style.display = 'block'; // Show delete button if quantity > 0
  } else {
    deleteButton.style.display = 'none'; // Hide delete button if quantity is 0
  }
}
