import Weather from "./Weather";

const Country = ({country}) => {
    // console.log(country);


  return (
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" width="150px" />
        <Weather capital={country.capital} lat={country.latlng[0]} lon={country.latlng[1]} />
      </div>
  )
}

export default Country
