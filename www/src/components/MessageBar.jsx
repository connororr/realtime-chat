import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegPaperPlane } from 'react-icons/fa';

const OuterWrapper = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  width: calc(100vw - 300px);
  height: 55px;

  position: fixed;
  bottom: 0;
  right: 0;

  background: #fff;
`;

const InnerWrapper = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  width: calc(100% - 60px);
  margin: 10px 30px;
  height: 35px;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: 0;
  font-size: 14px;
  line-height: 32px;
  background: transparent;
  padding: 0 16px;
  flex: 1;
`;

const SendIcon = styled(FaRegPaperPlane)`
  padding: 0 10px;
  font-size: 19px;
  color: #444;
`;

const Button = styled.button`
  padding: 0;
  margin: 0;
  cursor: pointer;
  border: 0;
  background: 0;
`;

const MessageBar = ({ setMessages }) => {
  const [message, setMessage] = useState('');

  return (
    <OuterWrapper>
      <Wrapper>
        <InnerWrapper>
          <Form
            onSubmit={e => {
              e.preventDefault();
              if(message.split(' ').join('').length > 0) {
                setMessages(message);
                setMessage('');
              }
            }}
          >
            <Input
              value={message}
              onChange={e => {
                setMessage(e.target.value);
              }}
              placeholder="Send message..."
            />
            <Button type="submit" value="Submit">
              <SendIcon />
            </Button>
          </Form>
        </InnerWrapper>
      </Wrapper>
    </OuterWrapper>
  );
};

export default MessageBar;
