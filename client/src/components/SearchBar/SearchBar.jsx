import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesName } from '../../redux/actions/index';

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
			<input type='text' placeholder='Search' onChange={(e) => handlerInputChange(e)} />
			<button type='sumbit' onClick={(e) => handlerSubmit(e)}>
				Buscar
			</button>
		</div>
	);
};

export default SearchBar;
