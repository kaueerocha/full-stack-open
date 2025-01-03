import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ( {handleSearchChange, searchName} ) => {
  return (
    <div>
        filter shown with 
        <input
          onChange={handleSearchChange}
          value={searchName}
        />
    </div>
  )
}

const PersonForm = ( {addContact, data} ) => {

  return (
    <form onSubmit={addContact}>
        <div>
          name:
          <input
            onChange={data.handleNameChange}
            value={data.newName}
          />
        </div>
        <div>
          number: 
          <input
            onChange={data.handleNumberChange}
            value={data.newNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ( {persons} ) => {
  return (
    persons.map((person) => (
      <Person key={person.name} person={person}/>
    ))
  )
}

const Person = ( {person} ) => {
  return (
    <p>
      {person.name} - {person.number}
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
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
      setSearchName('')
    }
  }

  const filteredPersons = persons.filter((person) => (
    person.name.toLowerCase().includes(searchName.toLowerCase())
  ))

  const addContactData = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange
  }

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        handleSearchChange={handleSearchChange} 
        value={searchName}
      />

      <h2>add a new</h2>
      <PersonForm
        addContact={addContact}
        data={addContactData}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App