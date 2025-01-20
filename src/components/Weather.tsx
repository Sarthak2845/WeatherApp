import { FaSearch, FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import SunRiseSunSet from "./SunRiseSunSet";
import HumiWind from "./HumiWind";

interface Weather {
  name: string;
  humidity: number;
  windSpeed: number;
  temp: number;
  temp_max: number;
  temp_min: number;
  main_cond: string;
  desp: string;
  icon: string;
  sunRise: number,
  sunSet: number
}

const today = new Date();
const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "2-digit",
  month: "short",
  day: "numeric",
};
const formattedDate = today.toLocaleDateString("en-US", options);

const Weather = () => {
  const [weatherData, setData] = useState<Weather>({
    name: "",
    humidity: 0,
    windSpeed: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    main_cond: "",
    desp: "",
    icon: "",
    sunRise: 0,
    sunSet: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const kelvinToCelsius = (kelvin: number) => Math.floor(kelvin - 273.15);
  const kelvinToFahrenheit = (kelvin: number) =>
    Math.floor((kelvin - 273.15) * 1.8 + 32);

  const convertTemp = (kelvin: number) =>
    isCelsius ? kelvinToCelsius(kelvin) : kelvinToFahrenheit(kelvin);

  const search = async (city: string) => {
    try {
      setIsLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        throw new Error(data.message || "Invalid city name");
      }
      console.log(data)
      setData({
        name: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        main_cond: data.weather[0].main,
        desp: data.weather[0].description,
        icon: data.weather[0].icon,
        sunRise: data.sys.sunrise,
        sunSet: data.sys.sunset,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Could not fetch weather data. Please check the city name.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchLocationWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}`;
              const res = await fetch(url);
              const data = await res.json();
              setData({
                name: data.name,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                main_cond: data.weather[0].main,
                desp: data.weather[0].description,
                icon: data.weather[0].icon,
                sunRise: data.sys.sunrise,
                sunSet: data.sys.sunset,
              });
            } catch (error) {
              console.error("Error fetching weather data:", error);
            }
          },
          (error) => console.error("Error getting location:", error)
        );
      }
    };

    fetchLocationWeather();
  }, []);


  return (
    <div className="flex items-center justify-center p-4 mt-12 min-h-screen">
      <div className="flex items-center justify-center bg-[#000000c7] rounded-lg p-8 flex-col">
        <div className="border p-1 rounded-full flex hover:shadow-sm hover:shadow-white mb-8">
          <input
            type="text"
            className="bg-transparent outline-none text-white w-full font-serif ml-1"
            placeholder="Search..."
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputRef.current?.value) {
                search(inputRef.current.value);
              }
            }}
          />
          <FaSearch
            className="m-1 text-white h-5 w-5 cursor-pointer"
            onClick={() => {
              if (inputRef.current?.value) search(inputRef.current.value);
            }}
          />
        </div>

        {isLoading ? (
          <p className="text-white text-xl">Loading...</p>
        ) : weatherData.name ? (
          <>
            <h1 className="text-3xl text-white font-bold">
              {weatherData.name}
            </h1>
            <p className="p-4 text-xl text-gray-300">{weatherData.main_cond}</p>
            <p className="p-2 text-gray-300">{weatherData.desp}</p>

            <div className="flex items-center m-4">
              <h1 className="text-xl text-white">{formattedDate}</h1>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                alt={weatherData.main_cond}
              />
              <p className="text-white m-2 text-3xl">
                {convertTemp(weatherData.temp)}°{isCelsius ? "C" : "F"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-center items-center m-4">
                <h2 className="text-white m-2 text-3xl">Max</h2>
                <p className="text-white m-2 text-xl flex items-center">
                  <FaTemperatureHigh className="m-2" />
                  {convertTemp(weatherData.temp_max)}°{isCelsius ? "C" : "F"}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center m-4">
                <h2 className="text-white m-2 text-3xl">Min</h2>
                <p className="text-white m-2 text-xl flex items-center">
                  <FaTemperatureLow className="m-2" />
                  {convertTemp(weatherData.temp_min)}°{isCelsius ? "C" : "F"}
                </p>
              </div>
            </div>
            <HumiWind hum={weatherData.humidity} wind={weatherData.windSpeed} />
            <SunRiseSunSet rise={weatherData.sunRise} set={weatherData.sunSet} />
            <button
              className="text-white mt-4 px-4 py-2 border rounded hover:bg-white hover:text-black transition"
              onClick={() => setIsCelsius(!isCelsius)}
            >
              Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
            </button>
          </>
        ) : (
          <p className="text-amber-400 text-xl">
            Please search for a valid city...
          </p>
        )}
      </div>
    </div>
  );
};

export default Weather;

