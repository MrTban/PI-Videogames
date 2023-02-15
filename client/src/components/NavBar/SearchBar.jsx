import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesName } from '../../redux/actions';

const SearchBar = ({ setCurrentPage }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	const handlerInputChange = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const handlerSubmit = async (e) => {
		e.preventDefault();
		setCurrentPage(1);
		dispatch(getVideogamesName(name));
	};

	return (
		<div>
			<input
				type='text'
				placeholder='Search game...'
				onChange={(e) => handlerInputChange(e)}
			/>
			<button type='submit' onClick={(e) => handlerSubmit(e)}>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
