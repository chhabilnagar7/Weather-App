const inputbox = document.querySelector('.input-box');
const searchBtn = document.getElementById('search-btn');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
// when location not found it's an error 
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const apiKey = "f3c210d68117a6ac5a784237b4d23718";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


    // fetch return the promise and then convert the data into a string with the help of json and await is used to collect all data and for that we have to make function to async function
    const weatherData = await fetch(`${url}`).then(response => response.json());

    // if city name is wrong or city not found then it'll show an error with img 
    if(weatherData.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        //console.log("errorr");
        return;
    }
    // if there is no error then weather body beome visible 
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    // getting data from  API
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;

    description.innerHTML = `${weatherData.weather[0].description}`;

    humidity.innerHTML = `${weatherData.main.humidity}%`;

    windSpeed.innerHTML = `${weatherData.wind.speed}Km/h`;

    //console.log(weatherData)

    switch(weatherData.weather[0].main){
        case 'Clouds':
            weatherImg.src = "/Weather App/images/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "/Weather App/images/clear.png";
            break;
        case 'Rain':
            weatherImg.src ="/Weather App/images/rain.png";
            break;
        case 'Mist':
            weatherImg.src ="/Weather App/images/mist.png";
            break;
        case 'Snow':
            weatherImg.src ="/Weather App/images/snow.png";
            break;
    }


}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputbox.value);
});