// import {
// 	GET_VIDEOGAMES,
// 	GET_NAME_VIDEOGAMES,
// 	GET_GENRES,
// 	FILTER_BY_GENRES,
// 	FILTER_CREATED,
// 	ORDER_BY_NAME,
// 	ORDER_BY_RATING,
// 	GET_DETAIL,
//  POST_VIDEOGAME
// } from '../actions/index.js';

const initialState = {
	allVideogames: [],
	videogames: [],
	videogamesElse: [],
	genres: [],
	genresDB: [],
	genresApi: [],
	platforms: [],
	detail: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_VIDEOGAMES':
			let platforms = [];
			action.payload.map((e) => (platforms = [...platforms, ...e.platforms]));
			return {
				...state,
				allVideogames: action.payload,
				videogames: action.payload,
				videogamesElse: action.payload,
				platforms: Array.from(new Set(platforms)),
			};

		case 'GET_NAME_VIDEOGAMES':
			return {
				...state,
				videogames: action.payload,
				videogamesElse: action.payload,
			};

		case 'GET_GENRES':
			return {
				...state,
				genres: action.payload,
			};

		case 'FILTER_BY_GENRES':
			const allGenres2 = state.allVideogames;
			const genresFiltered =
				action.payload === 'all'
					? allGenres2
					: allGenres2.filter((el) => {
							let aux = '';
							for (let i = 0; el.genres.length > i; i++) {
								aux += el.genres[i].name;
							}
							//console.log(aux);
							return aux.includes(action.payload);
					  });
			return {
				...state,
				videogames: genresFiltered,
				videogamesElse: genresFiltered,
				//allVideogames:genresFiltered
			};

		case 'FILTER_CREATED':
			const allStateVideogames = state.videogamesElse;
			const createdGame =
				action.payload === 'createdInDb'
					? allStateVideogames.filter((e) => e.createdInDb)
					: allStateVideogames.filter((e) => !e.createdInDb);
			return {
				...state,
				//allVideogames:action.payload === "All" ? state.videogames: createdGame,
				videogames: action.payload === 'All' ? state.videogamesElse : createdGame,
			};

		case 'ORDER_BY_RATING':
			const array =
				action.payload === 'asc'
					? state.videogames.sort((a, b) => a.rating - b.rating)
					: state.videogames.sort((a, b) => b.rating - a.rating);
			return {
				...state,
				videogames: array,
			};

		case 'ORDER_BY_NAME':
			const sortedArr =
				action.payload === 'asc'
					? state.videogames.sort(function (a, b) {
							if (a.name > b.name) {
								return 1;
							}
							if (b.name > a.name) {
								return -1;
							}
							return 0;
					  })
					: state.videogames.sort(function (a, b) {
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
				allVideogames: sortedArr,
			};

		case 'POST_VIDEOGAME':
			return {
				...state,
			};

		case 'GET_DETAIL':
			return {
				...state,
				detail: action.payload,
			};

		default:
			return state;
	}
}
export default rootReducer;
