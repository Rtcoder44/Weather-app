import SearchBox from "./searchbox";
import InfoBox from "./infoBox";
import { useState } from "react";

export default function WeatherApp(){
    let [weatherInfo, setWeatherInfo] = useState({
        temp: 33,
        temp_min: 25,
        temp_max: 39,
        humidity: 33,
        feelsLike: 22,
        weather: "broken Cloud",
        name: "Kushinagar",
        windSpeed: 1.15,
        sunrise: 1720481847, 
        sunset: 1720481847,
    })

    let updateInfo = (newInfo)=>{
        setWeatherInfo(newInfo);
    }

    return(
        <div style={{textAlign:"center"}}>
       <h2>Weather App</h2>
       <SearchBox updateInfo={updateInfo}/>
       <InfoBox info={weatherInfo} />
        </div>
    )
}