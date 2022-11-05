if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  // Control of the input value.
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  // Limit the number od quantuty value.
  function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateCartTotal();
  }

  // Add items to the shopping cart.
  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    // NOTE: Here we need to put the 'dishName' element.
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    // NOTE: Here we need to put the 'dishPrice' element.
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    // NOTE: Here we need to put the 'dishImg' element.
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
  }

  // Create the cart row for items added, Name, Price and Image of the element.
  function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
        alert("This item is already added to the cart");
        return;
      }
    }
    var cartRowContents = `
          <div class="cart-item cart-column">
              <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
              <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1">
              <button class="btn btn-danger" type="button">REMOVE</button>
          </div>`;
    cartRow.innerHTML = cartRowContents;
    // Making the remover cart button and quantity get reloaded everytime theres a change.
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChanged);
  }

  //   Adding the fx for the Purchase button, and setting an Alert for any purchase made.
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

// Remove Button Fx.
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

// Update Cart Fx thas needs to be used for every row created.
function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }

  //   Round the Total.
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}

// // document.addEventListener('click' , (event)=> {
// //     if (event.target && event.target.className.includes('addToCart'))  {
// //         addToCartClicked(event);
// //     }
// // });

// const addToShoppingCartButtons = document.querySelectorAll(".addToCart");
// addToShoppingCartButtons.forEach((addtoCartButton) => {
//   addCartButtons.addEventListener("click", () => addToCartClicked);
// });

// const purchaseButton = document.querySelector(".purchaseButton");
// purchaseButton.addEventListener("click", purchaseButtonClicked);

// const shoppingCartItemsContainer = document.querySelector(
//   ".shoppingCartItemsContainer"
// );

// function addToCartClicked(event) {
//   const button = event.target;
//   const dish = button.closest(".dish");

//   const dishName = dish.querySelector(".dish-name").textContent;
//   const dishPrice = dish.querySelector(".dish-price").textContent;
//   const dishImage = dish.querySelector(".dish-image").src;

//   addItemToShoppingCart(dishName, dishPrice, dishImage);
// }

// function addItemToShoppingCart(dishName, dishPrice, dishImg) {
//   const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
//     "shoppingCartDishName"
//   );

//   for (let i = 0; i < elementsTitle.length; i++) {
//     if (elementsTitle[i].innerText === itemTitle) {
//       let elementQuantity = elementsTitle[
//         i
//       ].parentElement.parentElement.parentElement.querySelector(
//         ".shoppingCartItemQuantity"
//       );
//       elementQuantity.value++;
//       $(".toast").toast("show");
//       updateShoppingCartTotal();
//       return;
//     }
//   }

//   const shoppingCartRow = document.createElement("div");
//   const shoppingCartItemsContent = `
//     <div class="cart-items">
//     <div class="cart-row">
//       <div class="cart-item cart-column">
//         <img class="cart-item-img" src=${dishImg} width="100" height="100">
//         <span class="cart-item-title">${dishName}</span>
//       </div>
//       <span class="cart-price cart-column">${dishPrice}</span>
//       <div class="cart-quantity cart-column">
//         <input class="cart-quantity-input" type="number" value="1">
//         <button class="btn btn-danger" role="button">REMOVE</button>
//       </div>
//     </div>`;
//   shoppingCartRow.innerHTML = shoppingCartContent;
//   shoppingCartItemsContainer.append(shoppingCartRow);

//   shoppingCartRow
//     .querySelector(".buttonDelete")
//     .addEventListener("click", removeShoppingCartItem);

//   shoppingCartRow
//     .querySelector(".shoppingCartItemQuantity")
//     .addEventListener("change", quantityChanged);

//   updateShoppingCartTotal();
// }

// function updateShoppingCartTotal() {
//   let total = 0;
//   const shoppingCartTotal = document.querySelector(".shoppingCartTotal");
//   const shoppingCartItems = document.querySelectorAll(".shoppingCartItems");
//   shoppingCartItems.forEach((shoppingCartItem) => {
//     const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
//       ".shoppingCartItemPrice"
//     );
//     const shoppingCartItemPrice = Number(
//       shoppingCartItemPriceElement.textContent.replace("$", "")
//     );
//     const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
//       ".shoppingCartItemQuantity"
//     );
//     const shoppingCartItemQuantity = Number(
//       shoppingCartItemQuantityElement.value
//     );

//     total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
//   });

//   shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
// }

// function removeShoppingCartItem(event) {
//   const buttonClicked = event.target;
//   buttonClicked.closest("shoppingCartItem").remove();
//   updateShoppingCartTotal();
// }

// function quantityChanged(event) {
//   const input = event.target;
//   // if (input.value <= 0) {
//   //     input.value = 1;
//   // }
//   input.value <= 0 ? (input.value = 1) : null;
//   updateShoppingCartTotal();
// }

// function purchaseButtonClicked() {
//   shoppingCartItemsContainer.innerHTML = "";
//   updateShoppingCartTotal();
// }
