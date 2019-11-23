import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Filters from '../components/Filters';
import axios from 'axios';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import { FiGrid, FiList } from 'react-icons/fi';
import JobListItem from '../components/JobListItem';
import BizListItem from '../components/BizListItem';


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
	if(params!=null){
		axios.post('http://13.238.42.177:3800/job/search', {
			"search_terms": params[0],
			"category_1": params[1],
			"category_2": params[2],
			"job_status": params[3],
			"order_by": params[4],
			"location": params[5],
			"date_start" : params[6],
			"date_end" : params[7],
			"min_price": params[8],
			"max_price": params[9],
			"page_amount": params[10],
			"page_number": params[11]
		})	
		.then((response) => {
			setResults(response.data.results);
		});
	} else {
		axios.post('http://13.238.42.177:3800/job/search', {
			"search_terms": "",
			"category_1": "",
			"category_2": "",
			"job_status": "",
			"order_by": "Relevance",
			"location": "",
			"date_start":"",
			"date_end":"",
			"min_price": 0,
			"max_price": 999999,
			"page_amount": 20,
			"page_number": 0
		})
		.then((response) => {
			setResults(response.data.results);
		});
	}
};

const getBizResults = (setBizResults,params) => {
	if(params!=null){
		axios.post('http://13.238.42.177:3800/user/search', {
			"search_terms": params[0],
			"location": params[1],
			"page_amount": params[2],
			"page_number": params[3]
		})	
		.then((response) => {
			setBizResults(response.data.results);
		});
	} else {
		axios.post('http://13.238.42.177:3800/user/search', {
			"search_terms": "",
			"location": "",
			"page_amount": 20,
			"page_number": 0
		})
		.then((response) => {
			setBizResults(response.data.results);
		});
	}
};

const Search = (props) => {
	const [results, setResults] = useState([]);
	const [bizResults, setBizResults] = useState([]);
	const [searchType, setSearchType] = useState("Job");
	const [params, setParams] = useState(["","","","","Relevance","","","",0,999999,20,0]);
	const [arrangement, setArrangement] = useState(1);
	useEffect(() => {
		if(props.location.state!=null){
			if(props.location.state.passParams.length==12){
				setSearchType("Job")
				setParams(props.location.state.passParams);
				getResults(setResults,props.location.state.passParams);
			}else{
				setSearchType("Business")
				setParams(props.location.state.passParams);
				getBizResults(setBizResults,props.location.state.passParams);
			}
			
		}else{
			getResults(setResults,params);
		}
	}, [arrangement,props]);

	return (
		<ContentWrapper>
			<SearchWrapper>
				<StyledSearch passParams = {setParams}/>
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
				{searchType==='Job' ? (
				<ResultsHolder>
					{results.map((result) => (
						<Link to={`/project/${result['id']}`} passParams ={result['id']} style={{ textDecoration: 'none' }}>
							{arrangement === 0 ? (
								<JobCard
									project={result['project_name']}
									desc={result.description}
									key={result['id']}
									b_id={result['business_id']}
									bid={result['current_bid']}
									b_name={result['business_name']}
									location={result['location']}
									image={result.project_photos[0].image}
									alt={result.project_photos[0].title}
								/>
							) : (
								<JobListItem 
								project={result['project_name']}
								status={result.premium=='T' ? ("Premium"):("Standard")}
								key={result['id']}
								start={result['date_start']}
								end={result['date_end']}
								bid={result['current_bid']}
								b_name={result['business_name']}
								location={result['location']}
								image={result.project_photos[0].image}
								alt={result.project_photos[0].title}/>
							)}
						</Link>
					))}
				</ResultsHolder>):(
					<ResultsHolder>

						{bizResults.map((result) => (
						<Link to={`/profile/${result['id']}`} passParams ={result['id']} style={{ textDecoration: 'none' }}>
								<BizListItem 
								business_name={result['business_name']}
								location={result['location']}
								profile_picture={"http://13.238.42.177:3800/media/profile_pictures/images.jpg"}
								description={result['description']}/>
						</Link>
					))}
					</ResultsHolder>
				)}
			</Wrapper>
		</ContentWrapper>
	);
};

export default Search;
