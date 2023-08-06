import React from 'react';
import PropTypes from 'prop-types';

import { ContactList, ContactItem, DeleteButton } from './Form.styled';

export const Contacts = ({ options, onDeleteContact }) => {
  return (
    <ContactList>
      {options.map(({ id, name, number }) => (
        <ContactItem key={id}>
          {name} {number}
          <DeleteButton onClick={() => onDeleteContact(id)}>
            Delete
          </DeleteButton>
        </ContactItem>
      ))}
    </ContactList>
  );
};

Contacts.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};
