import * as firebase from 'firebase/app'
import 'firebase/auth'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyC0hArFUmrHVX-SpwIy-anINzeYf2KX_w8",
    authDomain: "wattshop-302003.firebaseapp.com",
    projectId: "wattshop-302003",
    storageBucket: "wattshop-302003.appspot.com",
    messagingSenderId: "325363078952",
    appId: "1:325363078952:web:feed63d84ec83fa5b0621d",
    measurementId: "G-ELVWLVMVMV"
}
firebase.initializeApp(firebaseConfig)