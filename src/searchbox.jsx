import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './searchBox.css';

export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");

    const apiUrl = "http://api.openweathermap.org/data/2.5/weather";
    const apiKey = "2451287d0f19b76cc9901ae6901f6a56"; 

    let getWeatherInfo = async () => {
        try {
            const url = `${apiUrl}?q=${city}&limit=1&appid=${apiKey}&units=metric`;

            let response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText} (Status Code: ${response.status})`);
            }
            let jsonResponse = await response.json();
            console.log(jsonResponse);

            let result = {
                temp: jsonResponse.main.temp,
                temp_min: jsonResponse.main.temp_min,
                temp_max: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                name: jsonResponse.name,
                windSpeed: jsonResponse.wind.speed,
                sunrise: jsonResponse.sys.sunrise,
                sunset: jsonResponse.sys.sunset,
            };
            console.log(result);
            return result;

        } catch (error) {
            console.error('Error fetching weather data:', error.message);
            console.error('Stack trace:', error.stack);
        }
    }

    let onClickEvent = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async(event) => {
        event.preventDefault();
        console.log("City:", city);
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
        setCity("");
    }

    return (
        <div className="search-box">
            <h3>Search the City name</h3>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" value={city} onChange={onClickEvent} required /><br /><br />
                <Button variant="contained" type='submit'>Search</Button>
            </form>
        </div>
    );
}
