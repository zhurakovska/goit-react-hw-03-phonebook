import React from 'react';

import { nanoid } from 'nanoid';

import { FormData } from './Form/FormData';
import { Contacts } from './Form/Contacts';
import { Filter } from './Form/Filter';

import { Container, Title } from './Form/Form.styled';

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
    const contacts = JSON.parse(window.localStorage.getItem('CONTACTS'));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      console.log(this.state.contacts, '<');
      window.localStorage.setItem(
        'CONTACTS',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleAddContact = contact => {
    const contactExists = this.state.contacts.some(
      existingName =>
        existingName.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (contactExists) {
      alert(`${contact.name} is already exist`);
      return;
    }
    // тут мы передаем обьект контакт который представляет собой объект, который содержит информацию о новом контакте, который нужно добавить.
    const id = nanoid();
    console.log(contact, '<<');
    const prepareContact = {
      ...contact,
      id,
    };

    this.setState(prev => ({
      contacts: [...prev.contacts, prepareContact],
    }));
  };

  handleFilterChange = filterValue => {
    this.setState({ filter: filterValue });
    console.log(filterValue);
  };

  getfilteredContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleDeleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => {
        console.log(id);
        return contact.id !== id;
      }),
    }));
  };

  render() {
    const filteredContacts = this.getfilteredContacts();
    const { filter } = this.state;
    return (
      <Container>
        <Title>Phonebook</Title>
        <FormData onAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChangeValue={this.handleFilterChange} />
        <Contacts
          options={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </Container>
    );
  }
}
