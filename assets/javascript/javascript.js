$(document).ready(function() {

	//Defining variables globally for the timer
	var intervalId;
	var time =30;
	var initialtime = time;


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

	//Submit with enter key
	$(document).bind('keydown', function(e) {

        if (e.keyCode==13) {

            e.preventDefault(); 

            $("#submit").trigger("click");

        };
    });

	//Grabbing the values from the inputs and setting them to the global variables
	$("#submit").on("click", function(event){

		event.preventDefault();

		//Stores user's 
		var TrainName = $("#trainname").val().trim();
		var Destination = $("#destination").val().trim();
		var StartTime = $("#traintime").val().trim();
		var Frequency = $("#trainrate").val().trim();

		var trainData = {
			TrainName: TrainName, 
			Destination: Destination,
			FirstTrainTime: StartTime, 
			Frequency: Frequency,
			DateAdded: firebase.database.ServerValue.TIMESTAMP
		};

		if(TrainName && destination && StartTime && Frequency){

			//Pushing the user inputs to firebase
		    database.ref().push(trainData);
		};

		// Clears all of the text-boxes each time we call data from firebase
		$("#trainname").val("");
		$("#destination").val("");
		$("#traintime").val("");
		$("#trainrate").val("");
	});

	//Function to go through the children in firebase and pulling data and putting it into the HTML
	function uploaddata(){

		//The firebase call to go through the data when a child is added to our data
		database.ref().on("child_added", function(childsnapshot){

			//Grabs key from childsnapshot and sets it to variable
			var key = childsnapshot.key;

			//Store everything in variables from the "child" data
			var childtrainname = childsnapshot.val().TrainName;

			var childdestination = childsnapshot.val().Destination;

			var ChildStartTime = childsnapshot.val().FirstTrainTime;

			var ChildFrequency = parseInt(childsnapshot.val().Frequency);

			//Converting StartTime of the train to the format 'hh:mm'
			var firstTimeConverted = moment(ChildStartTime, "hh:mm");

			//Finding the difference between the First Time when the Train leaves to the current time of the user
			var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

			//Finding the remainder of the difference
			var Remainder = diffTime % ChildFrequency;

			//Find the difference again between Frequency and Remainder and setting it to a variable
			var MinutesTillTrain = ChildFrequency - Remainder;

			//Adding the current time of the users with the 'MinutesTillTrain' and making sure it is in minutes
			var nextTrain = moment().add(MinutesTillTrain, "minutes");

			//Converting the variable 'nextTrain' time to the format 'hh:mm a'
			var nextTrainconverted = moment(nextTrain).format("hh:mm a");

			//Uploading the results to the HTML page
			$("#traintable > tbody").append("<tr><td>" + childtrainname + "</td><td>" + childdestination + "</td><td>" + ChildFrequency + "</td><td>" 
			+ nextTrainconverted + "</td><td>" + MinutesTillTrain + "<button class='btn glyphicon glyphicon-trash delete' data-name='" + key + "' style='float: right'>" + "</button>" +  "</td></tr>");
			
		});
	}

		// Click function to delete that current row of values in the table
		$(document).on("click", ".delete", function() {
			
			//Grabs the specific key and sets it to a variable
			var key = $(this).attr("data-name");

			//Calls firebase and removes this specific child with this key
			database.ref().child(key).remove();

			//We clear the display div
			$("#display").html("")

			//Then we call the 'uploaddata' function to update the table
			uploaddata();
			
		});

	//We are counting by 1000 mili second and calling the "count" function each time
	function start() {
	  	intervalId = setInterval(count, 1000);
	};

	//This function holds the decrementer for time
	function count() {

		//Decrements by 1
		time--;

			//When time equals 0, it gets rid of the previous data calls the "uploaddata" function to go through the children values in firebase
			if(time === 0){

				$("#display").html("");
				
		  		uploaddata();

		  		//We reset the time to the initaltime which is 60
		  		time = initialtime;
	  		};
	};

//Calls "start" function to start the timer
start();

//At first load of page, calls the function "uploaddata" to go through all the "child" values in firebase and grab the data and print them onto the html
uploaddata();

});