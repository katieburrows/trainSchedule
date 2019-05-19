$(document).ready(function() {
    
    var firebaseConfig = {
        apiKey: "AIzaSyAB8eJ6wUyZZLOQ5YlaJd10HvB00fuzSnU",
        authDomain: "trainschedule-2485c.firebaseapp.com",
        databaseURL: "https://trainschedule-2485c.firebaseio.com",
        projectId: "trainschedule-2485c",
        storageBucket: "trainschedule-2485c.appspot.com",
        messagingSenderId: "831721997299",
        appId: "1:831721997299:web:56fb34f17e7c8993"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

  $(".btn").on("click", function(event){
      event.preventDefault();
      
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var frequency = $("#frequency").val().trim();

      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#frequency").val("");

      database.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      });

  });

  database.ref().on("child_added", function(snapshot){
    var sv = snapshot.val();
    var trainName = sv.trainName;
    var destination = sv.destination;
    var firstTrain = sv.firstTrain;
    var frequency = sv.frequency;

    //pushed back train time to ensure time would be captured properly.
    var firstTrainOneYearAgo = moment(firstTrain, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = currentTime.diff(moment(firstTrainOneYearAgo), "minutes");

    var remainder = diffTime % frequency;

    var minutesAway = frequency - remainder;

    var nextArrival = currentTime.add(minutesAway, "minutes");

    nextArrival = moment(nextArrival).format("hh:mm");

    $("#trains > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

  }, function (errorObject){
      console.log("Errors handled: " + errorObject);
  });




}) 

//moment.js to :
    //calculate next arrival
        //use next arrival to calculate minutes until next arrival