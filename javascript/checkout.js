document.addEventListener('DOMContentLoaded', function () {
  const checkoutBtn = document.querySelector('.shop-checkout-btn');
  const checkoutModal = document.getElementById('checkout-modal');
  const congratulationModal = document.getElementById('congratulation-modal');
  const closeCheckout = document.getElementById('close-checkout');
  const closeCongratulation = document.getElementById('close-congratulation');
  const placeOrderBtn = document.querySelector('.place-order-btn');
  const purchaseTotalElement = document.getElementById('purchase-total');
  const checkoutForm = document.querySelector('.form-container');

  function updatePurchaseTotal() {
    const cartTotalPrice = Object.values(window.cart)
      .reduce(
        (total, cartItem) =>
          total +
          parseFloat(cartItem.item.price.replace('$', '').trim()) *
            cartItem.quantity,
        0
      )
      .toFixed(2);

    purchaseTotalElement.textContent = `€${cartTotalPrice}`;
  }

  checkoutBtn.addEventListener('click', function () {
    updatePurchaseTotal();
    checkoutModal.style.display = 'block';
  });

  closeCheckout.addEventListener('click', function () {
    checkoutModal.style.display = 'none';
  });

  closeCongratulation.addEventListener('click', function () {
    congratulationModal.style.display = 'none';
  });

  placeOrderBtn.disabled = true;

  checkoutForm.addEventListener('input', function () {
    const isValid = checkoutForm.checkValidity();

    placeOrderBtn.disabled = !isValid;
  });

  checkoutForm.addEventListener('submit', function (event) {
    if (!checkoutForm.checkValidity()) {
      event.preventDefault();
      alert('Please fill in all fields correctly!');
    } else {
      alert('Form submitted successfully!');
    }
  });

  placeOrderBtn.addEventListener('click', function (event) {
    event.preventDefault();

    if (checkoutForm.checkValidity()) {
      checkoutModal.style.display = 'none';
      congratulationModal.style.display = 'block';
    } else {
      alert('Please fill in all fields correctly!');
    }
  });
});

function formatCardNumber(input) {
  let cardNumber = input.value.replace(/\D/g, '');

  cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');

  input.value = cardNumber;
}

function formatExpirationDate(input) {
  let expirationDate = input.value.replace(/\D/g, '');

  if (expirationDate.length >= 2) {
    expirationDate =
      expirationDate.substring(0, 2) + '/' + expirationDate.substring(2, 4);
  }

  input.value = expirationDate;
}
