import "./App.css";
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import Topbuttons from "./components/topbuttons";
import Inputs from "./components/Inputs";
import TimeandLocation from "./components/TimeandLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecaste from "./components/Forecaste";
import getFormattedWeatherData from "./Services/WeatherService";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [query, setquery] = useState({ q: "berlin" });
  const [units, setunits] = useState("metric");
  const [weather, setweather] = useState(null);
  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, units }).then(data => {
        setweather(data);
      });
      
    };
    fetchWeather();
  }, [query, units]);
  const formatbackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700"
  }
  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatbackground()}`}
    >
      <Topbuttons setquery={setquery} />
      <Inputs setquery={setquery} units={units} setunits={setunits} />
      {weather && (
        <div>
          <TimeandLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecaste title="hourly forecast" items={weather.hourly} />
          <Forecaste title="daily forecast" items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
