// Store personal API key
const myKey = "048972194e90bf2218a26bbaa7e08f43";

// Store user input to local storage
var Cities = JSON.parse(localStorage.getItem('entries')) || [];

// Renders cities that user searches to the page
function renderSavedCities(Cities) {
    
    // Empties out HTML
    $('#history').empty();

    // Iterates over the city inputs
    for (var i = 0; i < Cities.length; i++) {

        // Variable to hold user input values under "<p>" tag (jQuery syntax)
        var display = $('<p>').addClass("list-group list-group-item list-group-item-action");
        display.text(Cities[i]);
        
        // Adds "display" variable to the div for entry history
        $('#history').append(display);
    }

}


// Display weather data when user provides entry and clicks Submit button
$('#submit').on('click', function(event) {
    event.preventDefault();


    // Display user's entry history
    var CityHistory = $('#text')
        .val()
        .trim();
        console.log(CityHistory);
    Cities.push(CityHistory);

    renderSavedCities(Cities);

    localStorage.setItem('entries', JSON.stringify(Cities));

    // Show 5-Day Forecast heading
    $('#forecast').addClass('show');

    // Call weather API and ensure the response displays imperial units
    fetch(
        'https://api.openweathermap.org/data/2.5/forecast?q=' + 
          CityHistory + 
          '&appid=' + 
          myKey +
          '&units=imperial'
    )
    

    // Return API data to page
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        if (response.length === 0) {
            console.log('No data available for entry provided.');
        }

        else {
 
            console.log(response);

            // Set variables for current weather conditions (temp, humidity, wind, date & UV index)
            var temperature = response.list[0].main.temp;
            var humidity = response.list[0].main.humidity;
            var wind = response.list[0].wind.speed;
            var date = new Date();
            var UVI = response.list[0].main.uvindex;
            
            // Set variables to display current weather conditions in organized "card" container
            var currentContent = $("<div>").addClass("card col-lg-12 text-black");
            var body1 = $("<div>").addClass("card-body");
            var currentDate = $("<h3>").addClass("card-title").text(date);
            var currentTemp = $("<p>").addClass("card-text").text("Temperature: " + temperature);
            var currentHumidity = $("<p>").addClass("card-text").text("Humidity: " + humidity +" %");
            var currentWind = $("<p>").addClass("card-text").text("Wind Speed: " + wind + " mph");
            var currentUVI = $("<p>").addClass("card-text").text("UV Index: " + UVI);
            
            // Set variable that holds list of weather data
            var currentResults = response.list;
            
            // Iterates straight to the 40th data entry of the array
            for (var i = 0; i < currentResults.length; i = 40) {
 
                // Set current weather variable for if else-if statement to determine appropriate icon
                var currentWeather = currentResults[0].weather[0].main;
                
                // Determines what icon to display based on weather description
                if (currentWeather === "Rain") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                else if (currentWeather === "Clouds") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/03d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                else if (currentWeather === "Clear") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                else if (currentWeather === "Drizzle") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                else if (currentWeather === "Snow") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }
             

                // Prepare variables above to be displayed by condensing them into two main variables (also listed above)
                body1.append(currentDate, icon, currentTemp, currentHumidity, currentWind, currentUVI);
                currentContent.append(body1);

                // Display current weather conditions by calling them to the HTML "current" div ID
                $("#current").append(currentContent);

            
            }
            
            // Set variable that holds list of 5-day forecast weather data
            var fiveResults = response.list;

            // Iteration that divides the list of weather data into 5 parts (there are 40 weather data entries in the array)
            for (var i = 0; i < 5; i++) {
                
                // Set variables to interpret data for the five-day forecast info (day, temp, & humidity)
                var fiveDay = $("<div>").addClass("card col-lg-12 text-white").css("background-color", "blue");
                var fiveTemp = fiveResults[i].main.temp;
                var fiveHum = fiveResults[i].main.humidity;
                var forecastTemp = $("<div>").addClass("card-text").text("Temp: " + fiveTemp);
                var forecastHum = $("<div>").addClass("card-text").text("Humidity: " + fiveHum + " %");

                // Set 5-day forecast weather variable for if else-if statement to determine appropriate icon for each day
                var fiveWeather = fiveResults[i].weather[0].main;
                

                // Determines what icon to display based on weather description
                if (fiveWeather === "Rain") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                else if (fiveWeather === "Clouds") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/03d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                else if (fiveWeather === "Clear") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                else if (fiveWeather === "Drizzle") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }

                else if (fiveWeather === "Snow") {
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }            

                // Set date for five-day period
                date.setDate(date.getDate() + 1);
                var dd = date.getDate();
                var mm = date.getMonth() + 1;
                var y = date.getFullYear();
                var fiveFormattedDate = mm + '/' + dd + '/' + y;
                
                fiveDay.append(icon);
                fiveDay.append(forecastTemp);
                fiveDay.append(forecastHum);
                fiveDay.append(fiveFormattedDate);
               
                $("#five-day").append(fiveDay);
            }  
                
             

        }
    })
}

    
    

)

