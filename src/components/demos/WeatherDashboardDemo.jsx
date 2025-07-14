import React, { useState } from 'react'

const DEMO_FORECAST = [
  { day: 'Mon', temp: 22, icon: '01d', desc: 'Clear' },
  { day: 'Tue', temp: 24, icon: '02d', desc: 'Partly Cloudy' },
  { day: 'Wed', temp: 19, icon: '09d', desc: 'Showers' },
  { day: 'Thu', temp: 21, icon: '10d', desc: 'Rain' },
  { day: 'Fri', temp: 23, icon: '01d', desc: 'Sunny' },
  { day: 'Sat', temp: 25, icon: '01d', desc: 'Sunny' },
  { day: 'Sun', temp: 20, icon: '03d', desc: 'Cloudy' },
]

const DEMO_WEATHER = {
  name: 'Demo City',
  sys: { country: 'XX' },
  weather: [{ icon: '01d', description: 'clear sky' }],
  main: { temp: 22, humidity: 60, pressure: 1012 },
  wind: { speed: 3.5 },
}

const WeatherDashboardDemo = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isDemo, setIsDemo] = useState(false)

  const searchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name')
      setWeatherData(null)
      setForecast([])
      setIsDemo(false)
      return
    }
    setLoading(true)
    setError('')
    setWeatherData(null)
    setForecast([])
    setIsDemo(false)
    try {
      // Try real API first
      const API_KEY = 'YOUR_API_KEY' // <-- Replace with your OpenWeatherMap API key
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
      if (!response.ok) throw new Error('City not found')
      const data = await response.json()
      setWeatherData(data)
      // Try to fetch 7-day forecast (One Call API)
      if (data.coord) {
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=metric`)
        if (forecastRes.ok) {
          const forecastData = await forecastRes.json()
          setForecast(forecastData.daily.slice(0, 7))
        } else {
          setForecast([])
        }
      }
    } catch (err) {
      // Fallback to demo data
      setIsDemo(true)
      setWeatherData({ ...DEMO_WEATHER, name: city.trim() })
      setForecast(DEMO_FORECAST)
      setError('Showing demo data for this city.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWeather()
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Weather Dashboard</h3>
        <p className="text-gray-600">Search for any city to see current weather and 7-day forecast</p>
      </div>
      {/* Search Section */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name..." 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={searchWeather}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && (
          <p className={`mt-2 text-sm ${isDemo ? 'text-yellow-600' : 'text-red-600'}`}>{error}</p>
        )}
      </div>
      {/* Weather Display */}
      {weatherData && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <h4 className="text-xl font-bold text-gray-800 mb-2">{weatherData.name}, {weatherData.sys.country}</h4>
            <div className="flex items-center justify-center mb-4">
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt="Weather" 
                className="w-16 h-16" 
              />
              <div className="ml-4">
                <div className="text-4xl font-bold text-gray-800">{Math.round(weatherData.main.temp)}°C</div>
                <div className="text-gray-600 capitalize">{weatherData.weather[0].description}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-gray-600 text-sm">Humidity</div>
                <div className="font-semibold text-gray-800">{weatherData.main.humidity}%</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Wind Speed</div>
                <div className="font-semibold text-gray-800">{weatherData.wind.speed} m/s</div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Pressure</div>
                <div className="font-semibold text-gray-800">{weatherData.main.pressure} hPa</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 7-Day Forecast */}
      {forecast && forecast.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">7-Day Forecast</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {isDemo
              ? forecast.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center bg-blue-50 rounded-lg p-3">
                    <span className="font-semibold text-gray-700 mb-1">{day.day}</span>
                    <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt={day.desc} className="w-10 h-10 mb-1" />
                    <span className="text-lg font-bold text-blue-700">{day.temp}°C</span>
                    <span className="text-xs text-gray-500">{day.desc}</span>
                  </div>
                ))
              : forecast.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center bg-blue-50 rounded-lg p-3">
                    <span className="font-semibold text-gray-700 mb-1">{new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt={day.weather[0].description} className="w-10 h-10 mb-1" />
                    <span className="text-lg font-bold text-blue-700">{Math.round(day.temp.day)}°C</span>
                    <span className="text-xs text-gray-500">{day.weather[0].description}</span>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherDashboardDemo 