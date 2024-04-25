// define the js variables
let shoppingCartIcon= document.querySelector(".shopping-cart")
let cartItemDiv= document.querySelector(".carts_items div")
let CartItemsMenu= document.querySelector(".carts_items")
let addbtn=document.querySelector(".item-addbtn")
let badge = document.querySelector(".badge")
let items= itemsDB;

// Display Items
 
let menuItems= document.querySelector(".menu-items")
let drawItems;
(drawItems = function (items=[]){
    let y = items.map((item)=>{
        return`
        <div class="col-lg-12 menu_items">
        <div class="d-flex">
            <img class="flex-shrink-0 img-fluid rounded item_img" src="${item.imageUrl}" alt="" style="width: 100px;">
            <div class="w-100 d-flex flex-column text-start ps-4">
                <h5 class="d-flex justify-content-between border-bottom pb-2">
                    <a onclick="saveItemData(${item.id})" class="item_title" >${item.title}</a>
                    <small class="item-actions"> 
                    <i class="fas fa-heart"  id="100000"
                     style="color:${item.liked== true? "red":""}" onclick="addToFavourite(${item.id})"></i>
                    <button  class="item-addbtn"  onclick="addToCart(${item.id})">Order Now</button>
                
                    </small>
                    <span class="text-primary item_price">${item.Price}</span>
           
                </h5>
                <small class="fst-italic item-details">${item.details}</small>
              
            </div>
        </div>
    </div>`
    
    })
    menuItems.innerHTML=y.join('')
})
(JSON.parse(localStorage.getItem("items"))|| items);


// check if there is item in localstorage

let addedItem = localStorage.getItem("ItemsInCart")? JSON.parse(localStorage.getItem("ItemsInCart")):[] ;
if (addedItem){
    addedItem.map((item)=>{
       cartItemDiv.innerHTML+=`<p>${item.title}</p>`;
    });
    badge.style.display="block";
    badge.innerHTML+= addedItem.length;
}



// Add to cart Function and display the cart badage


 function addToCart(id){
     if (localStorage.getItem("username")){   
    let item= itemsDB.find((item)=>item.id === id);
    let isItemInCart= addedItem.some(i=> i.id === item.id)
if (isItemInCart){
    addedItem = addedItem.map(p=>{
        if (p.id === item.id)p.qty+=1;
        return p;
    });

}else{
    addedItem.push(item);
    
}
cartItemDiv.innerHTML="";
addedItem.forEach((item)=>{
    cartItemDiv.innerHTML+=`<p>${item.title} ${item.qty}</p>`;

})
    // save Data

    localStorage.setItem("ItemsInCart", JSON.stringify(addedItem))
    // Add counter of items
    let cartItemLenght = document.querySelectorAll(".carts_items div p")
    badge.style.display="block";
    badge.innerHTML= cartItemLenght.length;
 } else{
    window.location="login.html"
 }
 }
//  function to get unique array
function getUniqueArr(arr, filterType){
    let unique= arr
    .map((item)=>item[filterType])
    .map((item, i , final)=> final.indexOf(item)===i && i)
    .filter((item)=>arr[item])
    .map((item=>arr[item]));
    return(unique)

}
//  Open CartDiv function
shoppingCartIcon.addEventListener("click", openCartDiv)
function openCartDiv(){
    if (CartItemsMenu.innerHTML!=""){
     if (CartItemsMenu.style.display=="block"){
        CartItemsMenu.style.display="none";
     }
        else{
            CartItemsMenu.style.display="block";
        }
    }
}

// function to save item data
function saveItemData(id){
    localStorage.setItem("item.id", id)
    window.location= "cartDetails.html"
}

// search function
let input =document.getElementById("search");
input.addEventListener("keyup", function(e){
    // if(e.keyCode ===13) 
    {
      search(e.target.value, JSON.parse(localStorage.getItem("items")));
    }
    if(e.target.value.trim()===""){
        drawItems(JSON.parse(localStorage.getItem("items")));
    }

});
function search(title, myArray)
{
    let arr=myArray.filter((item)=> item.title.indexOf(title)!==-1);
   drawItems(arr)
    }
// search("Chicken Pizza", JSON.parse(localStorage.getItem("items")))



// Add to favourites

 let favouriteItems=localStorage.getItem("ItemsFavourite")? JSON.parse(localStorage.getItem("ItemsFavourite")):[] ;

 function addToFavourite(id){
     if (localStorage.getItem("username")){   
    let choosenItem= itemsDB.find((item)=>item.id === id);
    choosenItem.liked=true;
    favouriteItems= [...favouriteItems, choosenItem]
    let uniqItems=getUniqueArr(favouriteItems, "id");
    localStorage.setItem("ItemsFavourite", JSON.stringify(uniqItems))
items.map((item)=>{
    if (item.id === choosenItem.id){
        item.liked= true
    }
})
    localStorage.setItem('items', JSON.stringify(items))
    drawItems(items)
 } else{
    window.location="login.html"
 }
 }