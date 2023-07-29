let nameEle = document.getElementById("name");
let emaileEle = document.getElementById("email");
let passwordEle = document.getElementById("password");
let cPasswordEle = document.getElementById("c-password");
let continueBtnEle = document.getElementById("continue-btn");
let errorMsgEle = document.getElementById("error-msg");

let formEle = document.getElementById("form");

errorMsgEle.style.display = "none";

let randomCharArr = ["a","b","c","d","%", "&","o","%","_","5","8", "9","6","2","$","z"];



//if loged in user tries to access signup

window.onload = function(){
    let receivedUserObj = sessionStorage.getItem("loggedInUser");

    if(receivedUserObj){
        window.location.href = "./profile";
    }
}

//email
nameEle.addEventListener("focus", function(event){
    errorMsgEle.style.display = "none";
})

//email
emaileEle.addEventListener("focus", function(event){
    errorMsgEle.style.display = "none";
})

//password
passwordEle.addEventListener("focus", function(event){
    errorMsgEle.style.display = "none";
})

//cpassword
cPasswordEle.addEventListener("focus", function(event){
    errorMsgEle.style.display = "none";
})


//checking for user in userArray

function checkingForUserFunc(email){
    let receivedUsersArr = JSON.parse(localStorage.getItem("users"));

    let matchesOrNot = receivedUsersArr.find((eachObj) => {
        return eachObj.email === email
    })

    if(matchesOrNot){
        return true;
    }else{
        return false;
    }
}


//save user function

function saveUserFunc(name, email,password, confirmPassword){
    
    let randomToken = "";

    for(let i = 0; i < 16; i++){
        randomToken = randomToken + randomCharArr[Math.floor(Math.random() * 16)];
    }

    let userObj = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        token:`${randomToken}`
    }

    let usersArr = JSON.parse(localStorage.getItem("users"));

    //if no users 
    if(usersArr === null){
        usersArr = []
    }

    //common
    usersArr.push(userObj)

    

    localStorage.setItem("users", JSON.stringify(usersArr));

    sessionStorage.setItem("loggedInUser", JSON.stringify(userObj));

    nameEle.value = "";
    emaileEle.value = "";
    passwordEle.value = "";
    cPasswordEle.value = "";

    alert("Sign up SuccessFull")

    window.location.href = "./profile";

}

// form
formEle.addEventListener("submit", function(event){
    event.preventDefault();
    let enteredName = nameEle.value.trim();
    let enteredEmail = emaileEle.value.trim();
    let enteredPassword = passwordEle.value.trim();
    let enteredConfirmPass = cPasswordEle.value.trim();
    
    let allEnteredFlag = false;
    let passwordCheckFlag = false;
    let emailCheckFlag = false;

    if(nameEle.value.trim() === "" || emaileEle.value.trim() === "" || passwordEle.value.trim() === "" || cPasswordEle.value.trim() === ""){
        errorMsgEle.style.display = "block";
    }else{
        allEnteredFlag = true;
    }

    // checking email

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    emailCheckFlag = regex.test(enteredEmail);

    if(emailCheckFlag === false){
        alert("Please enter valid Email")
        emaileEle.value = "";
    }


    // check password 

    let passwordregex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let passCheck = passwordregex.test(enteredPassword);

    if(passCheck === false){
        alert("Password shold be of 8 characters, that includes one letter and one number");
        passwordEle.value = "";
        cPasswordEle.value = "";
    }



    //password and c-password check


    if(enteredPassword !== enteredConfirmPass){
        alert("Password and Confirm password are not matching!")

        passwordEle.value = "";
        cPasswordEle.value = "";
    }else{
        passwordCheckFlag = true;
    }


    // check if my user already exist and if not add user

    if(allEnteredFlag === true && passwordCheckFlag === true && emailCheckFlag === true && passCheck === true){
        let receivedUsers = localStorage.getItem("users");

        // no users in usersArray
        if(receivedUsers === null){
            saveUserFunc(enteredName, enteredEmail, enteredPassword, enteredConfirmPass)
        }else if(receivedUsers !== null){
            // check if user is there in userArray
            
            let UserExist = checkingForUserFunc(enteredEmail)

            if(UserExist === true){
                alert("Entered email already exist, Please enter another!")
                emaileEle.value = "";
                passwordEle.value = "";
                cPasswordEle.value = "";

            }else if(UserExist === false){
                saveUserFunc(enteredName, enteredEmail, enteredPassword, enteredConfirmPass)
            }
        }
    }

})