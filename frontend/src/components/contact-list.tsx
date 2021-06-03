import React from 'react';
import { Card } from 'semantic-ui-react';
import ContactCard from './contact-card';

// @ts-ignore
const ContactList = ({ contacts }) => {
  const cards = () => {
    return contacts.map((contact: { _id: React.Key | null | undefined; }) => {
      return <ContactCard key={contact._id} contact={contact} />;
    });
  };

  return <Card.Group>{cards()}</Card.Group>;
}

export default ContactList;
