import React from 'react'


const Header = ({ title }) => {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}

const Content = ({ parts }) => {
    return (

        <div>
            {parts.map(part =>
                <Part part={part} key={part.id} />)
            }
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => {
        console.log('what is happening', s, p)
        return s + p.exercises
    }, 0)
    return (
        <div>
            <p>yhteensä {total} tehtävää</p>
        </div>
    )
}
const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course 