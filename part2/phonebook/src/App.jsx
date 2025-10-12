import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filteredPerson = persons.filter((person) =>
    person.name?.toLowerCase().includes(newFilter.toLowerCase())
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = { name: newName, number: newNumber };
    let exists = false;
    persons.forEach((person) => {
      if (person.name === newName || person.number === newNumber) {
        exists = true;
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace phone number with a new one?`
          )
        ) {
          personsService
            .update(person.id, personObject)
            .then((returnedPerson) => {
              setPersons(
                persons.map((p) => (p.id !== person.id ? p : returnedPerson))
              );
              setNewName("");
              setNewNumber("");
              setNotification(`Updated ${returnedPerson.name}`);
              setTimeout(() => {
                setNotification(null);
              }, 5000);
            });
        }
      }
    });
    if (exists === false) {
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotification(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.dlt(id)
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setPersons(persons.filter((persons) => persons.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={newFilter}
        onChange={(e) => setNewFilter(e.target.value)}
      />
      <h3>add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />
      <Notification message={notification} />
      <Error message={errorMessage} />
      <h2>Numbers</h2>
      <Persons persons={filteredPerson} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
