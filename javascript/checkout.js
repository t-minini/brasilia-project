// checkout.js

document.addEventListener('DOMContentLoaded', function () {
    const checkoutBtn = document.querySelector('.shop-checkout-btn'); // Checkout button
    const checkoutModal = document.getElementById('checkout-modal'); // Checkout modal
    const congratulationModal = document.getElementById('congratulation-modal'); // Congratulation modal
    const closeCheckout = document.getElementById('close-checkout'); // Close button for Checkout modal
    const closeCongratulation = document.getElementById('close-congratulation'); // Close button for Congratulation modal
    const placeOrderBtn = document.querySelector('.place-order-btn'); // Place order button
    const purchaseTotalElement = document.getElementById('purchase-total'); // Element to display total price
  
    // Simulate purchase total (replace with actual value from your cart logic)
    let purchaseTotal = 99.99; // Replace this with your actual cart total
  
    // Function to update the purchase total
    function updatePurchaseTotal() {
      purchaseTotalElement.textContent = `€${purchaseTotal.toFixed(2)}`; // Display the total in the modal
    }
  
    // Show checkout modal when Checkout button is clicked
    checkoutBtn.addEventListener('click', function () {
      updatePurchaseTotal(); // Update the total amount
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
  
    // Handle Place Order button click
    placeOrderBtn.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent form submission or default action
  
      checkoutModal.style.display = 'none'; // Close the Checkout modal
      congratulationModal.style.display = 'block'; // Show the Congratulation modal
    });
  });
  