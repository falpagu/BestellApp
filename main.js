function init() {
    renderMenu();
    renderBasket();

}

let basket = [];

function renderMenu() {
let allMenuRef = document.getElementById('menu');
let html = "";

for (let i = 0; i < allMenu.length; i++) {
    html += getCategoryTemplate(i);

    for (let j = 0; j < allMenu[i].dishes.length; j++) {

        html += getDishTemplate(i, j);
        }
    }

    allMenuRef.innerHTML = html;
}


function addToBasket(id) {
     for (let i = 0; i < allMenu.length; i++) {
    let dish = allMenu[i].dishes.find(d=> d.id === id); 
    if (!basket.includes(dish)) {
        basket.push(dish);
    }
 console.log(basket);

    }
renderBasket();
}

   
function renderBasket() {
 let basketRef = document.getElementById('basket');
    let html = "";

    for (let i = 0; i < basket.length; i++) {
        let dish = basket[i];
     html += getBasketTemplate(dish);
        
    }
    basketRef.innerHTML = html;
}
