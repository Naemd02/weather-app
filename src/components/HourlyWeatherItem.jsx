const HourlyWeatherItem = ({ forecast }) => {
  return (
    <li className="weather-item">
      <p className="time">{forecast.time || "N/A"}</p>
      <img
        src={forecast.icon || "icons/no-result.svg"}
        className="weather-icon"
        alt="Weather Icon"
      />
      <p className="temperature">{forecast.temperature || "--"}°</p>
    </li>
  );
};

export default HourlyWeatherItem;
