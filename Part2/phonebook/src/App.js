import React, { useState, useEffect } from "react";

import FiltName from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personServis from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [filter, setFilter] = useState("");
  const [newNumber, setNumber] = useState("");
  const [message, setMessage] = useState(null)
  const [statusChange, setStatusChange] = useState(null)


  useEffect(() => {
    personServis.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);

  const handleDateChange = (setDate) => (event) => setDate(event.target.value);

  const handleNewPerson = (event) => {
    event.preventDefault();

    const personNew = { name: newName, number: newNumber };

    const updatNumber = persons.find((person) => person.name === newName);

    if (updatNumber) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personServis
          .update(updatNumber.id, personNew)
          .then((returnendPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatNumber.id ? person : returnendPerson
              )
            );
          }).catch(_error =>{
            setStatusChange('error')
            setMessage(`Information of ${updatNumber.name} has already been remove from server`)
            setTimeout(() => {
              setStatusChange(null)
              setMessage(null)
            }, 5000) 
            setPersons(persons.filter(person => person.id !== updatNumber.id))  
          })          
      }
    } else {
      personServis.create(personNew).then((returnAddPerson) => {
        setPersons(persons.concat(returnAddPerson));
       
        setStatusChange('success')
        setStatusChange( `Added  ${returnAddPerson.name}`
        )
        setTimeout(() => {
          setStatusChange(null)
          setMessage(null)
        }, 5000) 

        setNewName("");
        setNumber("");
      });
    }
  };

  const handleDelPerson = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log();
      personServis.remove(id).then(() => {
        setPersons(persons.filter((person) => person.name !== name));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} statusChange={statusChange}/>
      <FiltName lookfor={filter} setLookfor={handleDateChange(setFilter)} />
      <br />
      <h2>Add a new</h2>
      <Form
        name={newName}
        number={newNumber}
        handleName={handleDateChange(setNewName)}
        handleNumber={handleDateChange(setNumber)}
        handlePerson={handleNewPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDelPerson={handleDelPerson}
      />
    </div>
  );
};

export default App;
