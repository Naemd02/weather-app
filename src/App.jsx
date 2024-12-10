import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import SearchSection from "./components/SearchSection";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);

  // Fetches weather details based on the API URL
  const getWeatherDetail = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Extract current weather data
      const temperature = data.current.temp_c;
      const description = data.current.condition.text;
      const icon = mapWeatherToIcon(description);

      // Extract hourly forecast based on the current time
      const currentHour = new Date(data.location.localtime).getHours(); // Get current hour in the city's local time
      const hourlyData = data.forecast.forecastday[0].hour
        .slice(currentHour, currentHour + 6) // Get next 6 hours from current time
        .map((hour) => ({
          time: hour.time.split(" ")[1], // Extract time (HH:mm)
          temperature: hour.temp_c,
          icon: mapWeatherToIcon(hour.condition.text),
        }));

      setCurrentWeather({ temperature, description, icon });
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Helper function to map weather descriptions to icons
  const mapWeatherToIcon = (description) => {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes("sunny") || lowerDesc.includes("clear")) return "icons/clear.svg";
    if (lowerDesc.includes("cloud")) return "icons/clouds.svg";
    if (lowerDesc.includes("rain")) return "icons/rain.svg";
    if (lowerDesc.includes("snow")) return "icons/snow.svg";
    if (lowerDesc.includes("thunder")) return "icons/thunder.svg";
    if (lowerDesc.includes("mist") || lowerDesc.includes("fog")) return "icons/mist.svg";
    return "icons/no-result.svg"; // Default icon
  };

  return (
    <div className="container">
      {/* Search section */}
      <SearchSection getWeatherDetail={getWeatherDetail} />

      {/* Weather section */}
      <div className="weather-section">
        <CurrentWeather currentWeather={currentWeather} />

        {/* Hourly weather forecast list */}
        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecast.map((item, index) => (
              <HourlyWeatherItem key={index} forecast={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
