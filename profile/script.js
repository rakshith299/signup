let nameEle = document.getElementById("name");
let emaileEle = document.getElementById("email");
let passwordEle = document.getElementById("password");
let tokenEle = document.getElementById("token");
let BtnEle = document.getElementById("btn");

// check if user has token or not 

window.onload = function (){
    let receivedUserArr = JSON.parse(sessionStorage.getItem("loggedInUser"));

    if(receivedUserArr){
        nameEle.innerText = receivedUserArr.name;
        emaileEle.innerText = receivedUserArr.email;
        passwordEle.innerText = receivedUserArr.password;
        tokenEle.innerText = receivedUserArr.token;
    }else{
        alert("Please sign up, to visit the page")
        window.location.href = "../index.html";
    }

}


// on logout 

BtnEle.addEventListener("click", function(){
    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "../index.html";
})