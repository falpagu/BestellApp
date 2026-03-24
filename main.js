let basketOpened = false;
let basket = [];

let orderType = "delivery";
let DeliveryFee = 3.99;

function init() {
  renderMenu();
  renderBasket();
  saveToLocalStorage();
}



function renderMenu() {
  let allMenuRef = document.getElementById("menu");
  let html = "";

  for (let i = 0; i < allMenu.length; i++) {
    html += getCategoryTemplate(i);

    for (let j = 0; j < allMenu[i].dishes.length; j++) {
      html += getDishTemplate(i, j);
    }
  }
  allMenuRef.innerHTML = html;
}





function openBasket() {
  basketOpened = true;

  renderBasket();
  switchBtn("delivery");
}

function closeBasketBtn() {
  document.getElementById("basket").style.display = "none";
}

function addToBasket(event, category, id) {
  openBasket();

  let dish = allMenu[category].dishes.find((d) => d.id === id);

  if (dish) {
    dish.amount++;
    if (!basket.includes(dish)) {
      basket.push(dish);
    }
    let button = event.target;
    button.innerHTML = `Added ${dish.amount}`;
    button.classList.add("addedItem");
  }

  renderBasket();
  switchBtn("delivery");
}

function updateDishAmount() {
  let numberOfDishes = basket.reduce((sum, dish) => sum + dish.amount, 0);
  document.getElementById("dishAmount").innerHTML = numberOfDishes;
}

function renderBasket() {
  let basketRef = document.getElementById("basket");

  if (!basketOpened) {
    basketRef.innerHTML = "";
    // don't do anything when basket is close
    return;
  }
  let html = `<div class="basket">
     
  <div class="basketCloseBtn">
    <img onclick="closeBasketBtn()"class="closeBasketBtn" src="./assets/icons-logos/shopping-cart.svg">
    <span id="dishAmount" class="dishAmount">0</span>
  </div>
      
  <h2>Your Basket</h2>
  
  <div class="deliveryCollection">
          <button id="delivery" onclick="switchBtn('delivery')"><img src="./assets/icons-logos/delivery-on-the-way.svg">Delivery</button>
          <button id="collection" onclick="switchBtn('collection')">🛍️Collection</button>
  </div>
  `;

  if (basket.length === 0) {
    html += `
    <div class="basketEmpty">
          <h4>Fill your basket</h4>
          <span>Your basket is empty</span>
          <img src="./assets/icons-logos/shopping-cart.png">
        </div>`;
  } else {
    html += `<div class="basketDishes">`;
    html += renderBasketItems();
    html += `</div>`;
    html += renderBasketSum();
  }
  html += `</div>`;

  basketRef.innerHTML = html;
  updateDishAmount();
}

function renderBasketItems() {
  let html = "";

  for (let i = 0; i < basket.length; i++) {
    let dish = basket[i];
    html += getBasketItemsTemplate(dish);
  }

  return html;
}

function renderBasketSum() {
  let html = "";

  let subtotal = 0;

  for (let i = 0; i < basket.length; i++) {
    subtotal += basket[i].price * basket[i].amount;
  }

  let delivery = DeliveryFee;
  let total = subtotal + delivery;

  html = getSumTemplate(subtotal, delivery, total);
  return html;
}

function switchBtn(type) {
  orderType = type;

  if (type === "delivery") {
    DeliveryFee = 3.99;
  } else {
    DeliveryFee = 0;
  }

  renderBasket();

  let delivery = document.getElementById("delivery");
  let collection = document.getElementById("collection");
  let selected = document.getElementById(type);

  if (delivery && collection && selected) {
    delivery.classList.remove("active");
    collection.classList.remove("active");
    selected.classList.add("active");
  }
}

function decrement(id) {
  let dish = basket.find((d) => d.id === id);
  if (!dish) return;
  dish.amount--;
  if (dish.amount <= 0) {
    basket = basket.filter((d) => d.id !== id);
  }
  saveToLocalStorage();
  renderBasket();
}

function increment(id) {
  let dish = basket.find((d) => d.id === id);
  if (!dish) return;

  dish.amount++;
  saveToLocalStorage();
  renderBasket();
}

function deleteDish(id) {
  basket = basket.filter((d) => d.id !== id);
  renderBasket();
}

function buyNow() {
  basketOpened = false; //Basket get closes
  renderBasket();

  let main = document.querySelector("main");
  main.innerHTML += getOrderConfirmedTemplate();

  let dialog = document.getElementById("orderConfirmContainer");
  dialog.showModal();

  setTimeout(() => {
    dialog.close();
    dialog.remove();
  }, 5000);
}

function orderConfirmCloseBtn() {
  let dialog = document.getElementById("orderConfirmContainer");
  dialog.close();
  dialog.remove();
}

function saveToLocalStorage() {
  localStorage.setItem("basket", JSON.stringify(basket));
}
function getFromLocalStorage() {
  let storedBasket = JSON.parse(localStorage.getItem("basket"));

  if (storedBasket !== null) {
    basket = storedBasket;
  }
  renderBasket();
}
