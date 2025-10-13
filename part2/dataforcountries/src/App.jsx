import { useEffect, useState } from "react";
import axios from "axios";
import countryService from "./service/country";
import country from "./service/country";

function App() {
  const [countries, setCountries] = useState([]);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(nameInput.toLowerCase())
  );

  return (
    <div>
      <p>
        Find countries{" "}
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </p>
      {filteredCountries.length === 1 ? (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <p>capital {filteredCountries[0].capital}</p>
          <p>area {filteredCountries[0].area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(filteredCountries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={filteredCountries[0].flags.png} alt="flag" width="150px" />
        </div>
      ) : filteredCountries.length <= 10 && filteredCountries.length > 0 ? (
        filteredCountries.map((country) => (
          <p key={country.name.common}>{country.name.common}</p>
        ))
      ) : filteredCountries.length > 10 && filteredCountries.length !== 250 ? (
        <p>Too many matches, specify another filter</p>
      ) : ""}
    </div>
  );
}

export default App;
