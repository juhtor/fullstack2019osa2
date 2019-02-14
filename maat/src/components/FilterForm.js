import React from 'react'

const FilterForm = ({ newFilter, handleFilterChange }) => {
    return (
        <div>
            find countries
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