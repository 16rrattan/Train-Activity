var firebaseConfig = {
    apiKey: "AIzaSyB_R1O7x1EbgDxo8_JZH3_0MAs45cCl7Lk",
    authDomain: "train-activity-42f91.firebaseapp.com",
    databaseURL: "https://train-activity-42f91.firebaseio.com",
    projectId: "train-activity-42f91",
    storageBucket: "",
    messagingSenderId: "22029149097",
    appId: "1:22029149097:web:37d04318abbe7899"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // user input
    var trainname = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firsttrain = $("#first-time-input").val();
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newtrain = {
        trainname: trainname,
        destination: destination,
        firsttrain: firsttrain,
        frequency: frequency,
    };

    // Uploads employee data to the database
    database.ref().push(newtrain);

    // Logs everything to console
    console.log(newtrain.trainname);
    console.log(newtrain.destination);
    console.log(newtrain.firsttrain);
    console.log(newtrain.frequency);

    // Clears all of the text-boxes
    $("#train-name-input").val("").trim();
    $("#destination-input").val("").trim();
    $("#first-train-input").val("").trim();
    $("#frequency-input").val("").trim();
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(Snapshot) {
    console.log(Snapshot.val());

    // Store everything into a variable.
    var trainname = Snapshot.val().trainname;
    var destination = Snapshot.val().destination;
    var firsttrain = Snapshot.val().firsttrain;
    var frequency = Snapshot.val().frequency;


    // console.log(trainname);
    // console.log(destination);
    // console.log(firsttrain);
    // console.log(frequency);

    // Prettify the employee start

    var fields = firsttrain.split(':');
    var hours = fields[0];
    var minutes = fields[1];
    var starttime = hours * 60 + minutes * 1;
    console.log(starttime);

    console.log(convertstart());

    // this is a break

    function convertstart() {
        var totalMinutes = starttime;
        var hours = Math.floor(totalMinutes / 60);
        var minutes = totalMinutes % 60;
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return hours + ":" + minutes;
    };

    function convertnext() {
        var totalMinutes = nexttrain;
        var hours = Math.floor(totalMinutes / 60);
        var minutes = totalMinutes % 60;
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return hours + ":" + minutes;
    };



    var nexttrain = starttime + frequency * 1;
    console.log(nexttrain);
    console.log(convertnext());

    // Calculate the total billed rate
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    console.log(time);
    console.log(convertendmin());
    var minutesaway = convertendmin() * 1 - nexttrain * 1;
    console.log("-------");
    console.log(nexttrain);
    console.log(convertendmin());
    console.log(minutesaway);

    function convertendmin() {
        var fields = time.split(':');
        var hours = fields[0];
        var minutes = fields[1];
        var minaway = hours * 60 + minutes * 1;
        return minaway;
    }

    // Create the new row
    var newRow = $("<tr>").append(
        $("<th>").text(trainname),
        $("<th>").text(destination),
        $("<th>").text(frequency),
        $("<th>").text(convertnext()),
        $("<th>").text(minutesaway),

    );

    // Append the new row to the table
    $("#train-time-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case