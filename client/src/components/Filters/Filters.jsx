import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../redux/actions';

const FilterSelects = ({
	handleSortByName,
	handleFilterGenres,
	handleSortByRating,
	handleFilterCreated,
}) => {
	const dispatch = useDispatch();
	const allGenresh = useSelector((state) => state.genres);

	useEffect(() => {
		dispatch(getGenres());
	}, [dispatch]);

	return (
		<div>
			<select onChange={(e) => handleSortByName(e)}>
				<option value='' select disable hidden>
					Order
				</option>
				<option value='asc'> A-Z </option>
				<option value='desc'> Z-A </option>
			</select>
			<select onChange={(e) => handleSortByRating(e)}>
				<option value='' select disable hidden>
					Rating
				</option>
				<option value='asc'> 0 - 5 </option>
				<option value='desc'> 5 - 0 </option>
			</select>
			<select onChange={(e) => handleFilterGenres(e)}>
				<option value='' select disable hidden>
					Genres
				</option>
				<option value='all'>All</option>
				{allGenresh.map((g) => (
					<option value={g.name} key={g.id}>
						{g.name}
					</option>
				))}
			</select>
			<select onChange={(e) => handleFilterCreated(e)}>
				<option value='' select disable hidden>
					Games
				</option>
				<option value='All'>All</option>
				<option value='createdInDb'>Created</option>
				<option value='api'>Existing</option>
			</select>
		</div>
	);
};

export default FilterSelects;

// <select value={platformSelect} onChange={(e) => handleFilterPlatforms(e)}>
// 	<option value='' select disable hidden>
// 		Platforms
// 	</option>
// 	<option value='All'>All</option>
// 	{allPlatforms.map((p) => (
// 		<option key={p.id} value={p.name}>
// 			{p.name}
// 		</option>
// 	))}
// </select>;

// <div>
// 			<select onChange={(e) => handleSortByName(e)}>
// 				<option value='' select disable hidden>
// 					Order
// 				</option>
// 				<option value='asc'> A - Z</option>
// 				<option value='desc'> Z - A</option>
// 			</select>
// 			<select onChange={(e) => handleSortByRating(e)}>
// 				<option value='' select disable hidden>
// 					Rating
// 				</option>
// 				<option value='asc'>0 - 5</option>
// 				<option value='desc'>5 - 0</option>
// 			</select>
// 			<select value={genreSelect} onChange={(e) => handleFilterGenres(e)}>
// 				<option value='' select disable hidden>
// 					Genres
// 				</option>
// 				<option value='all'>All</option>
// 				{allGenres.map((g) => (
// 					<option key={g.id} value={g.name}>
// 						{g.name}
// 					</option>
// 				))}
// 			</select>

// 			<select onChange={(e) => handleFilterCreated(e)}>
// 				<option value='' select disable hidden>
// 					Games
// 				</option>
// 				<option value='All'>All</option>
// 				<option value='createdInDb'>Created</option>
// 				<option value='api'>Existing</option>
// 			</select>
// 		</div>
