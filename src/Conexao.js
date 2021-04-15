import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyD7Bywcq_qZ3bffTC3uJHqS8BedAEw-eVc",
    authDomain: "projeto-teste-b1856.firebaseapp.com",
    databaseURL: "https://projeto-teste-b1856.firebaseio.com",
    projectId: "projeto-teste-b1856",
    storageBucket: "projeto-teste-b1856.appspot.com",
    messagingSenderId: "86821099243",
    appId: "1:86821099243:web:d57d98ca72c05ef43150ae"
};

firebase.initializeApp(config);

export default firebase;