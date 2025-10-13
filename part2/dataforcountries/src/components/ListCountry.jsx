import { useState } from "react";
import Country from "./Country";

const ListCountry = ({ country }) => {
  const [show, setShow] = useState(false);

  return (
    <li>
      {country.name.common}
      <button onClick={() => setShow(!show)}>Show</button>
      {show && <Country country={country} />}
    </li>
  );
};

export default ListCountry;
