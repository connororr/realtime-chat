import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import * as serviceWorker from './serviceWorker';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Search from './pages/Search';
import Project from './pages/Project';
import Conversations from './pages/Conversations';
// import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import Layout from './components/Layout';
import Business from './pages/Business';

ReactDOM.render(
	<Layout>
		<NavBar />
		<Router>
			<Landing path='/' />
			<Login path='/login' />
			<Search path='/search' />
			<Project path='/project/:bid' />
			<Conversations path='/conversations' />
			<Business path='/profile/:id' />
		</Router>
	</Layout>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
