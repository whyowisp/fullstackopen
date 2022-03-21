import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  //function handles both name and number
  const addNewItem = (e) => {
    e.preventDefault();

    const namesOnly = persons.map((person) => person.name);
    if (namesOnly.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  };

  return (
    <div>
      <h2>Phonebook</h2>
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

      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={person.name}>{person.name} {person.number}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
