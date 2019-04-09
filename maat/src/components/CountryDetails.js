import React from 'react'
// d09507eb0e3744c1ae5183001191302
// https://api.apixu.com/v1/current.json?key=d09507eb0e3744c1ae5183001191302&q=
const CountryDetails = ({ country, weather, flag }) => {
  console.log(country.flag)
  return (
    <div>
      <h1>{country.name}</h1>
      <div className="flag">
        <img id="svg-object"
          src={country.flag}
          type="image/svg+xml"
          alt="flag">
        </img>
      </div >

      <p>
        capital {country.capital} <br />
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>)}
      </ul>
      <h2>Weather in {weather.location.name}</h2>
      temperature {weather.current.temp_c} celcius
        < br />
      wind {weather.current.wind_kph}
      <br />
      humidity {weather.current.humidity} %
        </div >
  )
}

export default CountryDetails