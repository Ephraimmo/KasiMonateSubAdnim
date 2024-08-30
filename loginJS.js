
  // Import the functions you need from the SDKs you need
  import {initializeApp} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
// ...
apiKey: "AIzaSyDibpkuzUookkbMVIoHqe_rYu1umY1qF-4",
authDomain: "data-b93ed.firebaseapp.com",
databaseURL: "https://data-b93ed-default-rtdb.firebaseio.com",
projectId: "data-b93ed",
storageBucket: "data-b93ed.appspot.com",
messagingSenderId: "218236841715",
appId: "1:218236841715:web:e96bfd3174b08438701186"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

import {getAuth, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged,signOut,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";

import {getDatabase, set,get, ref , child, update}                                                                            from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
import {getStorage,ref as sRef,uploadBytesResumable,getDownloadURL, deleteObject }                                                          from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";
import { getFirestore, doc, getDoc, getDocs , setDoc ,collection , onSnapshot , addDoc, updateDoc, deleteDoc , deleteField  } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const db     = getFirestore();
const auth   = getAuth();
const realdb = getDatabase();


var SignIn   = document.getElementById('Sign In');
var Username = document.getElementById('Username');
var Password = document.getElementById('Password');
var submit   = document.getElementById('submit');
var loginform = document.getElementById('loginform');
var toastshowLoadingToast = document.getElementById("showLoadingToast");


SignIn.onclick = function(){
  if (Username.value == '' || Password.value == '')
  {
    submit.click();
    return;
  }
  //SignIn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
  Login(Username.value, Password.value);
  showLoadingToast();
}

async function Login(email, password)
    {
      getUserDetails(email,password);
      
    }

    function showPopup() {
      var popup = document.getElementById('popup');
      popup.style.display = 'flex';
    }

    function closePopup() {
  var popup = document.getElementById('popup');
   popup.style.display = 'none';
}

  async function getUserDetails(Username,password){
    var found = false;
    var activate = false;
    const citiesRef = await collection(db, "UsersSubAdnim");

    const querySnapshot = await getDocs(citiesRef);
      querySnapshot.forEach((doc) => {
      
      if (Username == doc.data().Username && doc.data().Password == password && doc.data().Adnim != false)
      {
        sessionStorage.setItem("Username", doc.data().Username);
        sessionStorage.setItem("UserPhoto", doc.data().ProfileImage);
        sessionStorage.setItem("Position", doc.data().Position);
        sessionStorage.setItem("CompanyName", doc.data().SubStore);
        window.location.replace("mainIndex.html");
        found = true;
       
      }else if (Username == doc.data().Username && doc.data().Password == password && doc.data().Adnim == false)
      {
        found = true;
        showToast("fas fa-exclamation-triangle",'Please contact your administrator to activate your user');
        toastshowLoadingToast.classList.remove("show");
      }
    });

    if (!found)
    {
      showToast("fas fa-exclamation-triangle",'No User was found');
      toastshowLoadingToast.classList.remove("show");
    }
  }

  function showToast(icon,message) {
        var toast = document.getElementById("toast");
        toast.innerHTML = '<p><i class= "' + icon + '"></i></p><p>' + message + '</p>';
        toast.classList.add("show");
        setTimeout(function() {
            toast.classList.remove("show");
        }, 10000);
    }


    
    function showLoadingToast() {
            var message = "Loading...";
            toastshowLoadingToast.innerHTML = '<i class="fas fa-spinner fa-spin loading"></i>' + message;
            toastshowLoadingToast.classList.add("show");
        }