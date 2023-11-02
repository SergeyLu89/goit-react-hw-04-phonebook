import { useState, useEffect } from 'react';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const sringifiedContacts = localStorage.getItem('contacts');
    return JSON.parse(sringifiedContacts) || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContactForm = userData => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === userData.name.toLowerCase()
    );
    if (isExist) {
      alert(`${userData.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, userData]);
  };

  const onAddFilterChange = filterData => {
    setFilter(filterData);
  };

  const filterElements = contacts => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDeleteBtnClick = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const filteredContacts = filterElements(contacts);
  return (
    <div className={css.section}>
      <h1>Phonebook</h1>
      <ContactForm onAddContactForm={onAddContactForm} />
      <h2>Contacts</h2>
      <Filter onAddFilterChange={onAddFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteBtnClick={onDeleteBtnClick}
      />
    </div>
  );
};
