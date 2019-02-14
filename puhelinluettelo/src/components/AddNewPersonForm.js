import React from 'react'
import Header from './Header'

const AddNewPersonForm = ({ newName, newNumber, handleNumberChange,
    handleNameChange, addPerson }) => {
    return (
        <div>
            <Header title='Lisää uusi' />
            <form onSubmit={addPerson}>
                <input
                    value={newName}
                    onChange={handleNameChange}
                />
                <br />
                <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
                <br />
                <button type="submit">tallenna</button>
            </form>
        </div>
    )
}

export default AddNewPersonForm