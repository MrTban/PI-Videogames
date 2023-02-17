import axios from 'axios';

// import {
// 	GET_VIDEOGAMES,
// 	GET_NAME_VIDEOGAMES,
// 	GET_GENRES,
// 	FILTER_BY_GENRES,
// 	FILTER_CREATED,
// 	ORDER_BY_NAME,
// 	ORDER_BY_RATING,
// 	GET_DETAIL,
// 	POST_VIDEOGAME,
// } from './types';

export const getVideogames = () => async (dispatch) => {
	try {
		const call = await axios.get('http://localhost:3001/videogames');
		return dispatch({
			type: 'GET_VIDEOGAMES',
			payload: call.data,
		});
	} catch (error) {
		return error;
	}
};

export function getVideogamesName(name) {
	return async function (dispatch) {
		try {
			const json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
			return dispatch({
				type: 'GET_NAME_VIDEOGAMES',
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getGenres() {
	return async function (dispatch) {
		const json = await axios.get('http://localhost:3001/genres', {});

		return dispatch({
			type: 'GET_GENRES',
			payload: json.data,
		});
	};
}

export const postVideogames = (game) => async () => {
	try {
		const data = await axios.post('http://localhost:3001/videogames', game);
		return data;
	} catch (error) {
		return error;
	}
};

export function filterVideogamesByGenres(payload) {
	return {
		type: 'FILTER_BY_GENRES',
		payload: payload,
	};
}

export function filterCreated(payload) {
	return {
		type: 'FILTER_CREATED',
		payload,
	};
}

export const orderByRating = (payload) => {
	return function (dispatch) {
		dispatch({
			type: 'ORDER_BY_RATING',
			payload,
		});
	};
};

export function orderByName(payload) {
	return {
		type: 'ORDER_BY_NAME',
		payload,
	};
}

export function getDetail(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get(`http://localhost:3001/videogames/${id}`);

			return dispatch({
				type: 'GET_DETAIL',
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
