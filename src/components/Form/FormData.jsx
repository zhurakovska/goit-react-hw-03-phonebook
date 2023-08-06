import React from 'react';
import PropTypes from 'prop-types';

import { Form, Label, Input, Button } from './Form.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class FormData extends React.Component {
  state = INITIAL_STATE;

  handleSubmit = e => {
    const { name, number } = this.state;
    e.preventDefault();
    this.props.onAddContact({
      // тут мы получаем наш contact деструтуризируем
      // тут мы передаем значения name и number(которое записали в инпуте) при сабмите мы прокидываем это в contact
      name,
      number,
    });

    this.setState(INITIAL_STATE);
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <Form action="" onSubmit={this.handleSubmit}>
          <Label htmlFor="">
            Name:
            <Input
              onChange={this.handleInputChange}
              value={name}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </Label>
          <Label htmlFor="">
            Number:
            <Input
              onChange={this.handleInputChange}
              value={number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </Label>
          <Button>Add contact</Button>
        </Form>
      </>
    );
  }
}

FormData.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
