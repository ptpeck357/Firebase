$(document).ready(function() {

	//Setting global variables
	var TrainName = " ";
	var Destination = " ";
	var Frequency = " ";
	var FirstTrainTime = " ";

	var NextArrival = " ";
	var MinutesAway = 0;

	// Current Time
	var currentTime = moment();
	console.log( moment(currentTime).format("hh:mm"));

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

	//Grabbing the values from the inputs and setting them to the global variables
	$("#submit").on("click", function() {
		event.preventDefault();

		TrainName = $("#trainname").val().trim();
		Destination = $("#destination").val().trim();
		StartTime = $("#traintime").val().trim();
		Frequency = $("#trainrate").val().trim();

		//Working with time
		var firstTimeConverted = moment(StartTime, "hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		var currenttimeconverted = moment(currentTime).format("hh:mm");

		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		var Remainder = diffTime % Frequency;

		var MinutesTillTrain = Frequency - Remainder;

		var nextTrain = moment().add(MinutesTillTrain, "minutes");

    	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



		//Pushing the user inputs to firebase
	    database.ref().push({
	        TrainName: TrainName, 
			Destination: Destination,
			FirstTrainTime: FirstTrainTime, 
			Frequency: Frequency,
			DateAdded: firebase.database.ServerValue.TIMESTAMP
  		});

	    // Clears all of the text-boxes
		$("#trainname").val("");
		$("#destination").val("");
		$("#traintime").val("");
		$("#trainrate").val("");

	});

	database.ref().on("child_added", function(childsnapshot) {

		//Store everything in variables from the "child" data
		var childtrainname = childsnapshot.val().TrainName;
		var childdestination = childsnapshot.val().Destination;
		var childfirsttraintime = childsnapshot.val().FirstTrainTime;
		var childfrequency = childsnapshot.val().Frequency;

		//Uploading the results to the HTML page
		$("tbody").append("<tr><td>" + childtrainname + "</td><td>" + childdestination + "</td><td>" + childfrequency + "</td><td>" + NextArrival + "</td><td>" + MinutesAway +  "</td></tr>");
		
	});

});