
var database = firebase.database();

$("#scheduleNewTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName")
    .val()
    .trim();
  var destination = $("#destination")
    .val()
    .trim();
  var firstTrainTime = moment(
    $("#firstTrainTime")
      .val()
      .trim(),
    "HH:mm"
  ).format("HH:mm");
  var frequency = $("#frequency")
    .val()
    .trim();

  var start = firstTrainTime;
  var firstTimeConverted = moment(start, "HH:mm a").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var minutesTillTrain = frequency - tRemainder;
  var nextTrain = moment().add(minutesTillTrain, "minutes");

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");

  database.ref().push({
    name: trainName,
    trainDes: destination,
    freq: frequency,
    next: moment(nextTrain).format("hh:mm"),
   minutes: minutesTillTrain
  });
});

database.ref().on("child_added", function(childSnap) {
  $("#trainTable > tbody").append(
    "<tr><td>" +
      childSnap.val().name +
      "</td><td>" +
      childSnap.val().trainDes +
      "</td><td>" +
      childSnap.val().freq +
      "</td><td>" +
      childSnap.val().next +
      "</td><td>" +
      childSnap.val().minutes +
      "</td>"
  );
});
