import {useState} from 'react'
import axios from "axios";

const Countrie = ({countrie }) => {
  
  const [temperature, setTemperature] = useState (0) 

  const [wind, setWind] = useState (0) 

  const [icon, setIcon] = useState ((' ')) 

 
 const Kelvin = kelvin => kelvin - 273.15
  
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countrie.capital}&appid=c97566f1aafdd1d33ea80ef1a1ccfebd`).then(response => {
    setTemperature(
      Math.round(Kelvin(response.data.main.temp) * 10 ) / 10 
      )
      setWind(response.data.wind.speed)
      setIcon(response.data.weather[0].icon)
  })
  

 return ( 
   <>
  <h3>{countrie.name}</h3>
  <div>capital {countrie.capital} <br/>
     populaton {countrie.population} <br/>
     <h3>languages : </h3>              
      <ul>
      {Object.values(countrie.languages).map(languages => <li key={languages}>{languages}</li>)}
      </ul>                         
  </div>
  <div>
    <img src={countrie.flags.png} alt={`${countrie.name} flags`}
    /> 
    </div>
    <h2>Weather in {countrie.capital}</h2>
    <div><strong>Temperature: {temperature} Celsius</strong></div>
    <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
    <div><strong>wind: {wind} mph direction SSW</strong></div>
</>

)
}
export default Countrie;