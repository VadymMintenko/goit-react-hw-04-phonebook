import { ContactsList } from './ContactsList';
import { ContactsForm } from './ContactsForm';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import { Container, ContactsListSContainer } from './ContactsForm.styled';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    if (contacts.map(contact => contact.name).includes(newContact.name)) {
      alert(`Contact ${newContact.name} already exists.`);
      return;
    }
    setContacts([...contacts, newContact]);
    resetForm();
  };

  const searchContact = evt => {
    setFilter(evt.target.value.toLowerCase());
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));

    setFilter('');
  };

  return (
    <Container>
      <ContactsListSContainer>
        <ContactsForm handleSubmit={handleSubmit} />
        <ContactsList
          contacts={contacts}
          filter={filter}
          onDeleteContact={onDeleteContact}
        />

        <Filter filter={filter} searchContact={searchContact} />
      </ContactsListSContainer>
    </Container>
  );
};
