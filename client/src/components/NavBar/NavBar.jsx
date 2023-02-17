import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = ({ setCurrentPage }) => {
	return (
		<div>
			<Link to='/'>Log-Out</Link>
			<Link to='/home'>Home</Link>
			<Link to='/creategame'>Create Videogame</Link>
			<br />
			<br />
			<SearchBar setCurrentPage={setCurrentPage} />
		</div>
	);
};

export default NavBar;
