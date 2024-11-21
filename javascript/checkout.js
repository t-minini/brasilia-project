document.addEventListener('DOMContentLoaded', function () {
  const checkoutBtn = document.querySelector('.shop-checkout-btn'); // Checkout button
  const checkoutModal = document.getElementById('checkout-modal'); // Checkout modal
  const congratulationModal = document.getElementById('congratulation-modal'); // Congratulation modal
  const closeCheckout = document.getElementById('close-checkout'); // Close button for Checkout modal
  const closeCongratulation = document.getElementById('close-congratulation'); // Close button for Congratulation modal
  const placeOrderBtn = document.querySelector('.place-order-btn'); // Place order button
  const purchaseTotalElement = document.getElementById('purchase-total'); // Element to display total price
  const checkoutForm = document.querySelector('.form-container'); // The form containing input fields

  // Function to update the purchase total
  function updatePurchaseTotal() {
    const cartTotalPrice = Object.values(window.cart)
      .reduce(
        (total, cartItem) =>
          total +
          parseFloat(cartItem.item.price.replace('$', '').trim()) * cartItem.quantity,
        0
      )
      .toFixed(2); // Round to 2 decimal places

    purchaseTotalElement.textContent = `€${cartTotalPrice}`;
  }

  // Show checkout modal when Checkout button is clicked
  checkoutBtn.addEventListener('click', function () {
    updatePurchaseTotal(); // Update the total amount dynamically
    checkoutModal.style.display = 'block'; // Show the Checkout modal
  });

  // Close the checkout modal when the close button is clicked
  closeCheckout.addEventListener('click', function () {
    checkoutModal.style.display = 'none'; // Hide the Checkout modal
  });

  // Close the congratulation modal when the close button is clicked
  closeCongratulation.addEventListener('click', function () {
    congratulationModal.style.display = 'none'; // Hide the Congratulation modal
  });

  // Form validation logic to enable/disable Place Order button
  placeOrderBtn.disabled = true; // Disable button initially

  // Event listener to check the form validity as the user types
  checkoutForm.addEventListener('input', function () {
    // Check if all required fields are valid
    const isValid = checkoutForm.checkValidity();

    // Enable the button if the form is valid, disable otherwise
    placeOrderBtn.disabled = !isValid;
  });

  // Optional: prevent form submission if invalid and show an alert
  checkoutForm.addEventListener('submit', function (event) {
    if (!checkoutForm.checkValidity()) {
      event.preventDefault(); // Prevent form submission if invalid
      alert("Please fill in all fields correctly!"); // Show a message to the user
    } else {
      alert("Form submitted successfully!"); // Replace with actual form submission logic
    }
  });

  // Handle Place Order button click
  placeOrderBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission or default action

    if (checkoutForm.checkValidity()) {
      checkoutModal.style.display = 'none'; // Close the Checkout modal
      congratulationModal.style.display = 'block'; // Show the Congratulation modal
    } else {
      alert("Please fill in all fields correctly!"); // Optional: Show alert if form is not valid
    }
  });
});

function formatCardNumber(input) {
  // Remove all non-numeric characters
  let cardNumber = input.value.replace(/\D/g, '');

  // Add a dash every 4 digits
  cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');

  // Set the formatted value back to the input field
  input.value = cardNumber;
}

function formatExpirationDate(input) {
  let expirationDate = input.value.replace(/\D/g, ''); // Remove non-numeric characters

  // Add a slash after the first two digits (MM/YY)
  if (expirationDate.length >= 2) {
    expirationDate = expirationDate.substring(0, 2) + '/' + expirationDate.substring(2, 4);
  }

  // Update the input value with the formatted expiration date
  input.value = expirationDate;
}
