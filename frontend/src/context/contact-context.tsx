import React, { useReducer, createContext } from 'react';

// @ts-ignore
export const ContactContext = createContext();

const initialState = {
  contacts: [],
  contact: {}, // selected or new
  message: {}, // { type: 'success|fail', title:'Info|Error' content:'lorem ipsum'}
};

function reducer(state: { contacts: any[]; }, action: { type: any; payload: { _id: any; email: any; }; }) {
  switch (action.type) {
    case 'CREATE_CONTACT': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New Contact created!',
        },
      };
    }
    case 'FETCH_CONTACTS': {
      return {
        ...state,
        contacts: action.payload,
      };
    }
    case 'FETCH_CONTACT': {
      return {
        ...state,
        contact: action.payload,
      };
    }
    case 'UPDATE_CONTACT': {
      const contact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map(item =>
          item._id === contact._id ? contact : item,
        ),
        message: {
          type: 'success',
          title: 'Update Successful',
          content: `Contact "${contact.email}" has been updated!`,
        },
      };
    }
    case 'DELETE_CONTACT': {
      const { _id, email } = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter(item => item._id !== _id),
        message: {
          type: 'success',
          title: 'Delete Successful',
          content: `Contact "${email}" has been deleted!`,
        },
      };
    }
    case 'FLASH_MESSAGE': {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      throw new Error();
  }
}

export const ContactContextProvider = (props: { children: any; }) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <ContactContext.Provider value={[state, dispatch]}>
      {children}
    </ContactContext.Provider>
  );
};
