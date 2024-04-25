let userInfo= document.querySelector("#user_info")
let UserId=document.querySelector("#user")
let links= document.querySelector("#links")

if (localStorage.getItem("username")){
    links.remove()
    userInfo.style.display="flex"
    UserId.innerHTML=localStorage.getItem("username")
}

let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function(){
    localStorage.clear();
    setTimeout(()=>{
        window.location="login.html";
    }, 1000)
}) 