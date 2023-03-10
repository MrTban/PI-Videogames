import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesName } from '../../redux/actions/index';
import style from './SearchBar.module.css';

const SearchBar = ({ setPage }) => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');

	const handleInputChange = (e) => {
		e.preventDefault();
		setName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(setPage(1));
		dispatch(getVideogamesName(name));
		setName('');
	};

	return (
		<div className={style.searchDiv}>
			<input
				type='text'
				placeholder=''
				onChange={(e) => handleInputChange(e)}
				value={name}
				className={style.input}
			/>
			<div className={style.cut}></div>
			<label className={style.placeholder}>
				<i>Search</i>
			</label>
			<button type='sumbit' onClick={(e) => handleSubmit(e)} className={style.submit}>
				<i>Search</i>
			</button>
		</div>
	);
};

export default SearchBar;
