$( document ).ready(function() {

	//Setting global variables
	var TrainName = " ";
	var Destination = " ";
	var Frequency = " ";
	var FirstTrainTime = " ";

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
	// database.ref().on("value", function(snapshot) {
	// 	console.log(snapshot.val())
	// })

	//Grabbing the values from the inputs and setting them to the global variables
	$("#submit").on("click", function() {
		event.preventDefault();

		TrainName = $("#trainname").val().trim();
		Destination = $("#destination").val().trim();
		FirstTrainTime = $("#traintime").val().trim();
		Frequency = $("#trainrate").val().trim();

		//Pushing the user inputs to firebase
	    database.ref().push({
	        TrainName: TrainName, 
			Destination: Destination,
			FirstTrainTime: FirstTrainTime, 
			Frequency: Frequency
  		});

	    // Clears all of the text-boxes
		$("#trainname").val("");
		$("#destination").val("");
		$("#traintime").val("");
		$("#trainrate").val("");


	});

	database.ref().on("child_added", function(childsnapshot) {

		//Store everything in variables
		var childtrainname = childsnapshot.val().TrainName;
		var childdestination = childsnapshot.val().Destination;
		var childfirsttraintime = childsnapshot.val().FirstTrainTime;
		var childfrequency = childsnapshot.val().Frequency;

		//Uploading the results to the HTML page
		$("tbody").append("<tr><td>" + childtrainname + "</td><td>" + childdestination + "</td><td>" + childfrequency + "</td><td>" + childfirsttraintime + "</td><td>" + MinutesAway +  "</td></tr>");
	});

});