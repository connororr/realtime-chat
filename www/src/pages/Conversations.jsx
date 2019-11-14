import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConversationCard from '../components/ConversationCard';
import axios from 'axios';
import Messages from '../components/Messages';
import Cookies from 'js-cookie';

const Wrapper = styled.div`
  margin-top: 72px;
  height: calc(100vh - 72px);
  display: flex;
`;

const ConversationHolder = styled.div`
  width: 300px;
  height: 100%;
  background: #f6f9ff;
`;



const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const SetConversation = i => {
    setSelectedConversation(i);
  }

  useEffect(() => {
    var get_convo_interval = setInterval(function() {axios("http://13.238.42.177:3800/chat/getall",{
      method: 'post',
      data: {
        session_token: localStorage.getItem('session')
      }, 
      headers: {"X-CSRFToken": Cookies.get('csrftoken')},
      withCredentials: true
    }).then(response => {
      setConversations(response.data);
    })}, 1000)
    
    return () => {
      clearInterval(get_convo_interval)
    };
  }, []);

  return (
    <Wrapper>
      <ConversationHolder>
        {conversations.map((conversation, i) => (
          <ConversationCard
            key={i}
            card_id={i}
            img={conversation['profile_picture']}
            name={conversation['user_name']}
            business={conversation['business_name']}
            message={conversation['last_message'].message}
            date={conversation['last_message']['time_sent']}
            other_user_id={conversation['other_user_id']}
            setConversation={SetConversation}
          />
        ))}
      </ConversationHolder>
      <Messages
        image={
          selectedConversation !== null
            ? conversations[selectedConversation]['profile_picture']
            : null
        }
        name={
          selectedConversation !== null
            ? conversations[selectedConversation]['user_name']
            : null
        }
        business={
          selectedConversation !== null
            ? conversations[selectedConversation]['business_name']
            : null
        }
        conversation_id={
          selectedConversation !== null
            ? conversations[selectedConversation]['conversation_id']
            : null
        }
        job_link={
          selectedConversation !== null
            ? conversations[selectedConversation]['job_link']
            : null
        }
        other_user_id={
          selectedConversation !== null
            ? conversations[selectedConversation]['other_user_id']
            : null
        }
      />
    </Wrapper>
  );
};

export default Conversations;
