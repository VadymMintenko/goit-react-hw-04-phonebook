import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { ListContacts, ListItem, DeleteButton } from './ContactsForm.styled';
export const ContactsList = ({ contacts, filter, onDeleteContact }) => {
  return (
    <>
      <ListContacts>
        {contacts
          .filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(element => {
            return (
              <ListItem key={nanoid()}>
                <p>{element.name}:</p>
                <p>{element.number}</p>
                <DeleteButton onClick={() => onDeleteContact(element.id)}>
                  delete contact
                </DeleteButton>
              </ListItem>
            );
          })}
      </ListContacts>
      <p></p>
    </>
  );
};

ContactsList.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,

  onDeleteContact: PropTypes.func.isRequired,
};
