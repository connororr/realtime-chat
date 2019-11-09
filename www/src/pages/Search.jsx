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
	height: 100vh;
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

const Buttons = styled.div`
	max-width: 780px;
	width: 100%;
	display: flex;
	justify-content: end;
	margin: auto;
`;

const Icon = styled.div`
	color: #${(props) => (props.active ? '2f2f37' : 'a6a6a6')};
	margin: 10px;
	cursor: pointer;
`;

const getResults = (setResults,params) => {
	axios.post('http://localhost:3800/job/search', {
		"search_terms": params[0],
		"category_1": params[1],
		"category_2": params[2],
		"order_by": params[3],
		"location": params[4],
		"min_price": params[5],
		"max_price": params[6],
		"distance": params[7],
		"page_amount": params[8],
		"page_number": params[9]
	})
	.then((response) => {
		console.log();
		setResults(response.data.results);
	});
};

const Search = () => {
	const [results, setResults] = useState([]);
	const [params, setParams] = useState(["","","","relevance","",0,999999,"",20,0]);
	const [arrangement, setArrangement] = useState(1);

	useEffect(() => {
		getResults(setResults,params);
	}, [arrangement,params]);

	return (
		<ContentWrapper>
			<SearchWrapper>
				<StyledSearch updateParams = {setParams}/>
			</SearchWrapper>
			<RefineBar>
				<Buttons>
					<Icon
						active={arrangement === 1}
						onClick={() => {
							setArrangement(1);
						}}
					>
						<FiList />
					</Icon>
					<Icon
						active={arrangement === 0}
						onClick={() => {
							setArrangement(0);
						}}
					>
						<FiGrid />
					</Icon>
				</Buttons>
			</RefineBar>
			<Wrapper>
				<ResultsHolder>
					{results.map((result) => (
						<Link to={`/project/${result['business_id']}`} style={{ textDecoration: 'none' }}>
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
								<JobListItem 
								project={result['project_name']}
								desc={result.description}
								key={result['business_id']}
								b_id={result['business_id']}
								bid={result['current_bid']}
								b_name={result['business_name']}
								location={result['location']}
								image={result.project_photos[0].image}/>
							)}
						</Link>
					))}
				</ResultsHolder>
			</Wrapper>
		</ContentWrapper>
	);
};

export default Search;
