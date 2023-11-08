const detailedContainer = document.getElementById('detailed-container');
const nowCardContainer = document.getElementById('now-card-container');
const todayCardContainer = document.getElementById('today-card-container');
const searchBar = document.getElementById('search-input');
const searchImg = document.querySelector('.search-input-container img');
const weatherIcon = document.getElementById('weather-icon');
const location = document.getElementById('location');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const date = document.getElementById('date');
const time = document.getElementById('time');
const nowButton = document.getElementById('now-btn');
const todayButton = document.getElementById('today-btn');
const nowButtonText = document.getElementById('now-btn-text');
const todayButtonText = document.getElementById('today-btn-text');
const uvValue = document.getElementById('uv-value');
const uvInfo = document.getElementById('uv-info');
const windValue = document.getElementById('wind-value');
const gustValue = document.getElementById('gust-value');
const feelsLikeValue = document.getElementById('feels-like-value');
const feelsLikeInfo = document.getElementById('feels-like-info');
const precipitationValue = document.getElementById('precipitation-value');
const precipitationInfo = document.getElementById('precipitation-info');
const visibilityValue = document.getElementById('visibility-value');
const visibilityInfo = document.getElementById('visibility-info');
const humidityValue = document.getElementById('humidity-value');
const humidityInfo = document.getElementById('humidity-info');
const sunsetTime = document.getElementById('sunset-time');
const sunriseTime = document.getElementById('sunrise-time');
const airPollutionValue = document.getElementById('air-pollution-value');
const airPollutionInfo = document.getElementById('air-pollution-info');
const airPressureValue = document.getElementById('air-pressure-value');
const overviewText = document.getElementById('overview-text');
const chanceOfRain = document.getElementById('overview-rain');
const avgTemp = document.getElementById('avg-temp');
const highLowTemp = document.getElementById('high-low-temp');

const currentDate = new Date()
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions)
const timeOptions = { hour: '2-digit', minute: '2-digit' }
const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions)
date.innerText = formattedDate
time.innerText = formattedTime

const nowView = () => {
  nowButtonText.style.textDecoration = 'underline'
  todayButtonText.style.textDecoration = 'none'
  nowCardContainer.style.display = 'grid'
  todayCardContainer.style.display = 'none'
}

const todayView = () => {
  todayButtonText.style.textDecoration = 'underline'
  nowButtonText.style.textDecoration = 'none'
  todayCardContainer.style.display = 'flex'
  nowCardContainer.style.display = 'none'
}

const todayWeatherFetch = (placeName) => {
  try {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=911c51c90b2644cd9ae172628232509&q=${placeName}&aqi=yes`)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      weatherIcon.style.display = 'flex'
      weatherIcon.src = data.current.condition.icon
      location.innerText = data.location.name
      temperature.innerText = data.current.temp_c + '°C'
      weatherDescription.innerText = data.current.condition.text
      uvValue.innerText = data.current.uv
      windValue.innerHTML = data.current.wind_mph + '<span> mph Wind</span>'
      gustValue.innerHTML = data.current.gust_mph + '<span> mph Gusts</span>'
      feelsLikeValue.innerText = data.current.feelslike_c + '°C'
      precipitationValue.innerHTML = data.current.precip_mm + '<span> mm in last 24hr</span>'
      visibilityValue.innerHTML = data.current.vis_miles + '<span> mi</span>'
      humidityValue.innerText = data.current.humidity + '%'
      airPollutionValue.innerText = data.current.air_quality['gb-defra-index']
      airPressureValue.innerHTML = data.current.pressure_mb + '<span>mbar</span>'

      overviewText.innerText = data.forecast.forecastday[0].day.condition.text
      chanceOfRain.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain + '<span>% chance of rain</span>'
      avgTemp.innerText = data.forecast.forecastday[0].day.avgtemp_c + '°C'
      highLowTemp.innerText = 'High: ' + data.forecast.forecastday[0].day.maxtemp_c + '\nLow: ' + data.forecast.forecastday[0].day.mintemp_c


      // const timeArr = data.current.last_updated.split(' ')
      // date.innerText = timeArr[0]
      // time.innerText = timeArr[1]

      detailedContainer.classList.remove('hidden')
      nowView()
    })
    .catch( () => {
      searchBar.value = ''
      searchBar.placeholder = 'No matching location'
    })
  } catch (error) {
      console.error(error.message)
  }
}

const todayAstroFetch = (placeName) => {
  try {
    fetch(`http://api.weatherapi.com/v1/astronomy.json?key=911c51c90b2644cd9ae172628232509&q=${placeName}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      sunsetTime.innerText = data.astronomy.astro.sunset
      sunriseTime.innerText = data.astronomy.astro.sunrise
    })
    .catch( () => searchBar.placeholder = 'No matching location')
  } catch(error) {
    console.error(error.message)
  }
}

searchBar.addEventListener('keydown', function(event) {
  const placeName = searchBar.value
  if (placeName) {
    if (event.key === 'Enter') {
      todayWeatherFetch(placeName)
      todayAstroFetch(placeName)
    }
  }
})

searchBar.addEventListener('focus', function() {
  searchImg.style.display = 'none'
})
searchBar.addEventListener('blur', function() {
  searchImg.style.display = 'block'
  searchBar.placeholder = "Enter location"
})

nowButton.addEventListener('click', nowView)
todayButton.addEventListener('click', todayView)