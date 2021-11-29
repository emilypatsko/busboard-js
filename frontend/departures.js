$(document).ready(function () {
    console.log("Document is ready for action");
    
    $("#postcode-submit-btn").click(function (event) {
        event.preventDefault();
        console.log("Submit button clicked!");
        $("#results").remove();

        $.get(`/departureBoards?postcode=${$("#postcode-input").val()}`, function (data) {
            console.log(data);
            $("#postcode-form").after($('<div id="results"><h2>Results</h2></div>'));
            
            $.each(data, function(stop) {
                $("#results").append(`<h3>${data[stop].stopPoint.commonName}</h3><ul id=stop${stop}-list></ul>`);

                $.each(data[stop].arrivals, function(arrival) {
                    $(`#stop${stop}-list`).append(`<li>${Math.round(data[stop].arrivals[arrival].timeToStation/60)} minutes: ${data[stop].arrivals[arrival].lineName} to ${data[stop].arrivals[arrival].destinationName}</li>`);
                })
            })
        });
    });    
});