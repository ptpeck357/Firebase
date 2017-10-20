$(document).ready(function() {

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

		var TrainName = $("#trainname").val().trim();
		var Destination = $("#destination").val().trim();
		var StartTime = $("#traintime").val().trim();
		var Frequency = $("#trainrate").val().trim();


		//Pushing the user inputs to firebase
	    database.ref().push({
	        TrainName: TrainName, 
			Destination: Destination,
			FirstTrainTime: StartTime, 
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
		StartTime = childsnapshot.val().FirstTrainTime;
		console.log(StartTime)
		Frequency = parseInt(childsnapshot.val().Frequency);

		var firstTimeConverted = moment(StartTime, "hh:mm").subtract(1, "years");

		//Current Time of the user
		var currentTime = moment().format("hh:mm a");
		console.log(currentTime);

		// //Working with time
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log(diffTime);

		var Remainder = diffTime % Frequency;
		console.log(Remainder);

		var MinutesTillTrain = Frequency - Remainder;

		var nextTrain = moment().add(MinutesTillTrain, "minutes");

		var nextTrainconverted = moment(nextTrain).format("hh:mm a");

		//Uploading the results to the HTML page
		$("tbody").append("<tr><td>" + childtrainname + "</td><td>" + childdestination + "</td><td>" + Frequency + "</td><td>" + nextTrainconverted + "</td><td>" + MinutesTillTrain + "</td></tr>");
		
	});

});