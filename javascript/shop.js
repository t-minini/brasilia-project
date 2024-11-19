document.addEventListener('DOMContentLoaded', function () {
  fetch('./shop-items.json')
    .then((response) => response.json())
    .then((items) => {
      const itemsContainer = document.querySelector('.shop-items__container');

      items.forEach((item) => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('shop-item');

        itemCard.innerHTML = `
            <img class="shop-item__image" src="${item.img}" alt="${item.item}" />
            <p class="shop-item__title">${item.item}</p>
            <p class="shop-item__price">${item.price}</p>
            <div class="shop-item__buttons">
              <select class="shop-item__select" name="item-quantity" id="item-quantity-${item.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <button class="shop-item__button" data-id="${item.id}">Add to Cart</button>
            </div>
          `;

        itemsContainer.appendChild(itemCard);
      });
    })
    .catch((error) => {
      console.error('Error loading items data:', error);
    });
});
