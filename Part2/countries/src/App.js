import { useState, useEffect } from "react";
import axios from "axios";
import Countrie from "./components/Countrie";
import FiltName from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);

  const [filter, setFilter] = useState("");

  const [searchData, setSearchData] = useState({})

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data.map(({ name, capital, population, languages, flags }) => ({ name:name.common,
      capital, population, languages, flags,
       })))
    }
    )
  }, []);

  const handleDateChange = (setFilter) => (event) => {
    setFilter(event.target.value)
    setSearchData({})
  }

  const countrieFilter = countries.filter(country => 
  country.name.toLowerCase().includes(filter)
) 

const handleCountrie = name => () => setSearchData(
  countrieFilter.filter(countrie => countrie.name.includes(name))[0]
)


  return (
    <div>
      <>
        <FiltName lookfor={filter} setLookfor={handleDateChange(setFilter)} />
      </>
      {countrieFilter.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {countrieFilter.length <= 10 &&
      countrieFilter.length > 1 &&
      countrieFilter.map(countrie => <div key={countrie.name} >{countrie.name}{' '}<button onClick={handleCountrie(countrie.name)}>show</button></div>) }
      {countrieFilter.length === 1 && (
        <Countrie countrie={countrieFilter[0]} />
        )}
      {searchData.name && <Countrie countrie={searchData} />}
    </div>
  );
};

export default App;
