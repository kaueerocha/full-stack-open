import { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'

const CountryInfo = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <img src={country.flag.png} width="200" alt={`${country.name.common} flag`} />
    </div>
  )
}

const App = () => {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow =
    search === ''
    ? countries
    : countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  
  if (countriesToShow.length === 1) {
    return (
      <div>
        Find countries <input onChange={handleSearchChange} />
        <div>
          <CountryInfo country={countriesToShow[0]} />
        </div>
      </div>
    )
  }

  return (
    <div>
      Find countries <input onChange={handleSearchChange} />
      <div>
        {countriesToShow.length > 10 
          ? 'Too many matches, specify another filter' 
          : countriesToShow.map(country => <div key={country.name.common}>{country.name.common}</div>)
        }
      </div>
    </div>

  )
}

export default App