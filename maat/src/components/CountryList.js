import React from 'react'
// d09507eb0e3744c1ae5183001191302
// https://api.apixu.com/v1/current.json?key=d09507eb0e3744c1ae5183001191302&q=
const CountryList = ({ countries, handleCountryClick }) => {
    if (countries.length > 10) {
        return <div>too many countries</div>
    }
    return (
        <div>
            {countries.map(country =>
                <div key={country.name}>{country.name}
                    <button onClick={handleCountryClick(country)} >
                        show</button>
                </div>
            )}
        </div>
    )
}

export default CountryList