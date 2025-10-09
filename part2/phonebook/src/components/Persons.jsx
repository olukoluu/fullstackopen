import React from 'react'

const Persons = ({persons}) => {
  return (
    <div>
      {persons.length > 0 ? persons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      )) : <p>No matches found</p>}
    </div>
  )
}

export default Persons
