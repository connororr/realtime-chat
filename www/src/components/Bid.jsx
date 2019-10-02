import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #f6f9ff;
  border-radius: 8px;
  max-width: max-content;
  width: calc(100% - 20px);
  padding: 10px;
  margin: 15px 0;
  box-shadow: 0px 1px 6px -5px #000;
`;


const CurrencyInput = styled.span`
  border: 1px inset #ccc;
  background: #ffffff;
  padding-left: 10px;
  flex: 1;
  
  & > input {
    border: 0;
    font-size: 15px;
    line-height: 31px;
    width: 92%;
  }
`;

const CurrentBid = styled.div`
  display: block;
  width: 100%;
  padding-bottom: 10px;
`;

const PlaceBidWrapper = styled.div`
  width:100%;
  display: flex;
`;

const PlaceBidButton = styled.button`
  margin-left: 10px;
  background-color: #f0932b;
  font-size: 14.4px;
  font-weight: 400;
  letter-spacing: 1.5px;
  line-height: 21.6px;
  color: #ffffff;
  border: 0;
  border-radius: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  
  &:hover {
    opacity: 0.8;
  }
  
  cursor: pointer;
`;


const Bid = ({ initialBid }) => {
  const [bid, setBid] = useState('');

  return (
    <Wrapper>
      <CurrentBid>Current bid: ${initialBid}</CurrentBid>
      <PlaceBidWrapper>
        <CurrencyInput>$
        <input
          type="number"
          value={bid}
          min={initialBid}
          onChange={e => {
            setBid(e.target.value);
          }}
        />
        </CurrencyInput>
        <PlaceBidButton>Place Bid</PlaceBidButton>
      </PlaceBidWrapper>
    </Wrapper>
  );
};

export default Bid;
