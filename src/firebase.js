import { initializeApp }
from "firebase/app"

import {
  getFirestore
}
from "firebase/firestore"

const firebaseConfig = {

  apiKey:
    "AIzaSyBELmQikOIzMb-MyVIAPO31shnX4e9gkg",

  authDomain:
    "workerapp-ed62f.firebaseapp.com",

  projectId:
    "workerapp-ed62f",

  storageBucket:
    "workerapp-ed62f.firebasestorage.app",

  messagingSenderId:
    "287542494952",

  appId:
    "1:287542494952:web:5f44942e9aca55d5362b5d",

  measurementId:
    "G-SEPNPN4YWF"
}

const app =
  initializeApp(firebaseConfig)

export const db =
  getFirestore(app)