import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
import Loading from '../Loader/Loader';

const Detail = (props) => {
	const gameDetail = useSelector((state) => state.detail);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDetail(props.match.params.id));
	}, [dispatch]);

	return (
		<div>
			<h1>Detalles</h1>
			<Link to='/home'>
				<button>Back to Home</button>
			</Link>
			{Object.entries(gameDetail).length ? (
				<div>
					<div>
						<img src={gameDetail.image} alt={gameDetail.name} />
					</div>
					<div>
						<h1>{gameDetail.name}</h1>
					</div>
					<div>
						<h4>Description: {gameDetail.description} &#9733;</h4>
					</div>
					<div>
						<h4>Rating: {gameDetail.rating} </h4>
						<h4>Released: {gameDetail.released}</h4>
					</div>
					<div>
						<h4>Publishers: {gameDetail.publishers}</h4>
						<h4>Website: {gameDetail.website}</h4>
					</div>
					<div>
						<h3>
							Platforms:{' '}
							{gameDetail.platforms?.map((p) => (
								<p>{p}</p>
							))}
						</h3>
						<h3>
							Genres:{' '}
							{gameDetail.genres?.map((g) => (
								<p>{g.name}</p>
							))}
						</h3>
						<h3>
							Stores:{' '}
							{gameDetail.stores?.map((s) => (
								<p>{s}</p>
							))}
						</h3>
						<h4>Tags: {gameDetail.tags.join(', ')}</h4>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Detail;
