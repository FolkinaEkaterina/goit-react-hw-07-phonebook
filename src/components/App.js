import { Toaster } from 'react-hot-toast';
import { Container, Title } from 'components/Phonebook.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectError, selectIsLoading } from 'redux/selector';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <Title>Phonebook</Title>
      {isLoading && !error && <b>Request in progress...</b>}
      <ContactForm />
      <Title>Contacts</Title>
      <Filter />
      <ContactList />
      <Toaster />
    </Container>
  );
};
