import React, { useState } from 'react';
import styled from 'styled-components';
import { jobFilter, locationFilter } from '../helper/filters';

const Wrapper = styled.div`
  width: 204px;
  height: calc(100vh - 72px);
  background: #f6f9ff;
  float: left;
`;

const Title = styled.h3`
  color: #333;
  width: 100%;
  text-align: left;
  margin: 21px 20px;
  font-size: 1.3rem;
  font-weight: 500;
`;

const selectStyles = `
  appearance: none;
  line-height: normal;
  position: relative;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDA1LjQ1NiA0MDUuNDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MDUuNDU2IDQwNS40NTY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4NCjxnPg0KCTxwYXRoIGQ9Ik03NC4xMzQsNjQuMTQ3Yy00Ljk4NSwwLjA3OC05LjkxMSwyLjE2My0xMy40MzgsNS42ODhsLTU1LDU1QzIuMDk2LDEyOC40MzIsMCwxMzMuNDkyLDAsMTM4LjU4MyAgIHMyLjA5NiwxMC4xNTEsNS42OTcsMTMuNzVsMTgzLjI4MSwxODMuMjgxYzMuNTk5LDMuNjAxLDguNjU5LDUuNjk3LDEzLjc1LDUuNjk3czEwLjE1MS0yLjA5NiwxMy43NS01LjY5N2wxODMuMjgxLTE4My4yODEgICBjMy42MDEtMy41OTksNS42OTctOC42NTksNS42OTctMTMuNzVzLTIuMDk2LTEwLjE1MS01LjY5Ny0xMy43NWwtNTUtNTVjLTMuNTk4LTMuNTkxLTguNjUxLTUuNjgxLTEzLjczNC01LjY4MSAgIGMtNS4wODMsMC0xMC4xMzYsMi4wOS0xMy43MzQsNS42ODFMMjAyLjcyOCwxODQuMzk3TDg4LjE2Niw2OS44MzNDODQuNDk5LDY2LjE2OSw3OS4zMTgsNjQuMDcsNzQuMTM0LDY0LjE0N0w3NC4xMzQsNjQuMTQ3eiIgZmlsbD0iIzk2OTY5NiIvPg0KPC9nPg0KPC9zdmc+DQo=);
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  width: 170px;
  height: 40px;
  border: 1px solid #e6e6e6;
  font-size: 13px;
  text-align: left;
  padding-right: 15px;
  display: block;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 14px;
  padding-left: 10px;
`;

const SelectJob = styled(jobFilter)`
  ${selectStyles}
`;

const SelectLocation = styled(locationFilter)`
  ${selectStyles}
`;

const SearchInput = styled.input`
  width: 150px;
  height: 40px;
  border: 1px solid #e6e6e6;
  font-size: 13px;
  text-align: left;
  display: block;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 14px;
  padding: 0 10px;
`;

const Button = styled.button`
  background-color: #f0932b;
  width: 170px;
  height: 40px;
  font-size: 13px;
  text-align: center;
  display: block;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 14px;
  color: #ffffff;
  border: 0;
  font-weight: 500;
  box-shadow: 1px 2px 5px -4px #0000005c;
  cursor: pointer;
`;

const Filters = () => {
  const [searchTerms, setSearchTerms] = useState('');

  return (
    <Wrapper>
      <Title>Filters</Title>
      <SearchInput
        placeholder="Search.."
        value={searchTerms}
        onChange={e => {
          setSearchTerms(e.target.value);
        }}
      />
      <SelectJob />
      <SelectLocation />
      <Button>Apply</Button>
    </Wrapper>
  );
};

export default Filters;
