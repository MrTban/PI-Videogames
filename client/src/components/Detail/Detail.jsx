import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
import Loading from '../Loader/Loader';
import style from './Detail.module.css';

const Detail = () => {
	const gameDetail = useSelector((state) => state.detail);

	const dispatch = useDispatch();

	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);

	return (
		<div className={style.detailContainer}>
			<h1>Detail</h1>
			<Link to='/home'>
				<button>Back to Home</button>
			</Link>
			{Object.entries(gameDetail).length ? (
				<div>
					<div>
						<div>
							<h1>{gameDetail.name}</h1>
						</div>
						<div>
							<img src={gameDetail.image} alt={gameDetail.name} />
						</div>
						<div className={style.descriptionContainer}>
							<h4>Description:</h4>
							<p>{gameDetail.description}</p>
						</div>
						<div>
							<h4>Rating:</h4>
							<p>{gameDetail.rating} &#9733;</p>
							<h4>Released:</h4>
							<p>{gameDetail.released}</p>
						</div>
						<div>
							<h4>Publishers:</h4>
							<p>{gameDetail.publishers}</p>
							<h4>Website:</h4>
							<p>{gameDetail.website}</p>
						</div>
						<div>
							<h4>Platforms:</h4>
							{gameDetail.platforms?.map((p) => (
								<p>{p}</p>
							))}
							<h4>Genres:</h4>
							{gameDetail.genres?.map((g) => (
								<p>{g.name}</p>
							))}
							<h4>Stores:</h4>
							{gameDetail.stores?.map((s) => (
								<p>{s}</p>
							))}
							<h4>Tags:</h4>
							<p>{gameDetail.tags.join(', ')}</p>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Detail;
