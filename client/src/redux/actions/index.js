import axios from 'axios';
import {
	GET_VIDEOGAMES,
	GET_NAME_VIDEOGAMES,
	FILTER_BY_GENRES,
	FILTER_BY_PLATFORMS,
	FILTER_CREATED,
	ORDER_BY_RATING,
	ORDER_BY_NAME,
	GET_GENRES,
	GET_PLATFORMS,
	GET_DETAIL,
} from './types';

export const getVideogames = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get('http://localhost:3001/videogames');

			return dispatch({
				type: GET_VIDEOGAMES,
				payload: response.data,
			});
		} catch (error) {
			return error;
		}
	};
};

export const getVideogamesName = (name) => {
	return async (dispatch) => {
		try {
			const response = await axios(`http://localhost:3001/videogames?name=${name}`);

			return dispatch({
				type: GET_NAME_VIDEOGAMES,
				payload: response.data,
			});
		} catch (error) {
			return error;
		}
	};
};

export const getGenres = () => {
	return async (dispatch) => {
		try {
			const response = await axios('http://localhost:3001/genres', {});

			return dispatch({
				type: GET_GENRES,
				payload: response.data,
			});
		} catch (error) {
			return error;
		}
	};
};

export const getPlatforms = () => {
	return async (dispatch) => {
		try {
			const response = await axios('http://localhost:3001/platforms', {});

			return dispatch({
				type: GET_PLATFORMS,
				payload: response.data,
			});
		} catch (error) {
			return error;
		}
	};
};

export const postVideogames = (game) => {
	return async () => {
		try {
			const data = await axios('http://localhost:3001/videogames', game);

			return data;
		} catch (error) {
			return error;
		}
	};
};

export const filterVideogamesByGenres = (payload) => {
	return {
		type: FILTER_BY_GENRES,
		payload,
	};
};

export const filterVideogamesByPlatforms = (payload) => {
	return {
		type: FILTER_BY_PLATFORMS,
		payload,
	};
};

export function filterCreated(payload) {
	return {
		type: FILTER_CREATED,
		payload,
	};
}

export const orderByRating = (payload) => {
	return {
		type: ORDER_BY_RATING,
		payload,
	};
};

export const orderByName = (payload) => {
	return {
		type: ORDER_BY_NAME,
		payload,
	};
};

export const getDetail = (id) => {
	return async (dispatch) => {
		try {
			const detail = await axios(`http://localhost:3001/videogames/${id}`);

			return dispatch({
				type: GET_DETAIL,
				payload: detail.data,
			});
		} catch (error) {
			return error;
		}
	};
};
