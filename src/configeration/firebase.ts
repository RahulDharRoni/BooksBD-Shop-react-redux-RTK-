// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBPh8KSZL8Pe5gzsXd6sONGAJ_LFLbfdnc',
  authDomain: 'bookbd-redux-toolkit.firebaseapp.com',
  projectId: 'bookbd-redux-toolkit',
  storageBucket: 'bookbd-redux-toolkit.appspot.com',
  messagingSenderId: '51005524143',
  appId: '1:51005524143:web:4504cfdd7eed39c32dec5a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
