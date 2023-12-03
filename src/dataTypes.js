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

let days = ("Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat");
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
function displayForecast() {

  let days = ["Mon", "Tue", "Wed", "Thur", "Fri"];
  let forecastHtml = "";

  days.forEach(function(day) {
    forecastHtml =
    forecastHtml +
    `
    <ul class="mon">
        <li>${day}</li>
        <li>🌥️</li>
    </ul>
`;
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
}
searchCity("Gibraltar");
displayForecast();

axios.get(apiUrl).then(displayTemp);
  