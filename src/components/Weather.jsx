import { useEffect, useState } from 'react'
import searchIcon from '../assets/search.png'
import cloudsPng from '../assets/clouds.png'
import humidtyPng from '../assets/humidity.png'
import windPng from '../assets/wind.png'
import clearPng from '../assets/clear.png'
import drizzlePng from '../assets/drizzle.png'
import mistPng from '../assets/mist.png'
import rainPng from '../assets/rain.png'
import snowPng from '../assets/snow.png'

const Weather = () => {
  const img = document.querySelector('.weatherIcon')
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const API_KEY = 'b21657df24b96e8af1c152bda8133b90'

  const fetchData = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${API_KEY}`
    )
    if (res.status === 404) {
      setError('Invalid City Name')
    }

    const data = await res.json()
    setData(data)
  }

  if (data?.weather?.[0]?.main === 'Clear') {
    img.src = clearPng
  } else if (data?.weather?.[0]?.main === 'Clouds') {
    img.src = cloudsPng
  } else if (data?.weather?.[0]?.main === 'Mist') {
    img.src = mistPng
  } else if (data?.weather?.[0]?.main === 'Drizzle') {
    img.src = drizzlePng
  } else if (data?.weather?.[0]?.main === 'Rain') {
    img.src = rainPng
  } else if (data?.weather?.[0]?.main === 'Snow') {
    img.src = snowPng
  }

  const handleClick = () => {
    fetchData(query)
    if (query.length === 0) {
      alert('Please enter a city name')
      document.querySelector('.weather').style.display = 'none'
    }
    setError(false)
  }

  useEffect(() => {
    setError(true)
  }, [])

  return (
    <div className="card">
      <div className="heading">
        <h1>Weather App - 🔆</h1>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="City Name"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button onClick={handleClick}>
          <img src={searchIcon} alt="" />
        </button>
      </div>
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="weather">
          <img className="weatherIcon" src={cloudsPng} alt="" />
          <h1 className="temp">{Math.round(data?.main?.temp)}°C</h1>
          <h2 className="city">{data?.name}</h2>
          <div className="details">
            <div className="col">
              <img src={humidtyPng} alt="" />
              <div>
                <p className="humidity">{data?.main?.humidity}%</p>
                <p>humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={windPng} alt="" />
              <div>
                <p className="wind">{data?.wind?.speed}</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Weather
