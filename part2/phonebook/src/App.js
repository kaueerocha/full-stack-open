import { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ( {message} ) => {
  if(message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

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

const Persons = ( {persons, deleteContact} ) => {
  return (
    persons.map((person) => (
      <Person key={person.name} person={person} deleteContact={deleteContact}/>
    ))
  )
}

const Person = ( {person, deleteContact} ) => {
  return (
    <p>
      {person.name} - {person.number}
      <button onClick={() => deleteContact(person.id)}>delete</button>
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
    const person = persons.find((person) => person.name === newName)
    if(person) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number?`)) {
        personService.update(person.id, {...person, number: newNumber}).then((response) => {
          setErrorMessage(`${newName}'s number has been updated`)
        }).catch(error => {
          setErrorMessage(
            `Error adding ${newName}'`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 100)
          setPersons(persons.map((p) => p.id !== person.id ? p : {...person, number: newNumber}))
        })
      }
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService.create(nameObject).then((response) => {	
        setPersons(persons.concat(response))
        setSearchName('')
        setErrorMessage(`Added '${newName}'`)
      })
    }
  }

  const deleteContact = (id) => {
    const person = persons.find((person) => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then((response) => {
        setPersons(persons.filter((person) => person.id !== id))
      })
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
    personService.getAll().then((response) => {
      setPersons(response)
    })

  }, [persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Persons persons={filteredPersons} deleteContact={deleteContact}/>
    </div>
  )
}

export default App