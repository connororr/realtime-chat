import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${props =>
    !props.yours
      ? `
    display: flex;
    justify-content: flex-end;
  `
      : ''}
`;

const Bubble = styled.div`
  border-radius: 20px;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: inline-block;
  word-wrap: anywhere;

  ${props =>
    props.yours
      ? `
    margin-right: 25%;
    background-color: #eee;
    position: relative;
  `
      : `
    color: white;
    margin-left: 25%;
    background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
        background-attachment: scroll;
    background-attachment: fixed;
    position: relative;
  `}
`;

const Message = ({ message, yours }) => (
  <Wrapper {...{ yours }}>
    <Bubble {...{ yours }}>{message}</Bubble>
  </Wrapper>
);

export default Message;
