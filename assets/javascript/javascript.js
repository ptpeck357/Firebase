$( document ).ready(function() {

	//Setting global variables
	var TrainName = " ";
	var Destination = " ";
	var Frequency = " ";
	var NextArrival = " ";
	var MinutesAway = 0;

	// Initialize Firebase
	var config = {
	    apiKey: "AIzaSyD3rIedSTLHdZqgZMnXE9rEPdhw2ES22hA",
	    authDomain: "fir-homework-6bd3e.firebaseapp.com",
	    databaseURL: "https://fir-homework-6bd3e.firebaseio.com",
	    projectId: "fir-homework-6bd3e",
	    storageBucket: "",
	    messagingSenderId: "293732960351"
	  };

	firebase.initializeApp(config);

	//This is how we access the data in firebase by setting it to a variable
	var database = firebase.database();

	//Going into the database and console logging ALL of the values in the database in firebase. The parameter is "snapshot"
	database.ref().on("value", function(snapshot) {
		console.log(snapshot.val())
	})

	database.ref().on("child_added", function(snapshot) {
		console.log(snapshot.val())
	})

	database.ref().on("child_removed", function(snapshot) {
		console.log(snapshot.val())
	})


	//Grabbing the values from the inputs and setting them to the global variables
	$("#submit").on("click", function() {
		TrainName = $("#trainname").val().trim();
	})


});