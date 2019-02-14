import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import AddNewPersonForm from './components/AddNewPersonForm'
import FilterForm from './components/FilterForm'

const App = () => {
    const [persons, setPersons] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        const names = persons.map(person => person.name)
        if (names.indexOf(newName) >= 0) {
            window.alert(newName + ' on jo puhelinluettelossa')
            return
        }
        const personObject = {
            name: newName,
            number: newNumber,
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
        <div>
            <h1>Puhelinluettelo</h1>
            <FilterForm handleFilterChange={handleFilterChange}
                newFilter={newFilter} />
            <AddNewPersonForm handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                newName={newName}
                newNumber={newNumber}
                addPerson={addPerson} />
            <Persons persons={filteredPersons} />
        </div>
    )

}

export default App