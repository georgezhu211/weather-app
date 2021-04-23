// GIPHY API
const gifKey = 'hkNe43aiAFBXWFguJw0rG1E4uxBvr36b'
const img = document.querySelector('img')
const gifButton = document.querySelector('.gif-button')

gifButton.addEventListener('click', generateGIF)

function generateGIF() {
  const gifAPI = `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=cats`
  fetch(gifAPI, {mode: 'cors'})
    .then((response) => response.json())
    .then((response) => img.src = response.data.images.original.url)
}

generateGIF()

// WEATHER API

const weatherKey = 'b144913c37a5db76946c5657770db654'

function generateWeather(cityID) {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&APPID=${weatherKey}`
  fetch(weatherAPI, {mode: 'cors'})
    .then((response) => response.json())
    .then((response) => render(response))
}

// generateWeather('Japan')

// CITY LIST API
const weatherChart = document.querySelector('.weather-chart')
const input = document.querySelector('input')
const cityButton = document.querySelector('.city-button')

cityButton.addEventListener('click', (e) => {
  e.preventDefault()
  const cityName = formatInput(input.value)
  searchCity(cityName)
  input.value = ""
})

function searchCity(cityName) {
  weatherChart.innerHTML = ''
  fetch('./city.list.json')
    .then((response) => response.json())
    .then((response) => process(response, cityName))
    .then((cities) => {
      cities.forEach((city) => {
        generateWeather(city.id)
      })
    })
    .catch(() => console.log('could not find city'))

}

function formatInput(cityName) {
  return cityName.charAt(0).toUpperCase() + cityName.slice(1)
}

function process(cityList, cityName) {
  cities = []
  cityList.forEach((city) => {
    if(city.name == cityName) {
      cities.push(city)
    }
  })
  return cities
}

function render(city) {
  console.log(city)
  const name = document.createElement('li')
  name.textContent = "Name: " + city.name + ", " + city.sys.country
  name.style.textAlign = 'center'
  name.style.fontSize = '18px'
  name.style.textDecoration = 'underline'
  const weather = document.createElement('li')
  weather.textContent = 'Weather: ' + city.weather[0].description
  const temperature = document.createElement('li')
  temperature.textContent = 'Temperature: ' + +((city.main.temp - 273.15) * 9/5 + 32).toFixed(2)
  const humidity = document.createElement('li')
  humidity.textContent = 'Humidity: ' + city.main.humidity
  const wind = document.createElement('li')
  wind.textContent = 'Wind: ' + city.wind.speed
  const clouds = document.createElement('li')
  clouds.textContent = 'Cloudiness: ' + city.clouds.all
  const ul = document.createElement('ul')
  ul.classList.add('card')
  ul.appendChild(name)
  ul.appendChild(weather)
  ul.appendChild(temperature)
  ul.appendChild(humidity)
  ul.appendChild(wind)
  ul.appendChild(clouds)
  weatherChart.appendChild(ul)
}

