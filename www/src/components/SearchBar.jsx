import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiMapPin, FiChevronDown, FiSliders } from 'react-icons/fi';
import { jobFilter, locationFilter, OrderFilter, typeFilter, statusFilter } from '../helper/filters';
import { navigate } from '@reach/router';
import {style} from "typestyle";

const FormHolder = styled.div`
  max-width: 700px;
  width: 100%;
  height: 70px;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  margin-top: 81px;
  background: #ffffff;
  box-shadow: 0px 6px 55px -31px #000;
  justify-content: space-between;
  align-items: center;


  & > div {
    position: relative;
    width: 200px;
    height: 100%;
    padding-left: 40px;
    
  }

  & svg {
    color: #494a53;
    position: absolute;
    left: 14px;
    z-index: 9;
    top: 27px;
    background: #ffffff;

    pointer-events: none;
  }
`;

const searchContainer  = {
  'max-width': '700px',
};
const advSearchBox  = {
  display: 'flex',
  'margin-top': '5px',
  'max-width': '700px',
  'border-radius':'4px',
  'background-color':'#ffffff',
   height:'50px',
  'box-shadow': '0px 6px 55px -30px #000',
  'justify-content': 'space-between',
  'align-items': 'center',
};

const advSearchButton  = style({
  'background-color':'transparent',
  border:'none',
  'margin-top':'5px',
  'margin-left':'5px',
  'font-size': '20px',
  $nest: {
    '&:hover': {
      'cursor':'pointer'
    },
    '&:focus': {
      'outline':'none'
    }
  }
});


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
  background: #ffffff;
  font-size: 13px;
  border-radius: 0;
  border: 0;
  cursor: pointer;
`;
const advStyles = `
  line-height: normal;
  position: relative;
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  width: 30%;
  height: 100%;
  background: #ffffff;
  font-size: 13px;
  border-radius: 0;
  border: 0;
  cursor: pointer;
`;
const advStylesSmall = `
  line-height: normal;
  position: relative;
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
  background-repeat: no-repeat;
  width: 18%;
  height: 100%;
  background: #ffffff;
  font-size: 13px;
  border-radius: 0;
  border: 0;
  cursor: pointer;
`;

const SelectLocation = styled(locationFilter)`
  ${selectStyles}
`;
const SelectCategory = styled(jobFilter)`
  ${advStyles}
`;
const SelectType = styled(typeFilter)`
  ${advStylesSmall}
`;
const SelectStatus = styled(statusFilter)`
  ${advStylesSmall}
`;
const SelectOrder = styled(OrderFilter)`
  ${advStylesSmall}
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

const search = (category, location, params) => {
    navigate(`/search`,{state:{passParams:params}});
};

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [order, setOrder] = useState('Relevance');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);
  const [pageAmount, setPageAmount] = useState(20);
  const [pageNumber, setPageNumber] = useState(0);
  const [showAdv, setShowAdv] = useState(false);

  return (
    <div style={searchContainer}>
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
            search(searchTerm, location,[searchTerm,category,type,status,order,location,minPrice,maxPrice,"",pageAmount,pageNumber]);
        }}
      >
        Search
      </FindBtn>
    </FormHolder>
    {showAdv && <div style={advSearchBox}>
      <SelectCategory
          onChange={e => {
            setCategory(e.target.value);
          }}
          id="select2"
      />
      <SelectType
          onChange={e => {
            setType(e.target.value);
          }}
          id="select2"
      />
      <SelectStatus
          onChange={e => {
            setStatus(e.target.value);
          }}
          id="select2"
      />         
      <SelectOrder
          onChange={e => {
            setOrder(e.target.value);
          }}
          id="select2"
      />           
      </div>}
    <button className={advSearchButton} onClick={() => setShowAdv(!showAdv)}><FiSliders /></button>

    </div>
    
  );
};

export default SearchBar;
