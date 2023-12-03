const apiKey = "48396e1b1e2fc15375752201423a0e29";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
const searchBox = document.querySelector(".search-container>input");
const searchBtn = document.querySelector(".search-container>button");
const map = document.querySelector(".map");

function getCardinalDirection(degrees) {
    if (typeof degrees === 'number') {
        const directions = ['North', 'North East', 'East', 'South East', 'South', 'South West', 'West', 'North West'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    } else {
        return 'Unknown';
    }
}


async function chechWeather(location){
    try{
    
    const response = await fetch(apiUrl +`&q=${location}`+ `&appid=${apiKey}`);
    let data = await response.json();
    console.log(data)

    const weatherData = document.querySelector(".weather-data");

    // Extract relevant weather information
    const city = data.name;
    const longitude =data.coord.lon;
    const latitude =data.coord.lat;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const pressure = data.main.pressure;
    const windSpeed = data.wind.speed;
    const uvIndex = data.id;
    const windDirection = getCardinalDirection(data.wind.deg);
   

 console.log(longitude,latitude,city,temperature,humidity,pressure,windSpeed,uvIndex)
map.style.backgroundColor ="#360369";
    map.innerHTML=`  <div class="map-head">
    <h2>Welcome to The Weather App</h2>
    <p>here is searched location</p>
    <div>
        <p>Latitude: ${latitude}</p>
        <p>Longitude: ${longitude}</p>
    </div>
</div>
    <iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&output=embed"
    width="100%"
    height="80%"
    frameborder="0"></iframe>`

    // Display weather information
    weatherData.innerHTML = `<h2>Your Weather Data</h2>
                                <div class="info">
                                  <p>Temperature: ${temperature} °C</p>
                                  <p>Humidity: ${humidity}%</p>
                                  <p>Pressure: ${pressure} hpa</p>
                                  <p>Wind Speed: ${windSpeed} kmph</p>
                                 <p>Wind Direction:${windDirection} </p>
                                  <p>UV Index: ${uvIndex}</p>  
                                  <p>Time Zone: GMT +5:30</p>                                                  
                                  </div>`;

}
catch(error){
    console.log(`Invalid Api ${error}`);
}
}
searchBtn.addEventListener("click", ()=>{
    chechWeather(searchBox.value);
})
