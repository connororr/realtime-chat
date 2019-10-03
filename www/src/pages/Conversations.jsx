import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ConversationCard from '../components/ConversationCard';
import axios from 'axios';

const Wrapper = styled.div`
  height: calc(100vh - 72px);
`;

const ConversationHolder = styled.div`
  width: 300px;
  height: 100%;
  background: #f6f9ff;
`;

const Conversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3800/chat/getall').then(response => {
      setConversations(response.data);
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
    </Wrapper>
  );
};

export default Conversations;
