var myDB;
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  myDB = window.openDatabase("exercise.db3", "1.0", "Exercise DB", 1000000);
  myDB.transaction(createDB, errorDB, successDB);
  $('#entry').hide();
  select('');
}

function createDB(tx) {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS trips(" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(30), tripName varchar(30), destination varchar," +
      "dateOfTrip varchar, totalDays integer, riskAssessment bool, description text)"
  );
}

function select(keyword) {
  myDB.transaction(
    function (tx) {
      tx.executeSql(
        "select * from trips" +
          " where name LIKE '%" +
          keyword +
          "%'" +
          " OR tripName LIKE '%" +
          keyword +
          "%'",
        [],
        dataSelect,
        errorDB
      );
    },
    errorDB,
  );
}

function dataSelect(tx, results) {
  var divList = document.getElementById("list");
  var recordList = "";
  for (var i = 0; i < results.rows.length; i++) {
    var record = "<div class='card text-bg-light mb-3' style='max-width: 100%;'>" +
    "<div class='card-header'>"
      + "" + 
        "<table width='100%'>" +
        "<tr>" +
        "<td width='90%'>" + 
            results.rows.item(i).id +
          "</td>" +
          "<td>" + 
            '<button class="ui-btn ui-icon-edit ui-btn-icon-notext ui-corner-all" onclick="onEdit(' + 
            results.rows.item(i).id +
            ')"></button>' +
          "</td>" +
          "<td>"+ 
            '<button class="ui-btn ui-icon-delete ui-btn-icon-notext ui-corner-all" onclick="deleteDB(' + 
            results.rows.item(i).id +
            ')"></button>' +
          "</td>" +
        "</tr>" +
      "</table>" +
    "</div>" +
    "<div class='card-body'>" +
      "<h5 class='card-title'>"+ results.rows.item(i).tripName + "</h5><br>" +
      "<table width='80%'>" +
        "<tr>" +
            "<td>Name:</td>" +
            "<td>"+ results.rows.item(i).name + "</td>" +
        "</tr>"+
        "<tr>" +
            "<td>Destination:</td>" +
            "<td>"+ results.rows.item(i).destination + "</td>" +
        "</tr>" +
        "<tr>" +
            "<td>Date Of Trip:</td>" +
            "<td>"+ results.rows.item(i).dateOfTrip + "</td>" +
        "</tr>" +
        "<tr>" +
            "<td>Total Days:</td>" +
            "<td>"+ results.rows.item(i).totalDays + "</td>" +
        "</tr>" +
        "<tr>" +
            "<td>Risk Assessment:</td>" +
            "<td>"+ results.rows.item(i).riskAssessment + "</td>" +
        "</tr>" +
        "<tr>" +
            "<td>Description:</td>" +
            "<td>"+ results.rows.item(i).description + "</td>" +
        "</tr>" +
      "</table>" +
    "</div>" +
  "</div>";
    recordList += '<div style="margin:8px;">' + record + "</div>";
  }
  divList.innerHTML = recordList;
}

function save() {
  if(myID) {
    update(myID);
    return;
  }
  var name = "";
  var tripName = "";
  var destination = "";
  var dateOfTrip = "";
  var totalDays = "";
  var riskAssessment = "";
  var description = "";

  name = document.getElementById('txtName').value;
  tripName = document.getElementById('txtTripName').value;
  destination = document.getElementById('txtDestination').value;
  dateOfTrip = document.getElementById('txtDate').value;
  totalDays = parseInt(document.getElementById('txtTotalDays').value);
  riskAssessment = $("#chkboxRiskAssessment").prop("checked");
  description = document.getElementById('txtDescription').value;

  
  myDB.transaction(
    function (tx) {
      tx.executeSql(
        "INSERT INTO trips(name, tripName, destination, dateOfTrip, totalDays, riskAssessment, description) VALUES (" +
          '"' +
          name +
          '",' +
          '"' +
          tripName +
          '",' +
          '"' +
          destination +
          '",' +
          '"' +
          dateOfTrip +
          '",' +
          '"' +
          totalDays +
          '",' +
          '"' +
          riskAssessment +
          '",' +
          '"' +
          description +
          '"' +
          ")"
      );
    },
    errorDB,
    successDB
  );
  closeEntry();
  select('');
}

function update(id) {
  var name = "";
  var tripName = "";
  var destination = "";
  var dateOfTrip = "";
  var totalDays = "";
  var riskAssessment = "";
  var description = "";

  name = document.getElementById('txtName').value;
  tripName = document.getElementById('txtTripName').value;
  destination = document.getElementById('txtDestination').value;
  dateOfTrip = document.getElementById('txtDate').value;
  totalDays = document.getElementById('txtTotalDays').value;
  riskAssessment = document.getElementById('chkboxRiskAssessment').value;
  description = document.getElementById('txtDescription').value;

  myDB.transaction(
    function (tx) {
      tx.executeSql(
        "UPDATE trips SET " +
          'name="' +
          name +
          '",' +
          'tripName="' +
          tripName +
          '",' +
          'destination="' +
          destination +
          '",' +
          'dateOfTrip="' +
          dateOfTrip +
          '",' +
          "totalDays=" +
          totalDays +
          "," +
          'riskAssessment="' +
          riskAssessment +
          '",' +
          'description="' +
          description +
          '"' +
          " where id=" +
          id
      );
    },
    errorDB,
    successDB
  );
  closeEntry();
  select('');
}

function deleteDB(id) {
  myDB.transaction(
    function (tx) {
      tx.executeSql("DELETE FROM trips where id=" + id);
    },
    errorDB,
    successDB
  );
  select("");
}

function search() {
  var searchWord = document.getElementById('search-1');
  select(searchWord.value);
}

function add() {
  $('#entry').show();
  $('#display').hide();
  $('#openEntryButton').hide();
  myID = null;
}

function closeEntry() {
  $('#entry').hide();
  $('#display').show();
  $('#openEntryButton').show();
}

var myID = null;
function onEdit(id) {
  myDB.transaction(
    function (tx) {
      tx.executeSql(
        "select * from trips where id =" + id,
        [],
        function (tx, results) {
          for (var i = 0; i < results.rows.length; i++) {
            $('#txtName').val(results.rows.item(i).name);
            $('#txtTripName').val(results.rows.item(i).tripName);
            $('#txtDestination').val(results.rows.item(i).destination);
            $('#txtDate').val(results.rows.item(i).dateOfTrip);
            $('#txtTotalDays').val(results.rows.item(i).totalDays);
            $('#chkboxRiskAssessment').val(results.rows.item(i).riskAssessment);
            $('#txtDescription').val(results.rows.item(i).description);
          }
        },
        errorDB
      );
    },
    errorDB,
    successDB
  );
  add();
  myID = id;
}

function successDB() {
  // alert("Success");
}

function errorDB(error) {
  alert(error);
}
