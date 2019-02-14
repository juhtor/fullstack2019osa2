import React from 'react'
import Header from './Header'
import Person from './Person'

const Persons = ({ persons, removePerson }) => {
    return (
        <div>
            <Header title='Numerot' />
            {persons.map(person => <Person person={person}
                key={person.id}
                removePerson={removePerson(person.id)} />
            )}
        </div>
    )
}


export default Persons