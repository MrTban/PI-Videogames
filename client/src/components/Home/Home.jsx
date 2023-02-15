import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getVideogames,
	filterVideogamesByGenres,
	filterVideogamesByPlatforms,
	filterCreated,
	orderByName,
	orderByRating,
	getGenres,
} from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import Card from '../Card/Card';
import Paged from '../Paged/Paged';
import Loading from '../Loader/Loader';
import FilterSelects from '../Filters/Filters';

const Home = () => {
	const dispatch = useDispatch();

	const [carga, SetCarga] = useState(true);

	// const [loading, setLoading] = useState(true);

	const [, /* order */ setOrder] = useState('');

	const allVideogames = useSelector((state) => state.allVideogames);
	// const allGenres = useSelector((state) => state.genres);

	const [currentPage, setCurrentPage] = useState(1);
	const [videogamesPerPage, setvideogamesPerPage] = useState(15);
	const indexOfLastGame = currentPage * videogamesPerPage;
	const indexOfFirstGame = indexOfLastGame - videogamesPerPage;
	const currentVideogames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

	const paged = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		dispatch(getVideogames()).then(() => SetCarga(false));
		dispatch(getGenres());
	}, [dispatch]);

	const handleResetVG = (e) => {
		e.preventDefault();
		dispatch(getVideogames());
	};

	const handleFilterGenres = (e) => {
		dispatch(filterVideogamesByGenres(e.target.value));
	};

	const handleFilterPlatforms = (e) => {
		dispatch(filterVideogamesByPlatforms(e.target.value));
	};

	function handleFilterCreated(e) {
		dispatch(filterCreated(e.target.value));
	}

	const handleSortByRating = (e) => {
		e.preventDefault();
		dispatch(orderByRating(e.target.value));
		setCurrentPage(1);
		setOrder(e.target.value);
	};

	const handleSortByName = (e) => {
		e.preventDefault();
		dispatch(orderByName(e.target.value));
		setCurrentPage(1);
		setOrder(e.target.value);
	};

	if (carga) {
		return <Loading />;
	}

	return (
		<div>
			{allVideogames.length ? (
				<div>
					<div>
						<h1>VIDEO GAMES</h1>
					</div>

					<br />
					<br />

					<button
						onClick={(e) => {
							handleResetVG(e);
						}}
					>
						Reset Games
					</button>

					<br />

					<div>
						<NavBar setCurrentPage={setCurrentPage} />
						<FilterSelects
							handleSortByName={handleSortByName}
							handleFilterGenres={handleFilterGenres}
							handleSortByRating={handleSortByRating}
							handleFilterPlatforms={handleFilterPlatforms}
							handleFilterCreated={handleFilterCreated}
						/>
						<Paged
							videogamesPerPage={videogamesPerPage}
							allVideogames={allVideogames.length}
							paged={paged}
						/>
					</div>
					<div>
						{currentVideogames.length > 0 ? (
							currentVideogames.map((e) => {
								return (
									<>
										<Link to={'/home/' + e.id}></Link>
										<Card
											key={e.id}
											id={e.id}
											name={e.name}
											image={e.img ? e.img : e.image}
											rating={e.rating}
											genres={e.genres}
										/>
									</>
								);
							})
						) : (
							<Loading />
						)}
					</div>
				</div>
			) : (
				<p>Hola</p>
			)}
		</div>
	);
};

export default Home;
