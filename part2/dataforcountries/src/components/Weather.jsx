import { useEffect, useState } from "react";
import weatherService from "../service/weather"

const Weather = ({capital, lat, lon}) => {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
    weatherService.getWeather(lat, lon).then((data) => {
        console.log(data);
        setWeather(data);
    })
    }, [lat, lon]);
  return (
    <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {weather?.main.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="weather icon" />
        <p>wind {weather?.wind.speed} m/s</p>
      
    </div>
  )
}

export default Weather
