import { useState, useEffect } from "react";
import React from "react";
import personService from "./services/persons";
import './index.css'

const Filter = ({ handleChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleChange} />
    </div>
  );
};

const Results = ({ searchResults, removeItem }) => {
  return (
    <div>
      {searchResults.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => removeItem(person.id)}>delete</button>
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

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const removeItem = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    if (window.confirm("Do you really want to delete " + personToRemove.name)) {
      personService.remove(id).then(() => {
        //More reliable solution would run axios.getAll again, but for this case like this
        setPersons(persons.filter((person) => person.id !== id));
        setSearchResults([]);
      });
    }
  };

  //function handles both name and number
  const addNewItem = (e) => {
    e.preventDefault();
    const namesOnly = persons.map((person) => person.name);
    const itemToEdit = persons.find((person) => person.name === newName);

    if (
      namesOnly.includes(newName) &&
      window.confirm(
        `${newName} is already in the phonebook, do you want to replace the old number with new one?`
      )
    ) {
      //Update existing
      const editedItem = { ...itemToEdit, number: newNumber };
      personService.update(itemToEdit.id, editedItem).then((itemReturned) => {
        setPersons(
          persons.map(
            (person) => (person.id !== itemToEdit.id ? person : itemReturned)
          )
        );
        setMessage(`${itemReturned.name} phone number updated`);
      });
    } else {
      //Create new
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(nameObject).then((returnedData) => {
        setPersons(persons.concat(returnedData));
        setMessage(`${returnedData.name} added to the phonebook`);
      });
      
    }
    setTimeout(() => {setMessage(null)}, 5000);
    //Reset fields
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchChange = (e) => {
    try {
      const foundPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value)
      );
      setSearchResults(foundPersons);
    } catch (error) {
      console.log("=== error App.js [105] === " + error);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleSearchChange} />
      <Notification message={message}/>
      <h3>add a new</h3>
      <PersonForm
        addNewItem={addNewItem}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Results searchResults={searchResults} removeItem={removeItem} />
    </div>
  );
};

export default App;
