document.addEventListener('DOMContentLoaded', function () {
  fetch('./shop-items.json')
    .then((response) => response.json())
    .then((items) => {
      const itemsContainer = document.querySelector('.shop-items__container');

      // Create a map to track the quantity of each item in the cart
      const cart = {};

      items.forEach((item) => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('shop-item');
        itemCard.setAttribute('data-id', item.id); // Set item ID for reference

        itemCard.innerHTML = `
          <img class="shop-item__image" src="${item.img}" alt="${item.item}" />
          <p class="shop-item__title">${item.item}</p>
          <p class="shop-item__price">${item.price}</p>
          <div class="shop-item__buttons">
            <button class="shop-item__button" data-id="${item.id}">Add to Cart</button>
            <button class="shop-item__delete-button--inactive" title="Can't remove from cart"><img src="./assets/icons/delete-icon-one.svg" alt=""></button>
            <button class="shop-item__delete-button" style="display: none;" title="Remove an item from cart"><img src="./assets/icons/delete-icon-two.svg" alt=""></button>
          </div>
        `;

        itemsContainer.appendChild(itemCard);

        const addButton = itemCard.querySelector('.shop-item__button');
        const inactiveDeleteButton = itemCard.querySelector(
          '.shop-item__delete-button--inactive'
        );
        const activeDeleteButton = itemCard.querySelector(
          '.shop-item__delete-button'
        );

        // Initialize the cart object for each item
        cart[item.id] = 0;

        // Event listener for "Add to Cart" button
        addButton.addEventListener('click', function () {
          addToCart(item, cart); // Add item to cart
          // Hide the inactive delete button when adding an item to the cart
          inactiveDeleteButton.style.display = 'none';
          // Show the active delete button
          activeDeleteButton.style.display = 'inline-block';
        });

        // Event listener for "Delete" button
        activeDeleteButton.addEventListener('click', function () {
          removeFromCart(item, cart); // Remove 1 item from cart
          // Check if there are no more items of this type in the cart
          if (cart[item.id] === 0) {
            // Show the inactive delete button if there are no items left in the cart
            inactiveDeleteButton.style.display = 'inline-block';
            // Hide the active delete button
            activeDeleteButton.style.display = 'none';
          }
        });
      });
    })
    .catch((error) => {
      console.error('Error loading items data:', error);
    });
});

// Function to add an item to the cart
function addToCart(item, cart) {
  cart[item.id] += 1; // Increment the cart count for that item
  updateCart(); // Call to update cart display (items count, price)
}

// Function to remove an item from the cart
function removeFromCart(item, cart) {
  if (cart[item.id] > 0) {
    cart[item.id] -= 1; // Decrease the cart count for that item
  }
  updateCart(); // Call to update cart display (items count, price)
}

// Function to update the cart display (number of items and total price)
function updateCart() {
  const cartItemCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartItemCountElement = document.querySelector('.shop-cart-count');
  cartItemCountElement.textContent = `Items: ${cartItemCount}`;

  const cartTotalPriceElement = document.querySelector('.shop-cart-total');
  const cartTotalPrice = Object.keys(cart)
    .map((itemId) => {
      const item = items.find((item) => item.id === itemId);
      return parseFloat(item.price.replace('$', '').trim()) * cart[itemId];
    })
    .reduce((total, price) => total + price, 0)
    .toFixed(2);

  cartTotalPriceElement.textContent = `Total: €${cartTotalPrice}`;
}
