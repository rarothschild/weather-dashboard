var api_key = "9a890473fa5b28d71ed016387dd3738c"
var currentWeatherEl = document.getElementById("currentWeather")  // container for injecting current weather elements
var forecastWeatherEl = document.getElementById("forecastWeather")  // container for injecting forecast weather elements
var searchBtn = document.getElementById("search")  // button for exe search


// get previous searches from local storage, display to page
var storedCities = JSON.parse(localStorage.getItem("weather-app"))
if (storedCities) {
    // if available, loop through object and display each city
    // add data attribute with city name to reference within function when clicked
    console.log(storedCities)
}


function get_weather(city) {
    // get city name from coordinates
    var url_city = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`
    console.log("URL", url_city)
    console.log(city)

    fetch(url_city)
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
            var cityObj= data[0]
            console.log(data)

            console.log(cityObj)

            var lat = cityObj.lat
            var lon = cityObj.lon 
            var part = 'minutely,hourly,alerts'
            var units = 'imperial'
            var url_weather = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&units=${units}&appid=${api_key}`
            console.log("URL", url_weather)

            fetch(url_weather)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                // pull current weather, add to html
                console.log(data.current)
                var dt_unix_0 = data.current.dt
                var dt_0 = dayjs.unix(dt_unix_0).format("MM-DD-YYYY")

                var temp_0 = data.current.temp
                var wind_0 = data.current.wind_speed
                var humidity_0 = data.current.humidity
                var uv_0 = data.current.uvi

                // clear previous content
                currentWeatherEl.textContent = ""

                // create card for current weather
                card = document.createElement("div")
                card.setAttribute("class", "card")

                cardContent = document.createElement("div")
                cardContent.setAttribute("class", "card-content")

                content = document.createElement("div")
                content.setAttribute("class", "content")

                cardContent.appendChild(content)
                card.appendChild(cardContent)

                newEl = document.createElement("h3")
                newEl.textContent = (city.charAt(0).toUpperCase() + city.slice(1))
                content.appendChild(newEl)

                // newEl = document.createElement("p")
                // newEl.textContent = (lat + ", " + lon)
                // currentWeatherEl.appendChild(newEl)

                newEl = document.createElement("h4")
                newEl.textContent = (dt_0)
                content.appendChild(newEl)
    
                newEl = document.createElement("p")
                newEl.textContent = ("Temperature: " + temp_0)
                content.appendChild(newEl)
    
                newEl = document.createElement("p")
                newEl.textContent = ("Wind Speed : " + wind_0)
                content.appendChild(newEl)
    
                newEl = document.createElement("p")
                newEl.textContent = ("Humidity: " + humidity_0)
                content.appendChild(newEl)

    
                newEl = document.createElement("p")
                newEl.textContent = ("UV Index: " + uv_0)
                content.appendChild(newEl)

                // add card to container
                currentWeatherEl.appendChild(card)

                // set title for 5 day forecast
                newEl = document.createElement("h3")
                newEl.textContent = ("5 day forecast:")
                forecastWeatherEl.appendChild(newEl)

                for (var i = 1; i < 6; i ++) {
                    console.log(data.daily[i])
                    var dt_unix_1 = data.daily[i].dt
                    var dt_1 = dayjs.unix(dt_unix_1).format("MM-DD-YYYY")

                    var temp_1 = data.daily[i].temp.day
                    var wind_1 = data.daily[i].wind_speed
                    var humidity_1 = data.daily[i].humidity
            
                    
                    // create card
                    card = document.createElement("div")
                    card.setAttribute("class", "card square")

                    cardContent = document.createElement("div")
                    cardContent.setAttribute("class", "card-content")

                    content = document.createElement("div")
                    content.setAttribute("class", "content")

                    cardContent.appendChild(content)
                    card.appendChild(cardContent)

                    // set content

                    newEl = document.createElement("h4")
                    newEl.textContent = (dt_1)
                    content.appendChild(newEl)

                    newEl = document.createElement("p")
                    newEl.textContent = ("Temperature: " + temp_1)
                    content.appendChild(newEl)
        
                    newEl = document.createElement("p")
                    newEl.textContent = ("Wind Speed : " + wind_1)
                    content.appendChild(newEl)

                    newEl = document.createElement("p")
                    newEl.textContent = ("Humidity : " + humidity_1)
                    content.appendChild(newEl)
    
                    
                    forecastWeatherEl.appendChild(card)
                }

    
                // save new city to local storage, display on screen
                // does storedCities need to be called, or can reference outter scope?
                var storedCities = JSON.parse(localStorage.getItem("weather-app"))
                if (storedCities) {
                    storedCities.append(city) // save new city to local storage, limit to 5
                    // if available, loop through object and display each city
                    // add data attribute with city name to reference within function when clicked
                    console.log(storeCities)
                }
    
                return data;
            })
        })    
}

searchBtn.addEventListener("click", function(event) {
    var city = document.getElementById("cityInput").value  // input for city search
    if (city) {
        get_weather(city) 
    } else {
        console.log("No city entered")
    }
})

// get_weather("Bellingham")


