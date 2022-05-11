import { useState, useEffect } from "react";
import React from "react";
import personService from "./services/persons";
// I changed later to inline styles instead .css file 
//import "./index.css";

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

const Notification = ({ message }) => {
  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };
  if (message.msgType === null) {
    return null;
  } else if (message.msgType === "success") {
    return <div style={success}>{message.msg}</div>;
  } else if (message.msgType === "error") {
    return <div style={error}>{message.msg}</div>;
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState({ msg: null, msgType: null });

  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData);
    });
  }, []);

  const removeItem = (id) => {
    const personToRemove = persons.find((person) => person.id === id);

    if (window.confirm("Do you really want to delete " + personToRemove.name)) {
      personService
        .remove(id)
        .then()
        .catch(() => {
          setMessage({
            msg: `Information of ${personToRemove.name} has already removed from server`,
            msgType: "error",
          });
        });

      //Reset persons and search results
      setPersons(persons.filter((person) => person.id !== id));
      setSearchResults([]);

      setTimeout(() => {
        setMessage({ msg: null, msgType: null });
      }, 5000);
    }
  };

  //Bloated function handling updating old and creating new
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

      personService.update(itemToEdit.id, editedItem).then((dataReturned) => {
        setPersons(
          persons.map((person) =>
            person.id !== itemToEdit.id ? person : dataReturned
          )
        );
        setMessage({
          msg: `${itemToEdit.name} phone number updated`,
          msgType: "success",
        });
      }).catch(() => {
        setMessage({
          msg: `Information of ${newName} has already removed from server`,
          msgType: "error",
        })
      });
    } else {
      //Create new
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(nameObject).then((dataReturned) => {
        setPersons(persons.concat(dataReturned));
        setMessage({
          msg: `${dataReturned.name} added to the phonebook`,
          msgType: "success",
        });
      })
      .catch(error => {
        console.log('the message: ' + `${error.response.data}`);
        setMessage({
          msg: `${error.response.data}`,
          msgType: "error"
        })
      });
    }

    //Reset fields and messages
    setTimeout(() => {
      setMessage({ msg: null, msgType: null });
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  //This throws error after person number is updated
  const handleSearchChange = (e) => {
    try {
      const foundPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value)
      );
      setSearchResults(foundPersons);
    } catch (error) {
      console.log("=== error App.js [165] === " + error);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleSearchChange} />
      <Notification message={message} />
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
