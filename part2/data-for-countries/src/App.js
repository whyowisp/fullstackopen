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
  const [isActive, setIsActive] = useState(false);
  const languages = Object.values(country.languages);

  const handleShow = () => {
    setIsActive(true);
  };

  if (isActive) {
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
      </div>
    );
  } else {
    return (
      <div>
        <span>{country.name.common}  </span>
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
      //console.log(response);
      setCountries(response.data);
    });
  }, []);

  const queryFieldChange = (e) => {
    const queryResults = countries.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value)
    );;
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
