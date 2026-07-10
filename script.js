let basketOpened = false;
let basket = [];

let orderType = "delivery";
let DeliveryFee = 3.99;

function init() {
  renderMenu();
  renderBasket();
}

function renderMenu() {
  let allMenuRef = document.getElementById("menu");

  let html = "";
  
  for (let i = 0; i < allMenu.length; i++) {
    html += getCategoryTemplate(i);

    for (let j = 0; j < allMenu[i].dishe.length; j++) {
      html += getDishTemplate(i, j);
    }
    allMenuRef.innerHTML = html;
  }
}

function openBasket() {
  let openBasketRef = document.getElementById("basket");
  openBasketRef.classList.add("show");
  basketOpened = true;

  renderBasket();
}

function closeBasketBtn() {
  let closeBasketRef = document.getElementById("basket");
  closeBasketRef.classList.remove("show");
  basketOpened = false;
}

function basketNavIconToggle() {
  if (!basketOpened) {
    openBasket();
    basketOpened = true;
  } else {
    closeBasketBtn();
    basketOpened = false;
  }
}

function addToBasket(event, category, id) {
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

  openBasket();
}

function updateDishAmount() {
  let numberOfDishes = basket.reduce((sum, dish) => sum + dish.amount, 0);

  let dishAmount = document.getElementById("dishAmount");
  let dishAmountNav = document.getElementById("dishAmountNav");

  if (dishAmount) {
    dishAmount.textContent = numberOfDishes;
  }

  if (dishAmountNav) {
    dishAmountNav.textContent = numberOfDishes;
  }
}

function renderBasket() {
  let basketRef = document.getElementById("basketContent");

  if (!basketOpened) {
    basketRef.innerHTML = "";
    return;
  }

  if (basket.length === 0) {
    basketRef.innerHTML = getEmptyBasketTemplate();
  } else {
    basketRef.innerHTML = getBasketTemplate();
  }
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

function switchOrderType(type) {
  orderType = type;

  if (type === "delivery") {
    DeliveryFee = 3.99;
  } else {
    DeliveryFee = 0;
  }
  renderBasket();
  switchBtn(type);
}

function switchBtn(type) {
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
  renderBasket();
}

function increment(id) {
  let dish = basket.find((d) => d.id === id);
  if (!dish) return;

  dish.amount++;
  renderBasket();
}

function deleteDish(id) {
  basket = basket.filter((d) => d.id !== id);
  renderBasket();
}

function buyNow() {
 
  basket = [];

  for (let i = 0; i < allMenu.length; i++) {
    for (let j = 0; j < allMenu[i].dishes.length; j++) {
      allMenu[i].dishes[j].amount = 0;
    }
  }
  closeBasketBtn();
  basketOpened = false;
  renderBasket();
  updateDishAmount();
  emptyBasket();
  renderMenu();
}

function emptyBasket() {
  let main = document.querySelector("main");
  main.innerHTML += getOrderConfirmedTemplate();

  let dialog = document.getElementById("orderConfirmContainer");
  dialog.showModal();

  setTimeout(() => {
    dialog.close();
    dialog.remove();
  }, 2000);
}

function orderConfirmCloseBtn() {
  let dialog = document.getElementById("orderConfirmContainer");
  dialog.close();
  dialog.remove();
}
