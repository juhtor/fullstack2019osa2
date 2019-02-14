import React from 'react'
import Header from './Header'
import Person from './Person'

const Persons = ({ persons }) => {
    return (
        <div>
            <Header title='Numerot' />
            {persons.map(person => <Person person={person}
                key={person.name + person.number} />
            )}
        </div>
    )
}


export default Persons