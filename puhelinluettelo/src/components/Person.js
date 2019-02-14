import React from 'react'

const Person = ({ person, removePerson }) => {
    return (
        <div>
            {person.name} {person.number}
            <button onClick={removePerson}>poista</button>
        </div>
    )
}

export default Person