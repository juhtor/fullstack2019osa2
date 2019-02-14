import React from 'react'
import Header from './Header'

const FilterForm = ({ newFilter, handleFilterChange }) => {
    return (
        <div>
            <Header title='Rajaa hakua' />
            <form >
                <input
                    value={newFilter}
                    onChange={handleFilterChange}
                />
            </form>
        </div>
    )
}

export default FilterForm