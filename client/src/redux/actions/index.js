import axios from 'axios';

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
	RESET,
} from './types';

export const getVideogames = () => async (dispatch) => {
	try {
		const response = await axios.get('/videogames');
		return dispatch({
			type: GET_VIDEOGAMES,
			payload: response.data,
		});
	} catch (error) {
		return error;
	}
};

export function getVideogamesName(name) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/videogames?name=${name}`);
			return dispatch({
				type: GET_NAME_VIDEOGAMES,
				payload: response.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getGenres() {
	return async function (dispatch) {
		const response = await axios.get('/genres', {});

		return dispatch({
			type: GET_GENRES,
			payload: response.data,
		});
	};
}

export function getPlatforms() {
	return async function (dispatch) {
		const response = await axios.get('/platforms', {});

		return dispatch({
			type: GET_PLATFORMS,
			payload: response.data,
		});
	};
}

export const postVideogames = (game) => async () => {
	try {
		const data = await axios.post('/videogames', game);
		return data;
	} catch (error) {
		return error;
	}
};

export function filterVideogamesByGenres(payload) {
	return {
		type: FILTER_BY_GENRES,
		payload: payload,
	};
}

export function filterVideogamesByPlatforms(payload) {
	return {
		type: FILTER_BY_PLATFORMS,
		payload: payload,
	};
}

export function filterCreated(payload) {
	return {
		type: FILTER_CREATED,
		payload,
	};
}

export const sortByRating = (payload) => {
	return function (dispatch) {
		dispatch({
			type: ORDER_BY_RATING,
			payload,
		});
	};
};

export function sortByName(payload) {
	return {
		type: ORDER_BY_NAME,
		payload,
	};
}

export function getDetail(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get(`/videogames/${id}`);

			return dispatch({
				type: GET_DETAIL,
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export const reset = () => {
	return {
		type: RESET,
	};
};
