import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import AddNewPersonForm from './components/AddNewPersonForm'
import FilterForm from './components/FilterForm'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
    // axios
    //   .get('/api/persons')
    //   .then(response => {
    //     setPersons(response.data)
    //   })
  }, [])

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const showNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 7000)
  }
  const showError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 7000)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const names = persons.map(person => person.name)
    const index = names.indexOf(newName)
    if (index >= 0) {
      if (!window.confirm(newName +
        ' on jo luettelossa. Korvataanko vanha numero uudella?')) {
        return
      }
      const id = persons[index].id
      personService
        .update(id, personObject)
        .then(returnedPerson => {
          console.log('returned person', returnedPerson);
          let newPersons = persons
          newPersons[index] = returnedPerson
          // setPersons(persons.filter(n => n.id !== id).concat(returnedPerson))
          setPersons(newPersons)
          showNotification('Korvattiin henkilö ' + newName
            + ' numero uudella numerolla ' + newNumber)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          showError(`Henkilö '${newName}' oli jo poistettu palvelimelta`)
          setPersons(persons.filter(n => n.id !== id))
          setNewName('')
          setNewNumber('')
        })
      return
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log('returned person', returnedPerson);
        setPersons(persons.concat(returnedPerson))
        showNotification('Lisättiin ' + newName)
        setNewName('')
        setNewNumber('')

      })
      .catch(error => {
        showError(error.response.data.error)
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id) => {
    return () => {
      const name = persons.filter(n => n.id === id)[0].name
      if (!window.confirm('Poistetaanko ' + name)) {
        return
      }
      console.log('remove person with id ', id)
      personService
        .remove(id)
        .then(returnedPerson => {
          console.log('person removed')
          showNotification(name + ' poistettiin')
          setPersons(persons.filter(n => n.id !== id))
        })
        .catch(error => {
          showError(`Henkilö '${name}' oli jo poistettu palvelimelta`)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <FilterForm handleFilterChange={handleFilterChange}
        newFilter={newFilter} />
      <AddNewPersonForm handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson} />
      <Persons
        persons={filteredPersons}
        removePerson={removePerson} />
    </div>
  )

}

export default App
