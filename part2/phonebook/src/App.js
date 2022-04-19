import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios'

const Filter = ({ handleChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleChange} />
    </div>
  );
};

const Results = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const PersonForm = ({
  addNewItem,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addNewItem}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  /*
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);*/
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  }, [])

  //function handles both name and number
  const addNewItem = (e) => {
    e.preventDefault();

    const namesOnly = persons.map((person) => person.name);
    if (namesOnly.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    //setSearchTerm(e.target.value);

    const foundPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(e.target.value)
    );
    setSearchResults(foundPersons);
  };
  //addNewItem, newName, newNumber, handleNameChange, handleNumberChange
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        addNewItem={addNewItem}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Results searchResults={searchResults} />
    </div>
  );
};

export default App;
