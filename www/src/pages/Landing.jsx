import React, { useState } from 'react';
import { navigate } from '@reach/router';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Hero from '../components/Hero';
import NavBar from '../components/NavBar';
import { jobFilter, locationFilter } from '../helper/filters';

const Heading = styled.h2`
  width: 100%;
  text-align: center;
  color: #000000;
  margin: 0;
  font-size: 35px;
  font-weight: 800;
  padding-top: 135px;
`;

const FormHolder = styled.div`
  width: max-content;
  display: block;
  margin: auto;
  overflow: hidden;
  border-radius: 24px;
  margin-top: 81px;
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
  font-size: 13px;
  text-align: center;
  padding-right: 15px;
  padding-left: 10px;
  border-radius: 0;
  border: 0;
`;

const SelectJob = styled(jobFilter)`
  ${selectStyles}
`;

const SelectLocation = styled(locationFilter)`
  ${selectStyles}
`;

const FindBtn = styled.button`
  border: 0;
  background: #ff7c4e;
  height: 40px;
  color: #fff;
  width: 124px;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
`;

const BGFade = styled.div`
  height: 170px;
  margin-top: 83px;
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 255, 255) 100%
  );
`;

const search = (category, location) => {
  if (category !== '' && location !== '') {
    navigate(`/search?type=${category}&state=${location}`);
  }
};

const Landing = () => {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  return (
    <Layout>
      <NavBar
        style={{ position: 'fixed', background: 'transparent', zIndex: 3 }}
      />
      <Hero>
        <Heading>GET YOUR THINGS DONE</Heading>
        <FormHolder>
          <SelectJob
            onChange={e => {
              setCategory(e.target.value);
            }}
            style={{ borderRight: '1px solid #e6e6e6' }}
            id="select1"
          />
          <SelectLocation
            onChange={e => {
              setLocation(e.target.value);
            }}
            style={{ borderRight: '1px solid #e6e6e6' }}
            id="select2"
          />
          <FindBtn
            onClick={() => {
              search(category, location);
            }}
          >
            FIND
          </FindBtn>
        </FormHolder>
        <BGFade />
      </Hero>
    </Layout>
  );
};

export default Landing;
