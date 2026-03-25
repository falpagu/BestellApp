
function getCategoryTemplate(i) {
let category = allMenu[i];

  let text = category.category.replace(
    /\(.*?\)/,
    '<span class="size">$&</span>'
  );

return `
      <div class="categoryContainer">
        <div class="category wrapper">   
          <img src="${category.icon}" alt="category icons" >
          <h2>${text}</h2>
        </div> 
      </div>   
`;   

}

function getDishTemplate(i, j) {
let dish = allMenu[i].dishes[j]



return `
<div class="wrapper">
    <div class="dishCard">
        <div onclick="openBasket()"><img src="${dish.img}" alt="dish pic" ></div>
      <div class="dishCardContent">
            <div class="dishName">
                <span onclick="openBasket()">${dish.name}</span>
                <p>${dish.ingredients}</p> 
            </div>

            <div class="priceAdd" >
                <span>${dish.price}€</span>
                <button id="addButton" onclick="addToBasket(event, ${i}, ${dish.id})">Add to basket</button> 
            </div>   
      </div>  
      
     </div> 
        
    </div>
       
`;   

}

function getBasketItemsTemplate(dish) {

  if (!dish) return ''

  let minusIcon = dish.amount === 1

  ? `<img onclick="decrement(${dish.id})" src="./assets/icons-logos/delete-icon.svg" alt="delete icon" >`
  :`<span onclick="decrement(${dish.id})" class="dash">➖</span>
  `;
  
  let deleteIcon = dish.amount > 1
  ? `<button onclick="deleteDish(${dish.id})">
  <img src="./assets/icons-logos/delete-icon.svg"></button>`
  : '';

  return `
    <div>
              <div class="basketBox">
              <div class="nameDeleteBtn">
                <div>${dish.name}</div>
                ${deleteIcon}
              </div>   

                <div class="basketAmountPreis">

                  <div class="deleteAdd">
                  ${minusIcon}
                   <span class="amount">${dish.amount}</span>
                   <span onclick="increment(${dish.id})" class="plus">➕</span>

                  </div>
                  <div>${(dish.price * dish.amount).toFixed(2)}€</div>
                </div>

              </div>
    </div>

    `;
}

function getSumTemplate(subtotal, delivery, total){

  return `
             <div class="sumContainer">
              <div class="sum">
                <p class="priceLine"><span>Subtotal:</span><span>${subtotal.toFixed(2)}€</span></p>
                <p class="priceLine">
                  <span>Delivery fee:</span><span>${delivery}€</span>
                </p>
                <div class="separator"></div>
                <p class="priceLine"><span>Total:</span><span>${total.toFixed(2)}€</span></p>
              </div>
              <button class="buyNow"  onclick="buyNow()">Buy now (${total.toFixed(2)}€)</button>
            </div>
  `;
}

function getOrderConfirmedTemplate(){

  return `
          <dialog id="orderConfirmContainer" class="orderConfirmContainer">
            <button id="orderConfirmCloseBtn" class="orderConfirmCloseBtn" onclick="orderConfirmCloseBtn()">&times;</button> 
              <div class="orderConfirm">
                <img src="./assets/icons-logos/delivery-on-the-way.svg">
                <p>Order confirmed!</p>
                <span>Your food is on the way!</span>
            </div>
          </dialog>

  `;
}

    

