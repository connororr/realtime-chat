import React from 'react';
import styled from 'styled-components';
import { FaInfoCircle, FaUserCircle } from 'react-icons/fa';
import { Link } from '@reach/router';

const Wrapper = styled.div`
  border-bottom: 1px solid #ececec;

  width: calc(100vw - 300px);
  height: 50px;

  position: fixed;
  top: 72px;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  overflow: hidden;
  border-radius: 6px;
  margin-left: 15px;
`;

const Info = styled.p`
  margin: 0;
  font-weight: 600;
  margin-left: 15px;
  color: #444;
`;

const Icon = styled.div`
  margin-right: 15px;
  font-size: 26px;
  height: 26px;
  color: #4f4f4f;
  cursor: pointer;
`;

const MessageBanner = ({ image, business, name }) => (
  <Wrapper>
    <InfoWrapper>
      <Avatar src={image} alt="profile image" />
      <Info>
        {name}
        {business ? ` (${business})` : ''}
      </Info>
    </InfoWrapper>
    <InfoWrapper>
      <Link to={`/project/string`}>
        <Icon>
          <FaInfoCircle />
        </Icon>
      </Link>
      <Link to={`/profile`}>
        <Icon>
          <FaUserCircle />
        </Icon>
      </Link>
    </InfoWrapper>
  </Wrapper>
);

export default MessageBanner;
