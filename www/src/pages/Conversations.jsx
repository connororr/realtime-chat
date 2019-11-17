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

    // check for temp convo
    if (localStorage.getItem('business_name') != null) {
      var temp_conversation = {
        "business_name": localStorage.getItem('business_name'),
        "profile_picture": localStorage.getItem('profile_picture'),
        "conversation_id": null,
        "last_message": {
          "user_id": null,
          "message": '',
          "time_sent": null
        },
        "other_user_id": localStorage.getItem('other_user_id'),
        "job_link": localStorage.getItem('business_link'),
        "user_name": localStorage.getItem('user_name')
      }
    }
    
    // interval requests
    var get_convo_interval = setInterval(function() {
      axios("http://13.238.42.177:3800/chat/getall",{
      method: 'post',
      data: {
        session_token: localStorage.getItem('session')
      }, 
      headers: {"X-CSRFToken": Cookies.get('csrftoken')},
      withCredentials: true
    }).then(response => {
      // checks if there is temp data
      if (localStorage.getItem('business_name') != null) {
        setConversations(response.data.concat(temp_conversation));
      } else {
        setConversations(response.data);
      }
    })}, 1000)
    
    return () => {
      clearInterval(get_convo_interval)

      // clear temp info
      localStorage.removeItem('business_name')
      localStorage.removeItem('profile_picture')
      localStorage.removeItem('other_user_id')
      localStorage.removeItem('user_name')
      localStorage.removeItem('job_link')
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
        setSelectedConversation={setSelectedConversation}
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
