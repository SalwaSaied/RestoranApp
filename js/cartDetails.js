let items = JSON.parse(localStorage.getItem("items"));
console.log(items)
let itemId = localStorage.getItem("item.id")
let itemDetailsPage = document.querySelector(".item_details")
let itemDetails = items.find((item)=>item.id== itemId);

itemDetailsPage.innerHTML=`<img src="${itemDetails.imageUrl}" alt="oreder1"/>
<h2>${itemDetails.title}</h2>
<span>price : ${itemDetails.Price}</span> <br>
<span>Qantity : ${itemDetails.qty}</span>`;
