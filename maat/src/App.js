import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [newFilter, setNewFilter] = useState('')
  const [selectedCountryWeather, setSelectedCountryWeather] = useState(null)
  const [selectedCountryFlag, setSelectedCountryFlag] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const handleCountryClick = (country) => {
    return async () => {
      const response = await axios
        .get('https://api.apixu.com/v1/current.json?key=d09507eb0e3744c1ae5183001191302&q='
          + country.capital)
      setSelectedCountryWeather(response.data)
      const flagResponse = await axios
        .get(country.flag)
      setSelectedCountryFlag(flagResponse.data)
      setSelectedCountry(country)
    }
  }
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      {selectedCountry === null ?
        <div>
          <FilterForm handleFilterChange={handleFilterChange}
            newFilter={newFilter} />
          <CountryList countries={filteredCountries}
            handleCountryClick={handleCountryClick} />
        </div>
        :
        <CountryDetails
          country={selectedCountry}
          weather={selectedCountryWeather}
          flag={selectedCountryFlag} />
      }

    </div>
  )

}

export default App;
