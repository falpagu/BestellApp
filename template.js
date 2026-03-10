function getCategoryTemplate(i) {
let category = allMenu[i];

return `
    <div class="category">    
       <img src="${category.icon}">
       <h2>${category.category}</h2>
    </div>      
`;   

}


function getDishTemplate(i, j) {
let dish = allMenu[i].dishes[j]

return `
    <div class="DishCard">
        <div><img src="${dish.img}"></div>
            <div class="dishName">
                <span>${dish.name}</span>
                <p>${dish.ingredients}</p> 
        </div>

        <div class="priceAdd" >
                <span>${dish.price}€</span>
                <button onclick="addToBasket(${dish.id})">Add to basket</button> 
        </div>        
        
    </div>
       
`;   

}


function getBasketTemplate(dish) {

    return `
             <div class="basket">
            <h2>Your Basket</h2>
            <div >
              <div class="basketCard">
                <div>
                  <span>${dish.amount} x</span>
                  <span>${dish.name}</span>
                </div>

                <div class="basketContent">
                  <div class="deleteAdd">
                    <span>
                      <img class="decrement"
                        src="./assets/icons-logos/delete-icon.svg"
                        alt="delete button"
                    /></span>
                    <span class="decrement">${dish.amount}</span>
                    <span class="increment">➕</span>
                  </div>

                  <div>${dish.price * dish.amount}€</div>
                </div>
              </div>

              <div class="priceTotal">
                <p class="priceLine"><span>Subtotal</span> <span>444</span></p>
                <p class="priceLine">
                  <span>Delivey fee</span> <span>444</span>
                </p>
                <div class="separator"></div>
                <p class="priceLine"><span>Total</span><span>444</span></p>
              </div>

              <button class="buyNow">Buy now (444€)</button>
            </div>
        </div>
    `;
}