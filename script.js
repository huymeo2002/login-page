const btnLogin = document.querySelector('#btn-login');
const invalidAlert = document.querySelector('.invalid-alert');
const unableToLogin = document.querySelector('#unable-to-login');
const emptyEmail = document.querySelector('.empty-email');
const emptyPassword = document.querySelector('.empty-password');
const loggedIn = document.querySelector('#logged-in');
const loginPage = document.querySelector('#login-page');
const signupPage = document.querySelector('#sign-up-page');
const loggedPage = document.querySelector('#logged-page');
const signupForm = document.querySelector('#sign-up-form');
const signUpSuccess = document.querySelector('#sign-up-success');


let listUser = JSON.parse(localStorage.getItem('list-user'));

function login(){
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    listUser = JSON.parse(localStorage.getItem('list-user'));
    // if (email == null || email == '' && password == null || password == ''){
    //     document.getElementById('field-unfilled').classList.remove('hidden');
    //     // window.location.reload();
    // } else {
    //     document.getElementById('field-unfilled').classList.add('hidden');
    // }
    if (!isEmptyEmail(email) && !isEmptyPassword(password)){
        if (emailValidated(email)) {
            for(let i = 0; i < listUser.length; i++){
                if (email == listUser[i].email && password == listUser[i].password){
                    loggedIn.innerHTML = `<h1>Welcome</h1></h1><p>You logged in as ${email}</p>`;
                    loggedPage.classList.remove('hidden');
                    loginPage.classList.add('hidden');
                    unableToLogin.classList.add('hidden');
                } else {
                    unableToLogin.classList.remove('hidden');
                }
            }
        } else {
            invalidAlert.classList.remove('hidden');
        }
    }
}


function logOut(){
    window.location.reload();
}

function signUpPage(){
    signupPage.classList.remove('hidden');
    loginPage.classList.add('hidden');
}

function signUp(){
    let email = document.getElementById('sign-up-email').value; 
    let password = document.getElementById('sign-up-password').value;
    listUser = localStorage.getItem('list-user') ? JSON.parse(localStorage.getItem('list-user')) : [];
    if(!isEmptyEmail(email) && !isEmptyPassword(password)){
        if(emailValidated(email)){
            if(!existedEmail(email)){
                listUser.push({
                    email: email,
                    password: password
                });
                localStorage.setItem('list-user', JSON.stringify(listUser));
                signUpSuccess.innerHTML = `<p>You have signed up successfully as ${email}</p>`;
            }
        }
    }
    
}

function existedEmail(email){
    for(let i = 0; i < listUser.length; i++){
        if(email === listUser[i].email){
            document.getElementById('already-existed').classList.remove('hidden');
            return true;
        }
    }
    document.getElementById('already-existed').classList.add('hidden');
    return false;
}

function isEmptyEmail(email) {
    if(email == '' || email == null){
        emptyEmail.classList.remove('hidden');
        return true;
    } else {
        emptyEmail.classList.add('hidden');
        return false;
    }
}

function isEmptyPassword(password) {
    if(password == '' || password == null){
        emptyPassword.classList.remove('hidden');
        return true;
    } else {
        emptyPassword.classList.add('hidden');
        return false;
    }
}

function emailValidated(email){
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        invalidAlert.classList.add('hidden');
        return true;
    } else {
        invalidAlert.classList.remove('hidden');
        return false;
    }
}
