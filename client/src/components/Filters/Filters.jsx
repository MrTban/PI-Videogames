import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPlatforms, reset } from '../../redux/actions';
import style from './Filters.module.css';

const FilterSelects = ({
	handleSortByName,
	handleFilterGenres,
	handleSortByRating,
	handleFilterCreated,
	handleFilterPlatfomrs,
	handleResetVg,
}) => {
	const dispatch = useDispatch();

	const allGenres = useSelector((state) => state.genres);
	const allPlatforms = useSelector((state) => state.platforms);

	useEffect(() => {
		dispatch(getGenres());
		dispatch(getPlatforms());
	}, [dispatch]);

	return (
		<div className={style.bodyFilters}>
			<div className={style.filters}>
				<select onChange={(e) => handleSortByName(e)} className={style.selects}>
					<option value='' select disable hidden>
						Order
					</option>
					<option value='asc'> A-Z </option>
					<option value='desc'> Z-A </option>
				</select>
				<select onChange={(e) => handleSortByRating(e)} className={style.selects}>
					<option value='' select disable hidden>
						Rating
					</option>
					<option value='asc'> 0 - 5 </option>
					<option value='desc'> 5 - 0 </option>
				</select>
				<select onChange={(e) => handleFilterGenres(e)} className={style.selects}>
					<option value='' select disable hidden>
						Genres
					</option>
					<option value='all'>All</option>
					{allGenres.map((gen) => (
						<option value={gen.name} key={gen.id}>
							{gen.name}
						</option>
					))}
				</select>
				<select onChange={(e) => handleFilterPlatfomrs(e)} className={style.selects}>
					<option value='' select disable>
						Platforms
					</option>
					<option value='all'>All</option>
					{allPlatforms.map((plat) => (
						<option value={plat.name} key={plat.id}>
							{plat.name}
						</option>
					))}
				</select>
				<select onChange={(e) => handleFilterCreated(e)} className={style.selects}>
					<option value='' select disable hidden>
						Source
					</option>
					<option value='all'>All</option>
					<option value='db'>Created</option>
					<option value='api'>API</option>
				</select>
			</div>
			<div className={style.buttons}>
				<button
					className={style.buttonsReset}
					onClick={(e) => {
						handleResetVg(e);
					}}
				>
					<i>Reset Games</i>
				</button>
				<button className={style.buttonsReset} onClick={() => dispatch(reset())}>
					<i>Reset Filters</i>
				</button>
			</div>
		</div>
	);
};

export default FilterSelects;
