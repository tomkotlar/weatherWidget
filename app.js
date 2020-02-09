window.addEventListener("load", () => {
  let lat
  let long
  let tempDescription = document.querySelector(".temperature-description")
  let tempDegree = document.querySelector(".temperature-degree")
  let timezoneLocale = document.querySelector(".location-timezone")
  let iconElement = document.querySelector(".weather-icon")
  let tempSpan = document.querySelector(".temperature span")
  let tempSection = document.querySelector(".temperature")

  const myweather = {}

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude

      const proxy = "https://cors-anywhere.herokuapp.com/"
      const api = `${proxy}https://api.darksky.net/forecast/d99e84e2053ac4a9484e2279831483c7/${lat},${long}`

      fetch(api)
        .then(response => {
          let data = response.json()
          return data
        })
        .then(weather => {
          // console.log(weather)
          const { temperature, summary, icon } = weather.currently
          myweather.description = summary
          myweather.iconId = icon
          myweather.timezone = weather.timezone
          myweather.temperature = temperature
          let celsius = (temperature - 32) * (5 / 9)

          changeToCelsius(celsius, temperature)
          displayWeather()
          // console.log(myweather)
        })
        .catch(err => console.log(err, "this is errror"))
    })
  }

  function displayWeather() {
    iconElement.innerHTML = `<img  width="228" height="228" src="animated/${myweather.iconId}.svg"/>`
    tempDegree.innerHTML = myweather.temperature
    timezoneLocale.innerHTML = myweather.timezone
    tempDescription.innerHTML = myweather.description.toLowerCase()
    getImage()
  }

  function changeToCelsius(celsius, temperature) {
    tempSection.addEventListener("click", () => {
      if (tempSpan.textContent === "F") {
        tempSpan.textContent = "C"
        tempDegree.textContent = Math.floor(celsius)
      } else {
        tempSpan.textContent = "F"
        tempDegree.textContent = temperature
      }
    })
  }

  function getImage() {
    let randomInt = Math.floor(Math.random() * 100)

    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random?sig=" + randomInt + "')"
  }
})

const clock = document.querySelector(".clock .clockText")

function getTime() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const time = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`
  clock.innerHTML = time
  return
}

function init() {
  getTime()
  setInterval(getTime, 1000)
  return
}

init()

const quote = document.querySelector(".quote_Text")
const quoteauthor = document.querySelector(".quote_Author")

function getQuote() {
  const proxy = "https://cors-anywhere.herokuapp.com/"
  let url = `${proxy}https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&json=?`

  fetch(url)
    .then(response => {
      let text = response.json()
      return text
    })
    .then(data => {
      console.log(data)
      const { quoteText, quoteAuthor } = data
      quote.innerHTML = quoteText
      quoteauthor.innerHTML = quoteAuthor
    })
    .catch(err => console.log(err, "this is quote errror"))
}
getQuote()
