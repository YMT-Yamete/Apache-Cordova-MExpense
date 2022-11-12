function confirmationOn() {
  var tripName = document.getElementById("txtTripName").value;
  var destination = document.getElementById("txtDestination").value;
  var dateOfTrip = document.getElementById("txtDate").value;
  var totalDays = document.getElementById("txtTotalDays").value;
  var travelAgency = document.getElementById("txtTravelAgency").value;
  var riskAssessment = $("#chkboxRiskAssessment").prop("checked");
  var description = document.getElementById("txtDescription").value;

  if (tripName == "") {
    alert('Please Enter Trip Name');
  } else if (destination == "") {
    alert('Please Enter Destination');
  } else if (dateOfTrip == "") {
    alert('Please Choose Date of Trip');
  } else if (totalDays == "") {
    alert('Please Enter Total Days');
  } else if (travelAgency == "") {
    alert('Please Enter Travel Agency Name');
  } else {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("tripNameConfirm").innerHTML = tripName;
    document.getElementById("destinationConfirm").innerHTML = destination;
    document.getElementById("dateConfirm").innerHTML = dateOfTrip;
    document.getElementById("totalDaysConfirm").innerHTML = totalDays;
    document.getElementById("travelAgencyConfirm").innerHTML = travelAgency;
    document.getElementById("riskAssessmentConfirm").innerHTML = riskAssessment;
    document.getElementById("descriptionConfirm").innerHTML = description;
  }
}

function confirmationOff() {
  document.getElementById("overlay").style.display = "none";
}
