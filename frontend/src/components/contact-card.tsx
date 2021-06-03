import React from 'react';
import  axios  from  'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from 'semantic-ui-react';
import  { ContactContext }  from '../context/contact-context';
import  { flashErrorMessage }  from './flash-message';

const  { useContext }  =  React;

// @ts-ignore
const ContactCard = ({ contact }) => {
  console.log("contact",contact);
  // eslint-disable-next-line no-unused-vars
  // @ts-ignore
  const [state, dispatch] = useContext(ContactContext);

  const deleteContact = async (id: any) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/aaa/${id}`,
      );
      dispatch({
        type: 'DELETE_CONTACT',
        payload: response.data,
      });
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name="user outline" /> {contact.firstName} {contact.lastName}
        </Card.Header>
        <Card.Description>
          <p>
            <Icon name="phone" /> {contact.phone}
          </p>
          <p>
            <Icon name="mail outline" /> {contact.email}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button
            basic
            color="green"
            as={Link}
            to={`/aaa/edit/${contact._id}`}
          >
            Edit
          </Button>
          <Button basic color="red" onClick={() => deleteContact(contact._id)}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

export default ContactCard;
