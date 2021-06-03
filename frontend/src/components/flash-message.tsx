import React from 'react';
import { Message } from 'semantic-ui-react';

// @ts-ignore
export const FlashMessage = ({ message }) => {
  return (
    <Message
      positive={message.type === 'success'}
      negative={message.type === 'fail'}
      header={message.title}
      content={message.content}
    />
  );
}

export const flashErrorMessage = (dispatch: (arg0: { type: string; payload: { type: string; title: any; content: any; }; }) => void, error: { response: { data: any; }; }) => {
  const err = error.response ? error.response.data : error; // check if server or network error
  dispatch({
    type: 'FLASH_MESSAGE',
    payload: {
      type: 'fail',
      title: err.name,
      content: err.message,
    },
  });
}
