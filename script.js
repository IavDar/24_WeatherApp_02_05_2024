// API_KEY уникальный ключ, для каждого пользователя. Он указывается
// на вкладке api_keys (копируем его оттуда). По нему определяется
// сколько API запросов было сделано:
let arr = [];
const API_KEY = "665722e3a93dd66a649c2036ae46bf3d";
const locationInput = document.getElementById("locationInput");
const getWeatherButton = document.getElementById("getWeatherButton"); //получаем ссылку на
// кнопку, чтобы повестить на нее обработчик событий

getWeatherButton.onclick = () => {
  const cityName = locationInput.value.trim(); // убирает лишние пробелы
  // API_KEY всегда добавляем в адрес запроса:
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  )
    .then((response) => response.json())
    .then((weather) => displayWeather(weather));

  locationInput.value = "";
};

/* {
     "coord": {
       "lon": 10.99,
       "lat": 44.34
     },
     "weather": [
       {
         "id": 501,
         "main": "Rain",
         "description": "moderate rain",
         "icon": "10d"
       }
     ],
     "base": "stations",
     "main": {
       "temp": 298.48,
       "feels_like": 298.74,
       "temp_min": 297.56,
       "temp_max": 300.05,
       "pressure": 1015,
       "humidity": 64,
       "sea_level": 1015,
       "grnd_level": 933
     },
     "visibility": 10000,
     "wind": {
       "speed": 0.62,
       "deg": 349,
       "gust": 1.18
     },
     "rain": {
       "1h": 3.16
     },
     "clouds": {
       "all": 100
     },
     "dt": 1661870592,
     "sys": {
       "type": 2,
       "id": 2075663,
       "country": "IT",
       "sunrise": 1661834187,
       "sunset": 1661882248
     },
     "timezone": 7200,
     "id": 3163858,
     "name": "Zocca",
     "cod": 200
   }                         */

// деструктурируем весь объект weather, берем только то значение,
// которое лежит по ключу name (в параметрах в скобках функции):

function displayWeather({  // до деструктуризации здесь в параметрах был весь объект weather 
  name,
  main: { temp },
  weather: [{ description, icon }],
  wind: { speed: speedOfWind },
  sys: {sunrise, sunset }
}) {

  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);
  weatherContainer.innerHTML = `
     <h2>${name}</h2>
     <img src= "https://openweathermap.org/img/wn/${icon}.png">
     <p>Temperature: ${temp}°C</p>
     <p>Description: ${description}</p>
     <p>Speed of wind: ${speedOfWind} m/s</p>
     <p>Sunrise: ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}:${sunriseTime.getSeconds()}</p>
     <p>Sunset: ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}:${sunsetTime.getSeconds()} </p>
     `;
}
