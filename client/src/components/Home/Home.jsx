import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getVideogames,
	filterVideogamesByGenres,
	filterVideogamesByPlatforms,
	filterCreated,
	sortByRating,
	sortByName,
	setPage,
} from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import Card from '../Card/Card';
import Paged from '../Paged/Paged';
import Loading from '../Loader/Loader';
import style from './Home.module.css';
import defaultImage from '../../assets/imagen.jpg';
import logo from '../../assets/tbanrawg.png';

const Home = () => {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);

	const allVideogames = useSelector((state) => state.videogames);
	const [, /* order */ setOrden] = useState('');

	const currentPage = useSelector((state) => state.paged);
	const [videogamesPerPage] = useState(15);

	const indexOfLastGame = currentPage * videogamesPerPage;
	const indexOfFirstGame = indexOfLastGame - videogamesPerPage;
	const currentVideogames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

	const paged = (pageNumber) => {
		dispatch(setPage(pageNumber));
	};

	function handleResetVg(e) {
		e.preventDefault();
		dispatch(getVideogames());
	}

	function handleFilterGenres(e) {
		e.preventDefault();
		dispatch(setPage(1));
		setOrden(e.target.value);
		dispatch(filterVideogamesByGenres(e.target.value));
	}

	function handleFilterPlatfomrs(e) {
		e.preventDefault();
		dispatch(setPage(1));
		setOrden(e.target.value);
		dispatch(filterVideogamesByPlatforms(e.target.value));
	}

	function handleFilterCreated(e) {
		dispatch(filterCreated(e.target.value));
	}

	function handleSortByRating(e) {
		e.preventDefault();
		dispatch(setPage(1));
		setOrden(e.target.value);
		dispatch(sortByRating(e.target.value));
	}

	function handleSortByName(e) {
		e.preventDefault();
		dispatch(setPage(1));
		setOrden(e.target.value);
		dispatch(sortByName(e.target.value));
	}

	useEffect(() => {
		dispatch(getVideogames());
		setTimeout(() => {
			setIsLoaded(true);
		}, [6000]);
	}, [dispatch]);

	return (
		<div className={style.bodyHome}>
			{isLoaded ? (
				<div>
					<div className={style.logo}>
						<img src={logo} alt='tbanlogo' />
					</div>

					<div className={style.sidebarMenu}>
						<NavBar
							setPage={setPage}
							handleSortByName={handleSortByName}
							handleFilterGenres={handleFilterGenres}
							handleSortByRating={handleSortByRating}
							handleFilterCreated={handleFilterCreated}
							handleFilterPlatfomrs={handleFilterPlatfomrs}
							handleResetVg={handleResetVg}
						/>
					</div>
					<br />
					<br />
					<div>
						<br />
						<div className={style.allVideogamesContainer}>
							{currentVideogames.length ? (
								currentVideogames.map((e) => (
									<Card
										key={e.id}
										id={e.id}
										name={e.name}
										image={e.image ? e.image : defaultImage}
										rating={e.rating}
										genres={e.genres}
									/>
								))
							) : (
								<div>
									<h1>
										<i>There are no video games left</i>
									</h1>
								</div>
							)}
						</div>
						<br />
						<Paged
							videogamesPerPage={videogamesPerPage}
							allVideogames={allVideogames.length}
							paged={paged}
							currentPage={currentPage}
						/>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Home;
