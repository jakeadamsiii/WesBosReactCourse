import Rebase from 're-base'; //firebase specific package
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyDDa4PCh5lV8K2vbvxy2NwJDLoxys3NvCo",
        authDomain: "catch-of-the-day-jake-adams.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-jake-adams.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp}; 

export default base; 