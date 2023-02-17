import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postVideogames, getGenres, getVideogames } from '../../redux/actions/index';
import style from './CreateGame.module.css';

function validate(input) {
	let errors = {};
	if (!input.name) {
		errors.name = 'The Name field is required to be completed.';
	} else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
		errors.name = 'Only letters, numbers, hyphens and parentheses are accepted..';
	} else if (input.name > 40) {
		errors.name = 'The name is too long.';
	} else if (!input.description) {
		errors.description = 'The field Description is required to be completed.';
	} else if (input.description.length > 750) {
		errors.description = 'Description is too long (Max = 750 characters).';
	} else if (!input.released) {
		errors.released = 'The Release date field must be completed.';
	} else if (input.rating > 5.0) {
		errors.rating = 'The rating cannot be higher than 5.0';
	} else if (input.rating < 1.0) {
		errors.rating = 'The rating cannot be less than 1.0';
	} else if (!input.genres.length) {
		errors.genres = 'You must select one or more Genres.';
	} else if (!input.platforms.length) {
		errors.platforms = 'You must select one or more Platforms.';
	}
	return errors;
}

export default function GameCreate() {
	const dispatch = useDispatch();

	const platforms = useSelector((state) => state.platforms);
	const genres = useSelector((state) => state.genres);

	const [errors, setErrors] = useState({});

	const [input, setInput] = useState({
		name: '',
		description: '',
		released: '',
		rating: '',
		image: '',
		platforms: [],
		genres: [],
	});

	function handleSubmit(e) {
		e.preventDefault();
		setErrors(validate(input));
		let error = validate(input);
		if (Object.values(error).length !== 0) {
			alert('Error en el formulario');
		} else {
			dispatch(postVideogames(input));
			alert('Se creó el Video Juego');
			setInput({
				name: '',
				description: '',
				image: '',
				released: '',
				rating: '',
				genres: [],
				platforms: [],
			});
		}
	}
	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
		console.log(input);
	}

	function handleSelectPlatforms(e) {
		setInput({
			...input,
			platforms: [...input.platforms, e.target.value],
		});
	}

	function handleSelectGenres(e) {
		setInput({
			...input,
			genres: [...input.genres, e.target.value],
		});
	}

	function handleDeleteGenres(e) {
		setInput({
			...input,
			genres: input.genres.filter((el) => el !== e),
		});
	}

	function handleDeletePlatforms(e) {
		setInput({
			...input,
			platforms: input.platforms.filter((el) => el !== e),
		});
	}

	useEffect(() => {
		dispatch(getGenres());
		dispatch(getVideogames());
	}, [dispatch]);

	return (
		<div>
			<Link to='/home'>
				<button>Back to Home</button>
			</Link>
			<h1>Create Game</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div>
					<label>Name: </label>
					<input
						id='input'
						type='text'
						value={input.name}
						name='name'
						onChange={handleChange}
						placeholder='Name...'
					/>
					{errors.name && <p className={style.error}>{errors.name}</p>}
				</div>
				<div>
					<label>Description: </label>
					<input
						id='input'
						type='text'
						value={input.description}
						name='description'
						onChange={handleChange}
						placeholder='Description...'
					/>
					{errors.description && <p className={style.error}>{errors.description}</p>}
				</div>
				<div>
					<label>Released Date: </label>
					<input
						id='input'
						type='date'
						value={input.released}
						name='released'
						onChange={handleChange}
					/>
					{errors.released && <p className={style.error}>{errors.released}</p>}
				</div>
				<div>
					<label>Rating: </label>
					<input
						id='input'
						type='number'
						value={input.rating}
						name='rating'
						onChange={handleChange}
						placeholder='0.00 to 5.00'
					/>
					{errors.rating && <p className={style.error}>{errors.rating}</p>}
				</div>
				<div>
					<label>Genres: </label>
					<select onChange={(e) => handleSelectGenres(e)}>
						{genres.map((g) => (
							<option value={g.name}>{g.name}</option>
						))}
					</select>
					{errors.genres && <p className={style.error}>{errors.genres}</p>}
					<ul>
						<p>Selected Genres:</p>
						{input.genres.map((a) => (
							<li>
								<p>{a}</p>
								<button type='button' value={a} onClick={() => handleDeleteGenres(a)}>
									x
								</button>
							</li>
						))}
					</ul>
				</div>
				<lebel>Platforms: </lebel>
				<select onChange={(e) => handleSelectPlatforms(e)}>
					{platforms.map((g) => (
						<option value={g}>{g}</option>
					))}
				</select>
				{errors.platforms && <p className={style.error}>{errors.platforms}</p>}
				<ul>
					<p>Selected Platforms:</p>
					{input.platforms.map((e) => (
						<li>
							<p>{e}</p>
							<button type='button' value={e} onClick={() => handleDeletePlatforms(e)}>
								x
							</button>
						</li>
					))}
				</ul>
				<br />
				<br />
				<button type='submit'>Create</button>
			</form>
		</div>
	);
}
