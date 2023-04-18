// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from 'react'

export default function FirebaseHelper() {
    const firebaseConfig = {
        apiKey: "AIzaSyBoEh5J_vz5eahaQqUCguQItMCfGPQUJHE",
        authDomain: "whatsappclone-74656.firebaseapp.com",
        projectId: "whatsappclone-74656",
        storageBucket: "whatsappclone-74656.appspot.com",
        messagingSenderId: "1038538877595",
        appId: "1:1038538877595:web:cb5c2e2dd0e6e29023743e",
        measurementId: "G-9X9J8F7JJ2"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      // const analytics = getAnalytics(app);

      return app
}
