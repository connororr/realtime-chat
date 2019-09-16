import React from "react";
import { Link } from "@reach/router";
import Layout from "../components/Layout";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Filters from "../components/Filters";
import axios from "axios";
import JobCard from "../components/JobCard";

const ContentWrapper = styled.div`
  height: calc(100vh - 66px);
  width: 100vw;
`;

const SearchResults = styled.div`
  height: calc(100vh - 66px);
  overflow-y: scroll;
  float: right;
  width: calc(100vw - 204px);

  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  flex-direction: row;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    this.getResults();
  }

  getResults = () => {
    const self = this;
    axios.get("http://localhost:3800/job/search").then(response => {
      const results = response.data.results.map(result => (
        <Link to={`/project/${result["business_id"]}`}>
          <JobCard
            project={result["project_name"]}
            desc={result.description}
            key={result["business_id"]}
            b_id={result["business_id"]}
            bid={result["current_bid"]}
            b_name={result["business_name"]}
            location={result["location"]}
            image={result["project_photo"].image}
            alt={result["project_photo"].title}
          />
        </Link>
      ));

      self.setState({ results });
    });
  };

  render() {
    const { results } = this.state;
    return (
      <Layout>
        <NavBar />
        <ContentWrapper>
          <Filters />
          <SearchResults>{results}</SearchResults>
        </ContentWrapper>
      </Layout>
    );
  }
}

export default Search;