/* === Imports === */
import { initializeApp } from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth"


/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyChTRTrtyLa_cyCnR6hsS4cP5UpbHoM4gs",
    authDomain: "moody-scrim.firebaseapp.com",
    projectId: "moody-scrim",
    storageBucket: "moody-scrim.firebasestorage.app",
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const signOutButtonEl = document.getElementById("sign-out-btn")

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

signOutButtonEl.addEventListener("click", authSignOut)

/* === Main Code === */

/*  Challenge:
    Import the onAuthStateChanged function from 'firebase/auth'

    Use the code from the documentaion to make this work.
    
    Use onAuthStateChanged to:
    
    Show the logged in view when the user is logged in using showLoggedInView()
    
    Show the logged out view when the user is logged out using showLoggedOutView()
*/

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
    } else {
        showLoggedOutView()
    }
})


/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    /*  Challenge:
           Import the signInWithEmailAndPassword function from 'firebase/auth'
   
           Use the code from the documentaion to make this function work.
           
           Make sure to first create two consts, 'email' and 'password', to fetch the values from the input fields emailInputEl and passwordInputEl.
          
           If the login is successful then you should show the logged in view using showLoggedInView()
           If something went wrong, then you should log the error message using console.error.
       */
    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user
            clearAuthFields()
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.error(errorMessage)
        })
}

function authCreateAccountWithEmail() {
    /*  Challenge:
      Import the createUserWithEmailAndPassword function from 'firebase/auth'

      Use the code from the documentaion to make this function work.
      
      Make sure to first create two consts, 'email' and 'password', to fetch the values from the input fields emailInputEl and passwordInputEl.
     
      If the creation of user is successful then you should show the logged in view using 
      If something went wrong, then you should log the error message using console.error.
  */
    const email = emailInputEl.value
    const password = passwordInputEl.value

    // const auth = getAuth() // removed because we already have it from the top

    createUserWithEmailAndPassword(auth, email, password) // function that returns a promise
        .then((userCredential) => {
            // User created successfully
            const user = userCredential.user
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message) // Log the error
        })
}

function authSignOut() {
    signOut(auth)
        .then(() => {
            clearAuthFields()
        })
        .catch((error) => {
            console.error(error.message)
        })
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}

function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showView(view) {
    view.style.display = "flex"
}

function hideView(view) {
    view.style.display = "none"
}

function clearInputField(field) {
    field.value = ""
}

function clearAuthFields() {
    clearInputField(emailInputEl)
    clearInputField(passwordInputEl)
}