import { useState, useEffect } from 'react';
import css from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

const DefaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },]
    
  const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  },[key, state])

  return [state, setState]
}

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [...DefaultContacts])
  const [filter, setFilter] = useState('')
 
 
 
  const addName = ({ name, number }) => {
    const names = contacts.map(contact => contact.name);
    if (names.indexOf(name) >= 0) {
      alert(name + ' is already in contacts');
      return;
    }
    setContacts(prevContacts => [
      { name, number, id: nanoid() },
      ...prevContacts,
    ]);
  };
    const removeName = idx => {
      setContacts(prevContacts => {
        let newContacts = [];
        prevContacts.forEach(contact => {
          if (contact.id !== idx) {
            newContacts.push(contact);
          }
        });
        return newContacts;
      });
    };
    const handleFilter = e => {
      setFilter(e.currentTarget.value);
    };
    const getVisibleContacts = () => {
      const normalizedFilter = filter.toLowerCase();
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    };
  
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addName} />

        <h2>Contacts</h2>
        <Filter onChange={handleFilter} value={filter} />
        <ContactList
          contacts={getVisibleContacts()}
          onRemove={removeName}
        />
      </div>
    );
  }



export default App;
