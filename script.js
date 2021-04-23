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

function generateWeather(cityName) {
  const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${weatherKey}`
  fetch(weatherAPI, {mode: 'cors'})
    .then((response) => response.json())
    .then((response) => console.log(response))
}

generateWeather('Japan')

// CITY LIST API
const input = document.querySelector('input')
const cityButton = document.querySelector('.city-button')

cityButton.addEventListener('click', (e) => {
  e.preventDefault()
  const cityName = formatInput(input.value)
  searchCity(cityName)
})

function searchCity(cityName) {
  fetch('./city.list.json')
    .then((response) => response.json())
    .then((response) => process(response, cityName))
    .then((cities) => {
      cities.forEach((city) => {
        generateWeather(city.name)
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

