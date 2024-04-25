
let cartPage = document.querySelector(".cart-page")
let noItems = document.querySelector(".no-items")

// function draw items in the cart page
function drawCartItems(allitems=[]){
    
    if (JSON.parse(localStorage.getItem("ItemsInCart")).length===0){
        noItems.innerHTML="your cart is empty"
    }
  

    let items = JSON.parse(localStorage.getItem("ItemsInCart")) || allitems
    let y = items.map((item) => {
      
            return`
            <br>
            <div class="col-lg-12 menu_items">
            <div class="d-flex">
                <img class="flex-shrink-0 img-fluid rounded item_img" src="${item.imageUrl}" alt="" style="width: 100px;">
                <div class="w-100 d-flex flex-column text-start ps-4">
                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                        <span class="item_title">${item.title}</span>
                        <small class="item-actions"> 
                        <button  class="item-addbtn"  onclick="removeFromCart(${item.id})">Remove</button>
                    
                        </small>
                        <span class="text-primary item_price">${item.Price}</span>
               
                    </h5>
                    <small class="fst-italic item-details">${item.details}</small> <br>
                    <span >Quantity${item.qty}</span>

                </div>
            </div>
        </div>`
        
        })
    cartPage.innerHTML = y.join('');
}
drawCartItems()
// function remove from cart
function removeFromCart (id){
let ItemsInCart= localStorage.getItem("ItemsInCart")
    if(ItemsInCart){
        let items = JSON.parse(ItemsInCart) ;
       let filteredItems= items.filter((item)=>item.id!==id);
       localStorage.setItem("ItemsInCart", JSON.stringify(filteredItems))
       drawCartItems(filteredItems);

    }
}