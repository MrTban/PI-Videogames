import {
	GET_VIDEOGAMES,
	GET_NAME_VIDEOGAMES,
	FILTER_BY_GENRES,
	FILTER_BY_PLATFORMS,
	FILTER_CREATED,
	ORDER_BY_NAME,
	ORDER_BY_RATING,
	GET_GENRES,
	GET_PLATFORMS,
	POST_VIDEOGAME,
	GET_DETAIL,
} from '../actions/types';

const initialState = {
	allVideogames: [],
	videogames: [],
	genres: [],
	videogamesElse: [],
	platforms: [],
	detail: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case GET_VIDEOGAMES:
			let platforms = [];
			payload.map((p) => (platforms = [...platforms, ...p.platforms]));
			return {
				...state,
				allVideogames: payload,
				videogames: payload,
				videogamesElse: payload,
				platforms: Array.from(new Set(platforms)),
			};

		case GET_NAME_VIDEOGAMES:
			return {
				...state,
				videogames: payload,
				videogamesElse: payload,
			};

		case FILTER_BY_GENRES:
			const allGenres = state.allVideogames;
			const genresFiltered =
				payload === 'All'
					? allGenres
					: allGenres.filter((el) => el.genres.includes(payload));
			return {
				...state,
				videogames: genresFiltered,
				videogamesElse: genresFiltered,
			};
		case FILTER_BY_PLATFORMS:
			const allPlatforms2 = state.allVideogames;
			const platformsFiltered =
				payload === 'all'
					? allPlatforms2
					: allPlatforms2.filter((el) => el.platforms.includes(payload));
			return {
				...state,
				videogames: platformsFiltered,
				videogamesElse: genresFiltered,
			};
		case FILTER_CREATED:
			const allStateVideogames = state.videogamesElse;
			const createdGame =
				payload === 'createdInDb'
					? allStateVideogames.filter((e) => e.createdInDb)
					: allStateVideogames.filter((e) => !e.createdInDb);
			return {
				...state,
				videogames: payload === 'All' ? state.videogamesElse : createdGame,
			};
		case ORDER_BY_RATING:
			const array =
				payload === 'asc'
					? state.allVideogames.sort((a, b) => {
							if (a.rating > b.rating) {
								return 1;
							}
							if (b.rating > a.rating) {
								return -1;
							} else return 0;
					  })
					: state.allVideogames.sort((a, b) => {
							if (a.rating > b.rating) {
								return -1;
							}
							if (b.rating > a.rating) {
								return 1;
							} else return 0;
					  });
			return {
				...state,
				videogames: array,
			};
		case ORDER_BY_NAME:
			const sortedArr =
				payload === 'asc'
					? state.allVideogames.sort((a, b) => {
							if (a.name > b.name) {
								return 1;
							}
							if (b.name > a.name) {
								return -1;
							}
							return 0;
					  })
					: state.allVideogames.sort((a, b) => {
							if (a.name > b.name) {
								return -1;
							}
							if (b.name > a.name) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				videogames: sortedArr,
			};
		case GET_GENRES:
			return {
				...state,
				genres: payload,
			};
		case GET_PLATFORMS:
			return {
				...state,
				platforms: payload,
			};
		case POST_VIDEOGAME:
			return {
				...state,
			};
		case GET_DETAIL:
			return {
				...state,
				detail: payload,
			};
		default:
			return state;
	}
};

export default rootReducer;
