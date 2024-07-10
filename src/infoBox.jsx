import React, { useEffect, useState } from 'react';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Sun from "./assets/3.png";
import Night from "./assets/1.jpg";
import './infoBox.css';

export default function InfoBox({ info }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Function to format time as hh:mm AM/PM
    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    // Determine which weather icon to display based on conditions
    const getWeatherIcon = () => {
        if (info.humidity > 80) {
            return <ThunderstormIcon />;
        } else if (info.temp > 15) {
            return <WbSunnyIcon />;
        } else {
            return <AcUnitIcon />;
        }
    };

    // Determine which weather image to display based on daytime or nighttime
    const isDaytime = () => {
        const currentHour = currentTime.getHours();
        const sunriseHour = new Date(info.sunrise * 1000).getHours();
        const sunsetHour = new Date(info.sunset * 1000).getHours();

        return currentHour >= sunriseHour && currentHour < sunsetHour;
    };

    const getWeatherImage = () => {
        if (isDaytime()) {
            return <img src={Sun} alt="Sun" className="weather-image" />;
        } else {
            return <img src={Night} alt="Night" className="weather-image" />;
        }
    };

    return (
        <div className="infoBox">
            <div className="weather-icon">
                {getWeatherImage()}
            </div>
            <h2>{info.weather}</h2>
            <div className="temp_box">
                <h2>{info.temp}&deg;&nbsp;C</h2>
                <p>Min:&nbsp;&nbsp;{info.temp_min}&deg;C</p>
                <p>Max:&nbsp;&nbsp;{info.temp_max}&deg;C</p>
                <p>Feels Like:&nbsp;&nbsp;{info.feelsLike}&deg;C</p>
            </div>
            {getWeatherIcon()}
            <h3>{info.name}</h3>
            <div className="humidity">
                <h3>Humidity</h3>
                <div className="humidity-circle">
                    <div className="inner-circle"></div>
                    <p>{info.humidity}%</p>
                </div>
            </div>
            <div className="wind-speed">
                <h3>Wind Speed</h3>
                <p>{info.windSpeed} m/s</p>
            </div>
            <div className="sunrise-sunset">
                <h3>Sunrise and Sunset</h3>
                <p>Sunrise: {formatTime(info.sunrise)} | Sunset: {formatTime(info.sunset)}</p>
                {isDaytime() ? (
                    <p>It's currently daytime.</p>
                ) : (
                    <p>It's currently nighttime.</p>
                )}
            </div>
        </div>
    );
}
