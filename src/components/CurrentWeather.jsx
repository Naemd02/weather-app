const CurrentWeather = ({ currentWeather }) => {
  return (
    <div className="current-weather">
      <img
        src={currentWeather.icon || "icons/no-result.svg"}
        className="weather-icon"
        alt="Weather Icon"
      />
      <h2 className="temperature">
        {currentWeather.temperature || "--"} <span>°C</span>
      </h2>
      <p className="description">{currentWeather.description || "No data"}</p>
    </div>
  );
};

export default CurrentWeather;
