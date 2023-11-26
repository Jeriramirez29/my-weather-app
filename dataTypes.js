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

let days = ("Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun");
let monthsOfYear =
  ("Dec",
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov");

let formattedDay = day[days];

currentDate.innerHTML = `${days} ${date}, ${monthsOfYear} ${year}`;

// API

function displayTemp(response) {
  console.log(response.data.temperature.current);

  let temperature = Math.round(response.data.temperature.current);
  let cityChosen = response.data.city;

  let headerElement = document.querySelector("#country-selected");
  headerElement.innerHTML = `${cityChosen}`;

  let temperatureElement = document.querySelector("#liveTemp");
  temperatureElement.innerHTML = `${temperature}ºC`;
}
searchCity("Gibraltar");

axios.get(apiUrl).then(displayTemp);
  