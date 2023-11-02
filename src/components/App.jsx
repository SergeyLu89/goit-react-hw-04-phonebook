import React from 'react';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const sringifiedContacts = localStorage.getItem('contacts');
    if (sringifiedContacts) {
      this.setState({ contacts: JSON.parse(sringifiedContacts) });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContactForm = userData => {
    const isExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === userData.name.toLowerCase()
    );
    if (isExist) {
      alert(`${userData.name} is already in contacts`);
      return;
    }
    this.setState({ contacts: [...this.state.contacts, userData] });
  };

  onAddFilterChange = filterData => {
    this.setState({ filter: filterData });
  };

  filterElements = contacts => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  onDeleteBtnClick = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { contacts } = this.state;
    const filteredContacts = this.filterElements(contacts);
    return (
      <div className={css.section}>
        <h1>Phonebook</h1>
        <ContactForm onAddContactForm={this.onAddContactForm} />
        <h2>Contacts</h2>
        <Filter onAddFilterChange={this.onAddFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteBtnClick={this.onDeleteBtnClick}
        />
      </div>
    );
  }
}
