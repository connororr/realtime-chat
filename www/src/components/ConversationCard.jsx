import React from 'react';
import styled from 'styled-components';
import TimeAgo from 'react-timeago/lib/index';

const CardWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  display: flex;
`;

const Avatar = styled.img`
  width: 55px;
  height: 55px;
  overflow: hidden;
  border-radius: 50%;
  padding: 10px;
`;

const Info = styled.div`
  width: 225px;
  display: flex;
  flex-wrap: wrap;

  & > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Name = styled.h5`
  margin: 0;
  font-weight: 600;
  color: #333;
  font-size: 15px;
  line-height: 15px;
  margin-top: 10px;
`;

const Time = styled(TimeAgo)`
  font-size: 13px;
  line-height: 13px;
  font-weight: 400;
  color: #999;
  margin-top: -9px;
  height: max-content;
`

const Message = styled.p`
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  margin: 0;
  color: #777;
  margin-top: -6px;
`;

const ConversationCard = ({ img, key, name, business, message, date }) => (
  <CardWrapper key={key}>
    <Avatar src={img} alt="profile image" />
    <Info>
      <Name>
        {name}
        {business ? ` (${business})` : ''}
      </Name>
      <Message>{message}</Message>
      <Time date={new Date(date)} />
    </Info>
  </CardWrapper>
);

export default ConversationCard;
