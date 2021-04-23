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


