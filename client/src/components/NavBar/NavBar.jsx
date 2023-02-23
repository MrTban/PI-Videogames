import React from 'react';
import { Link } from 'react-router-dom';
import FilterSelects from '../Filters/Filters';
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css';

const NavBar = ({
	setCurrentPage,
	handleSortByName,
	handleFilterGenres,
	handleSortByRating,
	handleFilterCreated,
	handleFilterPlatfomrs,
	handleResetVg,
}) => {
	return (
		<div>
			<div className={style.buttonsNav}>
				<Link to='/'>
					<button className={style.buttonLink}>Exit</button>
				</Link>

				<Link to='/about'>
					<button className={style.buttonLink}>About</button>
				</Link>

				<Link to='/creategame'>
					<button className={style.buttonLink}>Create Game</button>
				</Link>

				<SearchBar setCurrentPage={setCurrentPage} />
			</div>

			<div>
				<FilterSelects
					handleSortByName={handleSortByName}
					handleFilterGenres={handleFilterGenres}
					handleSortByRating={handleSortByRating}
					handleFilterCreated={handleFilterCreated}
					handleFilterPlatfomrs={handleFilterPlatfomrs}
					handleResetVg={handleResetVg}
				/>
			</div>
		</div>
	);
};

export default NavBar;
