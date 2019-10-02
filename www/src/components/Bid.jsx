import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Bid = ({ initialBid }) => {
  const [bid, setBid] = useState('');

  return (
    <Wrapper>
      {initialBid}
      <input
        type="number"
        value={bid}
        min={initialBid}
        onChange={e => {
          setBid(e.target.value);
        }}
      />
    </Wrapper>
  );
};

export default Bid;
