import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiMapPin, FiChevronDown } from 'react-icons/fi';
import { locationFilter } from '../helper/filters';
import { navigate } from '@reach/router';

const FormHolder = styled.div`
  max-width: 700px;
  width: 100%;
  height: 70px;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  margin-top: 81px;
  margin-bottom: 140px;
  background: #ffffff;
  box-shadow: 0px 6px 55px -31px #000;
  justify-content: space-between;
  align-items: center;

  & > div {
    position: relative;
    width: 170px;
    height: 100%;
    padding-left: 40px;
  }

  & svg {
    color: #494a53;
    position: absolute;
    left: 14px;
    z-index: 9;
    top: 27px;
    pointer-events: none;
  }
`;

const SearchBox = styled.input`
  font-size: 13px;
  color: #494a53;
  border: 0;
  width: 100%;
  height: 100%;
`;

const selectStyles = `
  appearance: none;
  line-height: normal;
  position: relative;
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  font-size: 13px;
  border-radius: 0;
  border: 0;
  cursor: pointer;
`;

const SelectLocation = styled(locationFilter)`
  ${selectStyles}
`;

const FindBtn = styled.button`
  border: 0;
  background: #473fdf;
  height: 44px;
  color: #fff;
  width: 115px;
  font-weight: 500;
  font-size: 11px;
  cursor: pointer;
  padding: 0;
  border-radius: 4px;
  margin-right: 12px;
`;

const search = (category, location) => {
  if (category !== '' && location !== '') {
    navigate(`/search?type=${category}&state=${location}`);
  }
};

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  return (
    <FormHolder {...props}>
      <div>
        <FiSearch />
        <SearchBox
          type="text"
          placeholder="Project or keyword"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div>
        <FiMapPin />
        <SelectLocation
          onChange={e => {
            setLocation(e.target.value);
          }}
          id="select2"
        />
        <FiChevronDown style={{ left: 'unset', right: 14 }} />
      </div>
      <FindBtn
        onClick={() => {
          search(searchTerm, location);
        }}
      >
        Search
      </FindBtn>
    </FormHolder>
  );
};

export default SearchBar;
