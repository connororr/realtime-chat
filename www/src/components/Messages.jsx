import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MessageBar from './MessageBar';
import Message from './Message';
import MessageBanner from './MessageBanner';

const MessageHolder = styled.div`
  width: 100%;
  height: calc(100vh - 175px);
  overflow-y: scroll;
  padding: 0 23px;
  margin-top: 51px;
`;

const Messages = props => {
  const [messages, setMessages] = useState([
    { message: 'testing', userId: '123412' },
  ]);

  const updateMessages = message => {
    setMessages(messages.concat([{ message }]));
  };

  useEffect(() => {
    const objDiv = document.getElementById('message-holder');
    objDiv.scrollTop = objDiv.scrollHeight;
  });

  return (
    <MessageHolder id="message-holder">
      <MessageBanner {...props} />
      {messages.map(message => (
        <Message
          message={message.message}
          yours={message.userId !== '123412'}
        />
      ))}
      <MessageBar setMessages={updateMessages} />
    </MessageHolder>
  );
};

export default Messages;
