import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1234' },
    { name: 'Ada Lovelace', number: '5678' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    if(persons.find((person) => person.name === newName)) {
      alert(`${newName} already added`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      const newPersons = persons.concat(nameObject)
      setPersons(newPersons)
    }
  }

  const filteredPersons = persons.filter((person) => (
    person.name.toLowerCase().includes(searchName.toLowerCase())
  ))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with 
        <input
          onChange={handleSearchChange}
          value={searchName}
        />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name:
          <input
            onChange={handleNameChange}
            value={newName}
          />
        </div>
        <div>
          number: 
          <input
            onChange={handleNumberChange}
            value={newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>{person.name} - {person.number} </p>
      ))}
    </div>
  )
}

export default App