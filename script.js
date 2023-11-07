const searchBar = document.getElementById('search-input');
const location = document.getElementById('location');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const date = document.getElementById('date');
const time = document.getElementById('time');
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

const weatherApiFetch = () => {
  fetch('http://api.weatherapi.com/v1/current.json?key=911c51c90b2644cd9ae172628232509&q=edinburgh')
  .then(response => response.json())
  .then(data => {
    console.log(data)

    location.innerText = data.location.name
    temperature.innerText = data.current.temp_c + 'C'
    weatherDescription.innerText = data.current.condition.text
    uvValue.innerText = data.current.uv
    windValue.innerText = data.current.wind_mph + ' mph Wind'
    gustValue.innerText = data.current.gust_mph + ' mph Gust'
    feelsLikeValue.innerText = data.current.feelslike_c + 'C'
    precipitationValue.innerText = data.current.precip_mm + ' mm in last 24hr'
    visibilityValue.innerText = data.current.vis_miles + ' mi'
    humidityValue.innerText = data.current.humidity + '%'
    airPressureValue.innerText = data.current.pressure_mb + 'mbar'
  })
}

weatherApiFetch()