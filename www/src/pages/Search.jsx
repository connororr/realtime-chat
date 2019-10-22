import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Filters from '../components/Filters';
import axios from 'axios';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { FiGrid, FiList } from 'react-icons/fi';
import JobListItem from '../components/JobListItem';

const ContentWrapper = styled.div`
  height: calc(100vh - 72px);
  width: 100vw;
`;

const SearchWrapper = styled.div`
  background: #e7f6fd;
  padding-top: 81px;
  padding-bottom: 38px;
  margin-bottom: 17px;
  border-bottom-left-radius: 54px;
`;

const SearchResults = styled.div`
  height: calc(100vh - 72px);
  overflow-y: scroll;
  float: right;
  width: calc(100vw - 204px);

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: row;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledSearch = styled(SearchBar)`
  margin: 0 auto;
`;

const ResultsHolder = styled.div`
  max-width: 780px;
  width: 100%;
`;

const RefineBar = styled.div`
  width: 100%;
  display: flex;
`;

const Buttons = styled.div``;

const getResults = setResults => {
  axios.get('http://localhost:3800/job/search').then(response => {
    setResults(response.data.results);
  });
};

const Search = () => {
  const [results, setResults] = useState([]);
  const [sortOption, setSortOption] = useState(0);
  const [arrangement, setArrangement] = useState(1);

  useEffect(() => {
    getResults(setResults);
  });

  return (
    <ContentWrapper>
      <SearchWrapper>
        <StyledSearch />
      </SearchWrapper>
      <RefineBar>
        <Buttons>
          <FiList />
          <FiGrid />
        </Buttons>
      </RefineBar>
      <Wrapper>
        <ResultsHolder>
          {results.map(result => (
            <Link
              to={`/project/${result['business_id']}`}
              style={{ textDecoration: 'none' }}
            >
              {arrangement === 0 ? (
                <JobCard
                  project={result['project_name']}
                  desc={result.description}
                  key={result['business_id']}
                  b_id={result['business_id']}
                  bid={result['current_bid']}
                  b_name={result['business_name']}
                  location={result['location']}
                  image={result['project_photo'].image}
                  alt={result['project_photo'].title}
                />
              ) : (
                <JobListItem />
              )}
            </Link>
          ))}
        </ResultsHolder>
      </Wrapper>
    </ContentWrapper>
  );
};

export default Search;
