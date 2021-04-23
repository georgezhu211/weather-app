const gifKey = 'hkNe43aiAFBXWFguJw0rG1E4uxBvr36b'
const img = document.querySelector('img')
const button = document.querySelector('button')

button.addEventListener('click', generateGIF)

function generateGIF() {
  const gifAPI = `https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=cats`
  fetch(gifAPI, {mode: 'cors'})
    .then((response) => response.json())
    .then((response) => img.src = response.data.images.original.url)
}

generateGIF()

const weatherKey = 'b144913c37a5db76946c5657770db654'

function generateWeather() {
  const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${weatherKey}`
  fetch(weatherAPI, {mode: 'cors'})
    .then((response) => response.json())
    .then((response) => console.log(response))
}

generateWeather()
