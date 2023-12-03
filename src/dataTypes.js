function cityInput(event) {
  event.preventDefault();
  let searchEngine = document.querySelector("#search-engine");
  searchCity(searchEngine.value);
}

function searchCity(city) {
  let apiKey = "0f467b61fd3fddobeaf80419at5186fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", cityInput);

// Live date

let currentDate = document.querySelector("#current-date");
let presentTime = new Date();
let day = presentTime.getDay();
let date = presentTime.getDate();
let month = presentTime.getMonth();
let year = presentTime.getFullYear();

let days = ("Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun" );

let monthsOfYear =
  ("Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec");

let formattedDay = day[days];

currentDate.innerHTML = `${days} ${date}, ${monthsOfYear} ${year}`;

// Weather forecast
function formatDay(timestamp) {
  let date = new Date (timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "0f467b61fd3fddobeaf80419at5186fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {

  let forecastHtml = "";

  response.data.daily.forEach(function(day, index) {
    if (index < 5) {
    forecastHtml =
    forecastHtml +
    `
    <ul class="mon">
        <li>${formatDay(day.time)}</li>
        <li>
        <img src="${day.condition.icon_url}" class="weather-icon" />
         </li>
    </ul>
`;
    }
});
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

// API

function displayTemp(response) {
  console.log(response.data.temperature.current);

  let temperature = Math.round(response.data.temperature.current);
  let cityChosen = response.data.city;

  let descriptionElement = document.querySelector("#current-temp");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let iconEmoji = document.querySelector("#api-icon-emoji");
  iconEmoji.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-weather-emoji" />`
  
  let headerElement = document.querySelector("#country-selected");
  headerElement.innerHTML = `${cityChosen}`;

  let temperatureElement = document.querySelector("#liveTemp");
  temperatureElement.innerHTML = `${temperature}ºC`;

  getForecast(response.data.city);

}
searchCity("Gibraltar");