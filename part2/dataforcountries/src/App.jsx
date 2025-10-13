import { useEffect, useState } from "react";
import countryService from "./service/country";
import CountriesList from "./components/CountriesList";

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
      <CountriesList filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
