import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const QueryForm = ({ queryFieldChange }) => {
  return (
    <div>
      find countries: <input onChange={queryFieldChange} />
    </div>
  );
};

const CountryData = ({ country }) => {
  const api_key = process.env.REACT_APP_WAK;
  const languages = Object.values(country.languages);

  const [isActive, setIsActive] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`
      )
      .then((response) => {
        console.log(response);
        setWeatherData(response.data);
      });
  }, []);

  const handleShow = () => {
    setIsActive(true);
  };

  if (isActive) {
    const httpWeatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>
          Capital: {country.capital} <br></br>
          Area: {country.area}
        </div>
        <h3>Languages</h3>
        <ul>
          {languages.map((language, i) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="country flag .png" />
        <h2>Weather in {country.capital}</h2>
        <p>
          temperature {(weatherData.main.temp - 273.15).toPrecision(2)} &#8451;
        </p>
        <img src={httpWeatherIcon} alt="weather icon .png"></img>
        <p>wind {weatherData.wind.speed} m/s</p>
      </div>
    );
  } else {
    return (
      <div>
        <span>{country.name.common} </span>
        <button onClick={handleShow}>Show</button>
      </div>
    );
  }
};

const Results = ({ foundCountries }) => {
  //console.log(foundCountries.length)
  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (foundCountries.length >= 1) {
    return (
      <div>
        {foundCountries.map((country) => (
          <CountryData country={country} />
        ))}
      </div>
    );
  } else {
    return <div>No matches</div>;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response);
      setCountries(response.data);
    });
  }, []);

  const queryFieldChange = (e) => {
    const queryResults = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value)
    );
    setFoundCountries(queryResults);
    //queryResults.forEach((result, i) => console.log(i, result.name.common));
  };

  return (
    <div>
      <QueryForm queryFieldChange={queryFieldChange} />
      <Results foundCountries={foundCountries} />
    </div>
  );
};

export default App;
