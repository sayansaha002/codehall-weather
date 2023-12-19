import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=ca80e923341105b1ba05a8975c22e7d4`

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLatitude('')
    setLongitude('')
  }

  return (
    <div className="app">
      <div className="directions">
        <div className='latitude'>
          <input
            value={latitude}
            onChange={event => setLatitude(event.target.value)}
            placeholder='Enter Latitude'
            type="text" />
        </div>
        <div className='longitude'>
          <input
            value={longitude}
            onChange={event => setLongitude(event.target.value)}
            placeholder='Enter Longitude'
            type="text" />
        </div>
      </div>
      <div className='search'>
        <input
          type="submit"
          value='Submit'
          onClick={()=>{searchLocation()}}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;