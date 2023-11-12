const detailedContainer = document.getElementById('detailed-container');
const nowCardContainer = document.getElementById('now-card-container');
const todayCardContainer = document.getElementById('today-card-container');
const allCards = document.querySelectorAll('.detailed-card');
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
const uvIndexCard = document.getElementById('uv-index-card');
const uvValue = document.getElementById('uv-value');
const uvInfo = document.getElementById('uv-info');
const windValue = document.getElementById('wind-value');
const gustValue = document.getElementById('gust-value');
const feelsLikeValue = document.getElementById('feels-like-value');
const feelsLikeInfo = document.getElementById('feels-like-info');
const precipitationValue = document.getElementById('precipitation-value');
const precipitationInfo = document.getElementById('precipitation-info');
const visibilityCard = document.getElementById('visibility-card');
const visibilityValue = document.getElementById('visibility-value');
const visibilityInfo = document.getElementById('visibility-info');
const humidityValue = document.getElementById('humidity-value');
const humidityInfo = document.getElementById('humidity-info');
const dewPoint = document.getElementById('dew-point');
const sunsetTime = document.getElementById('sunset-time');
const sunriseTime = document.getElementById('sunrise-time');
const airPollutionCard = document.getElementById('air-pollution-card')
const airPollutionValue = document.getElementById('air-pollution-value');
const airPollutionInfo = document.getElementById('air-pollution-info');
const airPressureValue = document.getElementById('air-pressure-value');
const overviewText = document.getElementById('overview-text');
const chanceOfRain = document.getElementById('overview-rain');
const avgTemp = document.getElementById('avg-temp');
const highLowTemp = document.getElementById('high-low-temp');
const locationImage = document.getElementById('location-image')

const currentDate = new Date()
const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions)
const timeOptions = { hour: '2-digit', minute: '2-digit' }
const formattedTime = currentDate.toLocaleTimeString(undefined, timeOptions)
date.innerText = formattedDate
time.innerText = formattedTime

const weatherIcons = {
  1000: 'images/2682848_day_forecast_sun_sunny_weather_icon.png',
  1003: 'images/2682849_cloud_cloudy_day_forecast_sun_icon.png',
  1006: 'images/2682850_cloud_clouds_cloudy_forecast_weather_icon.png',
  1009: 'images/2682850_cloud_clouds_cloudy_forecast_weather_icon.png',
  1030: 'images/2682821_fog_foggy_forecast_mist_weather_icon.png',
  1063: 'images/2682845_cloud_cloudy_forecast_rain_sun_icon.png',
  1087: 'images/2682827_cloud_day_light bolt_rain_sun_icon.png',
  1135: 'images/2682821_fog_foggy_forecast_mist_weather_icon.png',
  1153: 'images/2682845_cloud_cloudy_forecast_rain_sun_icon.png',
  1180: 'images/2682845_cloud_cloudy_forecast_rain_sun_icon.png',
  1183: 'images/2682845_cloud_cloudy_forecast_rain_sun_icon.png',
  1189: 'images/2682845_cloud_cloudy_forecast_rain_sun_icon.png',
  1195: 'images/2682845_cloud_cloudy_forecast_rain_sun_icon.png',
  1213: 'images/2682823_forecast_snow_snowflake_weather_icon.png',
  1219: 'images/2682823_forecast_snow_snowflake_weather_icon.png',
  1225: 'images/2682823_forecast_snow_snowflake_weather_icon.png',
  1255: 'images/2682823_forecast_snow_snowflake_weather_icon.png',
}

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

const uvIndexLevel = (uvIndex) => {
  let level = ''
  let textColor = ''
  if (uvIndex <= 2) {
    level = 'Low'
    textColor = 'green'
    return { level, textColor }
  } else if (uvIndex >= 3 && uvIndex <= 5) {
    level = 'Moderate'
    textColor = 'yellow'
    return { level, textColor }
  } else if (uvIndex >= 6 && uvIndex <= 7) {
    level = 'High'
    textColor = 'orange'
    return { level, textColor }
  } else if (uvIndex >= 8 && uvIndex <= 10) {
    level = 'Very High'
    textColor = 'darkred'
    return { level, textColor }
  } else {
    level = 'Extreme'
    textColor = 'red'
    return { level, textColor }
  }
}

const visibilityLevel = (visibility) => {
  let level = ''
  let textColor = ''
  if (visibility < 1) {
    level = 'Very poor visibility'
    textColor = 'red'
    return { level, textColor }
  } else if (visibility >= 1 && visibility <= 4) {
    level = 'Poor visibility'
    textColor = 'darkred'
    return { level, textColor }
  } else if (visibility >= 5 && visibility <= 7) {
    level = 'Moderate visibility'
    textColor = 'darkorange'
    return { level, textColor }
  } else if (visibility >= 8 && visibility <= 10) {
    level = 'Good visibility'
    textColor = 'darkgreen'
    return { level, textColor }
  } else {
    level = 'Perfectly clear view'
    textColor = 'green'
    return { level, textColor }
  }
}

const dewPointCalc = (temp, humidity) => {
  const dewPointValue = temp - (100 - humidity)/5
  return dewPointValue
}

const airPollutionLevel = (airPollution) => {
  let level = ''
  let textColor = '' 
  if (airPollution < 50) {
    level = 'Good'
    textColor = 'green'
    return { level, textColor}
  } else if (airPollution > 50 && airPollution <= 100) {
    level = 'Moderate'
    textColor = 'orange'
    return { level, textColor}
  } else {
    level = 'Unhealthy'
    textColor = 'red'
    return { level, textColor}
  }
}

const todayWeatherFetch = (placeName) => {
  try {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=911c51c90b2644cd9ae172628232509&q=${placeName}&aqi=yes`)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      weatherIcon.style.display = 'flex'
      location.innerText = data.location.name
      temperature.innerText = data.current.temp_c + '°C'
      weatherDescription.innerText = data.current.condition.text
      uvValue.innerText = data.current.uv
      windValue.innerHTML = data.current.wind_mph + '<span> mph Wind</span>'
      feelsLikeValue.innerText = data.current.feelslike_c + '°C'
      precipitationValue.innerHTML = data.current.precip_mm + '<span> mm in last 24hr</span>'
      visibilityValue.innerHTML = data.current.vis_miles + '<span> mi</span>'
      humidityValue.innerText = data.current.humidity + '%'
      airPollutionValue.innerText = data.current.air_quality['gb-defra-index']
      airPressureValue.innerHTML = data.current.pressure_mb + '<span>mbar</span>'

      overviewText.innerText = data.forecast.forecastday[0].day.condition.text
      chanceOfRain.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain + '%' + ' <span>chance of rain</span>'
      avgTemp.innerText = data.forecast.forecastday[0].day.avgtemp_c + '°C'
      highLowTemp.innerHTML = '<span>High: </span>' + data.forecast.forecastday[0].day.maxtemp_c + '°C' + '\n<span>Low: </span>' + data.forecast.forecastday[0].day.mintemp_c + '°C'

      const weatherIconCode = data.current.condition.code
      weatherIcon.src = weatherIcons[weatherIconCode]

      humidityInfo.innerHTML = '<span>The dew point is about </span>' + dewPointCalc(data.current.temp_c, data.current.humidity).toFixed(1) + '°C ' + ' <span>right now</span>'
      uvInfo.innerText = uvIndexLevel(data.current.uv).level
      gustValue.innerHTML = data.current.gust_mph + 'mph' + '<span> Gusts</span>'
      visibilityInfo.innerText = visibilityLevel(data.current.vis_miles).level
      precipitationInfo.innerHTML = data.forecast.forecastday[0].day.totalprecip_mm + 'mm' + '<span> of rain expected today</span>'
      airPollutionInfo.innerText = airPollutionLevel(data.current.air_quality['gb-defra-index']).level

      allCards.forEach( card => {
        const cardFootText = card.querySelector('.card-foot p')
        card.addEventListener('mouseover', function() {
          cardFootText.style.fontSize = 'medium'
          cardFootText.style.fontWeight = '500'
        })
        card.addEventListener('mouseleave', function() {
          cardFootText.style.fontSize = ''
          cardFootText.style.fontWeight = ''
        })
      })

      uvIndexCard.addEventListener('mouseover', function() {
        uvInfo.style.color = uvIndexLevel(data.current.uv).textColor
        uvInfo.style.opacity = 1
      })
      uvIndexCard.addEventListener('mouseleave', function() {
        uvInfo.style.color = ''
        uvInfo.style.opacity = ''
      })

      visibilityCard.addEventListener('mouseover', function() {
        visibilityInfo.style.color = visibilityLevel(data.current.vis_miles).textColor
      })
      visibilityCard.addEventListener('mouseleave', function() {
        visibilityInfo.style.color = ''
      })

      airPollutionCard.addEventListener('mouseover', function() {
        airPollutionInfo.style.color = airPollutionLevel(data.current.air_quality['gb-defra-index']).textColor
      })
      airPollutionCard.addEventListener('mouseleave', function() {
        airPollutionInfo.style.color = ''
      })

      detailedContainer.classList.remove('hidden')
      nowView()
    })
    .catch( (error) => {
      searchBar.value = ''
      searchBar.placeholder = 'No matching location'
      console.error(error)
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
      sunriseTime.innerHTML = '<span>Sunrise:</span> ' + data.astronomy.astro.sunrise
    })
    .catch( () => searchBar.placeholder = 'No matching location')
  } catch(error) {
    console.error(error.message)
  }
}

const locationImageFetch = (placeName) => {
  fetch(`https://api.pexels.com/v1/search?query=${placeName} city`, {
    method: 'GET',
    headers: {
      Authorization: 'lym18wZq9OnXAtvZp0Ss5kPZLAarcrReI3UxgnEo54CxcQGiSecmy7ZC',
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    const randIndex = Math.floor(Math.random() * 15)
    locationImage.src = data.photos[randIndex].src.portrait
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

searchBar.addEventListener('keydown', function(event) {
  const placeName = searchBar.value
  if (placeName) {
    if (event.key === 'Enter') {
      todayWeatherFetch(placeName)
      todayAstroFetch(placeName)
      locationImageFetch(placeName)
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