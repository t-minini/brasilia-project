document.addEventListener('DOMContentLoaded', function () {
  fetch('./shop-items.json')
    .then((response) => response.json())
    .then((items) => {
      const itemsContainer = document.querySelector('.shop-items__container');

      items.forEach((item) => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('shop-item');
        itemCard.setAttribute('data-id', item.id);

        itemCard.innerHTML = `
          <img class="shop-item__image" src="${item.img}" alt="${item.item}" />
          <p class="shop-item__title">${item.item}</p>
          <p class="shop-item__price">€${item.price}</p>
          <div class="shop-item__buttons">
            <button class="shop-item__button" data-id="${item.id}">Add to Cart</button>
            <button class="shop-item__delete-button--inactive" title="Add an item to cart"><img src="./assets/icons/delete-icon-one.svg" alt=""></button>
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

        addButton.addEventListener('click', function () {
          addToCart(item);
        });

        activeDeleteButton.addEventListener('click', function () {
          removeFromCart(item);
        });
      });
    })
    .catch((error) => {
      console.error('Error loading items data:', error);
    });
});
