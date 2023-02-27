import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
	postVideogames,
	getGenres,
	getVideogames,
	getPlatforms,
} from '../../redux/actions/index';
import style from './CreateGame.module.css';
import Validate from './Validation';

const GameCreate = () => {
	const dispatch = useDispatch();

	const history = useHistory();

	const platforms = useSelector((state) => state.platforms);
	const genres = useSelector((state) => state.genres);

	const [input, setInput] = useState({
		name: '',
		description: '',
		released: '',
		rating: 0,
		image: '',
		platforms: [],
		genres: [],
	});

	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(Validate(input));
		let error = Validate(input);
		if (Object.values(error).length !== 0) {
			alert('Missing Info');
		} else {
			dispatch(postVideogames(input));
			alert('¡The Video Game was created!');
			setInput({
				name: '',
				description: '',
				image: '',
				released: '',
				rating: '',
				platforms: [],
				genres: [],
			});
			history.push('/home');
		}
	};

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			Validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	};

	const handleSelectGenres = (e) => {
		setInput({
			...input,
			genres: [...input.genres, e.target.value],
		});
	};

	const handleSelectPlatforms = (e) => {
		setInput({
			...input,
			platforms: [...input.platforms, e.target.value],
		});
	};

	const handleDeleteGenres = (e) => {
		setInput({
			...input,
			genres: input.genres.filter((el) => el !== e),
		});
	};

	const handleDeletePlatforms = (e) => {
		setInput({
			...input,
			platforms: input.platforms.filter((el) => el !== e),
		});
	};

	useEffect(() => {
		dispatch(getGenres());
		dispatch(getPlatforms());
		dispatch(getVideogames());
	}, [dispatch]);

	return (
		<div className={style.bodyForm}>
			<Link to='/home'>
				<button className={style.botonback}>
					<i>Back to Home</i>
				</button>
			</Link>
			<form onSubmit={(e) => handleSubmit(e)} className={style.Form}>
				<h1 className={style.titleForm}>
					<i> Welcome </i>
				</h1>
				<h3 className={style.subtitleForm}>
					<i>Let's register your game!</i>
				</h3>
				<div className={`${style.input_container} ${style.ic1}`}>
					<input
						id='input'
						type='text'
						value={input.name}
						name='name'
						onChange={handleChange}
						placeholder=''
						autoComplete='off'
						className={style.inputFomr}
					/>
					<div className={style.cut}></div>
					<label className={style.placeholder}>
						<i>Name</i>
					</label>
				</div>
				<div className={`${style.input_container} ${style.ic2}`}>
					<input
						id='input'
						type='text'
						value={input.description}
						name='description'
						onChange={handleChange}
						placeholder=''
						autoComplete='off'
						className={style.inputFomr}
					/>
					<div className={style.cut}></div>
					<label className={style.placeholder}>
						<i>Description</i>
					</label>
				</div>
				<div className={`${style.input_container} ${style.ic2}`}>
					<input
						id='input'
						type='text'
						value={input.image}
						name='image'
						onChange={handleChange}
						placeholder=''
						accept='.jpg, .jpeg, .png, .webp'
						className={style.inputFomr}
					/>
					<div className={style.cut}></div>
					<label className={style.placeholder}>
						<i>Image</i>
					</label>
				</div>
				<div className={`${style.input_container} ${style.ic2}`}>
					{/* <label>Released Date: </label> */}
					<input
						id='input'
						type='date'
						value={input.released}
						name='released'
						onChange={handleChange}
						className={style.inputFomr}
					/>
					<div className={style.cut}></div>
					<label className={style.placeholder}>
						<i>Released</i>
					</label>
				</div>
				<div className={`${style.input_container} ${style.ic2}`}>
					{/* <label>Rating: </label> */}
					<input
						id='input'
						type='number'
						value={input.rating}
						name='rating'
						onChange={handleChange}
						min='0.00'
						max='5'
						className={style.inputFomr}
					/>
					<div className={style.cut}></div>
					<label className={style.placeholder}>
						<i>Rating</i>
					</label>
				</div>
				<div className={`${style.input_container} ${style.ic2}`}>
					<select onChange={(e) => handleSelectGenres(e)} className={style.inputFomr}>
						<option value='' select disable hidden>
							Select Genre/s
						</option>
						{genres.map((g) => (
							<option value={g.name}>{g.name}</option>
						))}
					</select>
					<div className={style.cut}></div>
					<label className={style.placeholder}>
						<i>Select Genre/s</i>
					</label>
				</div>
				<div className={`${style.input_container} ${style.ic2}`}>
					<select onChange={(e) => handleSelectPlatforms(e)} className={style.inputFomr}>
						<option value='' select disable hidden>
							Select Platform/s
						</option>
						{platforms.map((g) => (
							<option value={g.name}>{g.name}</option>
						))}
					</select>
					<div className={style.cut}></div>
					<label className={style.placeholder}>
						<i>Select Platform/s</i>
					</label>
				</div>

				<div className={`${style.error}`}>
					{errors.name && (
						<p className={style.error}>
							&#x26A0; &nbsp;<i> {errors.name} </i>&nbsp; &#x26A0;
						</p>
					)}
					{errors.description && (
						<p className={style.error}>
							&#x26A0; &nbsp;<i> {errors.description} </i>&nbsp; &#x26A0;
						</p>
					)}
					{errors.released && (
						<p className={style.error}>
							&#x26A0; &nbsp;<i> {errors.released} </i>&nbsp; &#x26A0;
						</p>
					)}
					{errors.rating && (
						<p className={style.error}>
							&#x26A0; &nbsp;<i> {errors.rating} </i>&nbsp; &#x26A0;
						</p>
					)}

					{errors.genres && (
						<p className={style.error1}>
							<i>{errors.genres}</i>
						</p>
					)}
					{errors.platforms && (
						<p className={style.error1}>
							<i>{errors.platforms}</i>
						</p>
					)}
				</div>

				<div className={`${style.selectedArea}`}>
					<ul className={style.lista}>
						<p>
							<i>Selected Genres:</i>
						</p>
						{input.genres.map((a) => (
							<li className={style.liS}>
								<p onClick={() => handleDeleteGenres(a)}>{a}</p>
								{/* <button type='button' value={a}>
								x
							</button> */}
							</li>
						))}
					</ul>
				</div>

				<div className={`${style.selectedArea1} ${style.ic2}`}>
					<ul className={style.lista}>
						<p>
							<i>Selected Platforms:</i>
						</p>
						{input.platforms.map((e) => (
							<li className={style.liS}>
								<p onClick={() => handleDeletePlatforms(e)}>{e}</p>
								{/* <button type='button' value={e} onClick={() => handleDeletePlatforms(e)}>
									x
								</button> */}
							</li>
						))}
					</ul>
				</div>

				<button type='submit' className={style.submit}>
					<i>Create</i>
				</button>
				{/* {Object.keys(errors).length === 0 ? (
					<button type='submit' className={style.submit}>
						<span>Create</span>
					</button>
				) : null} */}
			</form>
		</div>
	);
};

export default GameCreate;
