import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MessageBar from './MessageBar';
import Message from './Message';
import MessageBanner from './MessageBanner';
import Cookies from 'js-cookie';
import axios from 'axios';

const MessageHolder = styled.div`
  width: 100%;
  height: calc(100vh - 175px);
  overflow-y: scroll;
  padding: 0 23px;
  margin-top: 50px;
`;

const Messages = props => {
  const [messages, setMessages] = useState([]);
  const [conversationInfo, setConversationInfo] = useState({})


  useEffect(() => {
    if (props.conversation_id != null) { // don't send requests when on a temporary conversation
      var get_convo_interval = setInterval(function() {axios("http://13.238.42.177:3800/chat/conversation",{
        method: 'post',
        data: {
          session_token: localStorage.getItem('session'),
          conversation_id: props.conversation_id
        }, 
        headers: {"X-CSRFToken": Cookies.get('csrftoken')},
        withCredentials: true
      }).then(response => {
        setMessages(response.data['messages']);
        setConversationInfo(response.data['conversation'])
      })}, 1000)
    } else {
      setMessages([])
    }
    
    // position scrollbar
    const objDiv = document.getElementById('message-holder');
    objDiv.scrollTop = objDiv.scrollHeight;

    return () => {
      clearInterval(get_convo_interval)
    };
  }, [props.conversation_id]);

  return (
    <MessageHolder id="message-holder">
      <MessageBanner {...props} />
      {messages.map(message => (
        <Message
          message={message.message}
          yours={message.user_id !== conversationInfo['own_user_id']}
        />
      ))}
      <MessageBar
        other_user_id={props.other_user_id}
        setConversation={props.setConversation}
        conversation_id={props.conversation_id}
      />
    </MessageHolder>
  );
};

export default Messages;
