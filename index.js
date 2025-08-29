/* === Imports === */
import { initializeApp } from "firebase/app"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
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
const provider = new GoogleAuthProvider()

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

const userProfilePictureEl = document.getElementById("user-profile-picture")
const userGreetingEl = document.getElementById("user-greeting")

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
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userGreetingEl, user)
    } else {
        showLoggedOutView()
    }
})


/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    /*  Challenge:
        Import the signInWithPopup function from 'firebase/auth'

        Use the code from the documentaion to make this function work.
       
        If the login is successful then you should console log "Signed in with Google"
        If something went wrong, then you should log the error message using console.error.
    */
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            // The signed-in user info
            const user = result.user
            console.log("Signed in with Google")
        })
        .catch((error) => {
            console.error(error.message)
        })
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

function showProfilePicture(imgElement, user) {
    /*  Challenge:
        Use the documentation to make this function work.
        
        This function has two parameters: imgElement and user
        
        We will call this function inside of onAuthStateChanged when the user is logged in.
        
        The function will be called with the following arguments:
        showProfilePicture(userProfilePictureEl, user)
        
        If the user has a profile picture URL, set the src of imgElement to that URL.
        
        Otherwise, you should set the src of imgElement to "assets/images/default-profile-picture.jpeg"
    */
    const photoURL = user.photoURL
    if (photoURL) {
        imgElement.src = photoURL
    } else {
        imgElement.src = "assets/images/default-profile-picture.jpeg"
    }
}

function showUserGreeting(element, user) {
    /*  Challenge:
        Use the documentation to make this function work.
        
        This function has two parameters: element and user
        
        We will call this function inside of onAuthStateChanged when the user is logged in.
        
        The function will be called with the following arguments:
        showUserGreeting(userGreetingEl, user)
        
        If the user has a display name, then set the textContent of element to:
        "Hey John, how are you?"
        Where John is replaced with the actual first name of the user
        
        Otherwise, set the textContent of element to:
        "Hey friend, how are you?" 
    */
    const displayName = user.displayName

    if (displayName) {
        const userFirstName = displayName.split(" ")[0]
        element.textContent = `Hey ${userFirstName}, how are you?`
    } else {
        element.textContent = "Hey friend, how are you?"
    }

}