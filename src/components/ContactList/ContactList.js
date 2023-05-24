import PropTypes from 'prop-types';
import { List, Item, Btn } from 'components/Phonebook.styled';
import { deleteContact } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selector';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(selectVisibleContacts);

  return (
    <List>
      {contacts.map(({ id, name, phone }) => {
        return (
          <Item key={id} id={id}>
            {name}: {phone}
            <Btn type="button" onClick={() => dispatch(deleteContact(id))}>
              Delete
            </Btn>
          </Item>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};
