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

const Results = ({ foundCountries }) => {
  if (foundCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (foundCountries.length > 1) {
    return (
      <div>
        {foundCountries.map((country) => (
          <div key={country.name.common}>{country.name.common}</div>
        ))}
      </div>
    );
  } else if (foundCountries.length === 1) {
    const country = foundCountries[0];
    const languages = Object.values(country.languages);

    return (
      <div>
        <h1>{country.name.common}</h1>  
        <div>
          Capital: {country.capital} <br></br>
          Area: {country.area}
        </div>
        <h3>Languages</h3>
        <ul>
          {languages.map((language) => (
            <li key={0}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="country flag .png" />
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
    );
    //console.log(queryResults);
    setFoundCountries(queryResults);
  };

  return (
    <div>
      <QueryForm queryFieldChange={queryFieldChange} />
      <Results foundCountries={foundCountries} />
    </div>
  );
};

export default App;
