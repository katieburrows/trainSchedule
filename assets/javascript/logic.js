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
    var trainName = $("<td>").text(sv.trainName);
    var destination = $("<td>").text(sv.destination);
    var firstTrain = $("<td>").text(sv.firstTrain);
    var frequency = $("<td>").text(sv.frequency);

    // var newTr = "";

    // newTr.append(trainName, destination, firstTrain, frequency);

    // $("tbody").append(newTr);

  }, function (errorObject){
      console.log("Errors handled: " + errorObject);
  });




}) 
