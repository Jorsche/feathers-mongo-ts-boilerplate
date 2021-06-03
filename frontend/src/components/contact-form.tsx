import React, { useContext, useState } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ContactContext } from '../context/contact-context';
import { flashErrorMessage } from './flash-message';

// @ts-ignore
const ContactForm = ({contact}) => {
  // @ts-ignore
  const [state, dispatch] = useContext(ContactContext);
  const [redirect, setRedirect] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({});
  console.log("currentUserData",currentUserData);
  const setUserData=(userData: any)=>{
    if(currentUserData){
      //maybe ---> wrong
      const finalData = {...currentUserData,...userData};
      setCurrentUserData(finalData);
    }
  };

  const createContact = async (currentUserData: any) => {
    console.log("in create contact",currentUserData);
    try {
      const response = await axios.post('http://localhost:3030/aaa', currentUserData);
      console.log("response.data",response.data);
      dispatch({
        type: 'CREATE_CONTACT',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const updateContact = async (data: any) => {
    try {
      const response = await axios.patch(
        `http://localhost:3030/aaa/${contact._id}`,
        data,
      );
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: response.data,
      });
      setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const handleFormSubmit = async (data: any) => {
    console.log("contact._id",contact._id);
    console.log("data On submit",data);
    if (contact._id) {
      await updateContact(data);
    } else {
      await createContact(data);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }


  // @ts-ignore
  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <h1 style={{ marginTop: "1em" }}>
          {contact._id ? "Edit Contact" : "Add New Contact"}
        </h1>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="name.first">
                First Name
                <input
                  id="name.first"
                  name="name.first"
                  type="text"
                  placeholder="First Name"
                  onChange={(event)=>{
                    setUserData({["firstName"]:event.target.value})
                  }}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label htmlFor="name.last">
                Last Name
                <input
                  id="name.last"
                  name="name.last"
                  type="text"
                  placeholder="Last Name"
                  onChange={(event)=>{
                    setUserData({["lastName"]:event.target.value})
                  }}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label htmlFor="phone">
              Phone
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Phone"
                onChange={(event)=>{
                  setUserData({["phone"]:event.target.value})
                }}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={(event)=>{
                  setUserData({["email"]:event.target.value})
                }}
              />
            </label>
          </Form.Field>
          <Button primary
                  type="submit"
                  onClick={()=>{handleFormSubmit(currentUserData)}}
          >
            Save
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default ContactForm;
