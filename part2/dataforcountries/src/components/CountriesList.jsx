import Country from "./Country";
import ListCountry from "./ListCountry";

const CountriesList = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return <Country country={country} />;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 0) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <ListCountry key={country.name.common} country={country} />
        ))}
      </ul>
    );
  } else if (
    filteredCountries.length > 10 &&
    filteredCountries.length !== 250
  ) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return "";
  }
};

export default CountriesList;
