import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Form, InputStyled, Label, Btn } from 'components/Phonebook.styled';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selector';
import { nanoid } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' ? setName(value) : setPhone(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = { name, phone, id: nanoid() };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.error(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.phone === phone)) {
      toast.error(`${phone} is already in contacts.`);
    } else {
      dispatch(addContact(newContact));
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={name}>
        Name
        <InputStyled
          id={name}
          type="text"
          name="name"
          value={name}
          placeholder="Enter contact name"
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label htmlFor={phone}>
        Number
        <InputStyled
          id={phone}
          type="tel"
          name="phone"
          value={phone}
          placeholder="Enter contact number"
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Btn type="submit">Add contact</Btn>
    </Form>
  );
};
