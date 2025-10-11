import React from 'react'

const Persons = ({persons, handleDelete}) => {
  return (
    <div>
      {persons.length > 0 ? persons.map((person) => (
        <p key={person.name}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>Delete</button></p>
      )) : <p>No matches found</p>}
    </div>
  )
}

export default Persons
