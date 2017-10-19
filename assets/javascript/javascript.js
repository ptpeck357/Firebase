var config = {
    apiKey: "AIzaSyD3rIedSTLHdZqgZMnXE9rEPdhw2ES22hA",
    authDomain: "fir-homework-6bd3e.firebaseapp.com",
    databaseURL: "https://fir-homework-6bd3e.firebaseio.com",
    projectId: "fir-homework-6bd3e",
    storageBucket: "",
    messagingSenderId: "293732960351"
  };

firebase.initializeApp(config);

var database = firebase.database();

database.ref().on("value", function(snapshot) {
	console.log(snapshot.val())
}