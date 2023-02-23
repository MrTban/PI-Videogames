import {
	GET_VIDEOGAMES,
	GET_NAME_VIDEOGAMES,
	GET_GENRES,
	GET_PLATFORMS,
	FILTER_BY_GENRES,
	FILTER_BY_PLATFORMS,
	FILTER_CREATED,
	ORDER_BY_NAME,
	ORDER_BY_RATING,
	GET_DETAIL,
	POST_VIDEOGAME,
	RESET,
} from '../actions/types';

const initialState = {
	allVideogames: [],
	videogames: [],
	genres: [],
	platforms: [],
	detail: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_VIDEOGAMES:
			return {
				...state,
				allVideogames: action.payload,
				videogames: action.payload,
			};

		case GET_NAME_VIDEOGAMES:
			return {
				...state,
				videogames: action.payload,
			};

		case GET_GENRES:
			return {
				...state,
				genres: action.payload,
			};
		case GET_PLATFORMS:
			return {
				...state,
				platforms: action.payload,
			};

		case FILTER_BY_GENRES:
			const allGenres = state.videogames;
			const genresFiltered =
				action.payload === 'all'
					? allGenres
					: allGenres.filter((gen) =>
							gen.genres?.find(
								(genres) => genres.name === action.payload || genres === action.payload
							)
					  );
			return {
				...state,
				videogames: genresFiltered,
			};

		case FILTER_BY_PLATFORMS:
			const allPlatforms = state.videogames;
			const platformsFiltered =
				action.payload === 'all'
					? allPlatforms
					: allPlatforms.filter((plat) =>
							plat.platforms?.find(
								(platforms) =>
									platforms.name === action.payload || platforms === action.payload
							)
					  );
			return {
				...state,
				videogames: platformsFiltered,
			};

		case FILTER_CREATED:
			const dbGames = state.allVideogames.filter((game) => game.createdInDb);
			const apiGames = state.allVideogames.filter((game) => !game.createdInDb);
			const gameFilter = action.payload === 'db' && dbGames.length ? dbGames : apiGames;
			return {
				...state,
				videogames: action.payload === 'all' ? state.allVideogames : gameFilter,
			};

		case ORDER_BY_RATING:
			const sortedRating =
				action.payload === 'asc'
					? state.videogames.sort((a, b) => a.rating - b.rating)
					: state.videogames.sort((a, b) => b.rating - a.rating);
			return {
				...state,
				videogames: sortedRating,
			};

		case ORDER_BY_NAME:
			const sortedName =
				action.payload === 'asc'
					? state.videogames.sort(function (a, b) {
							if (a.name > b.name) return 1;
							if (b.name > a.name) return -1;
							return 0;
					  })
					: state.videogames.sort(function (a, b) {
							if (a.name > b.name) return -1;
							if (b.name > a.name) return 1;
							return 0;
					  });
			return {
				...state,
				allVideogames: sortedName,
			};

		case POST_VIDEOGAME:
			return {
				...state,
			};

		case GET_DETAIL:
			return {
				...state,
				detail: action.payload,
			};
		case RESET:
			return {
				...state,
				videogames: state.allVideogames,
			};

		default:
			return state;
	}
}
export default rootReducer;
