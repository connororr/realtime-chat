import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConversationCard from '../components/ConversationCard';
import axios from 'axios';
import Messages from '../components/Messages';

const Wrapper = styled.div`
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

  useEffect(() => {
    axios.get('http://13.238.42.177:3800/chat/getall').then(response => {
      setConversations(response.data);
      setSelectedConversation(0);
    });
  }, []);

  return (
    <Wrapper>
      <ConversationHolder>
        {conversations.map((conversation, i) => (
          <ConversationCard
            key={i}
            img={conversation['profile_picture']}
            name={conversation['user_name']}
            business={conversation['business_name']}
            message={conversation['last_message'].message}
            date={conversation['last_message']['time_sent']}
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
      />
    </Wrapper>
  );
};

export default Conversations;
