import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../../redux/actions';
import Loading from '../Loader/Loader';
import style from './Detail.module.css';

const Detail = () => {
	const dispatch = useDispatch();

	const gameDetail = useSelector((state) => state.detail);

	const { id } = useParams();

	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);

	return (
		<div>
			<Link to='/home'>
				<button className={style.buttoncito}>Back to Home</button>
			</Link>
			{Object.entries(gameDetail).length ? (
				<div className={style.detailContainer}>
					<div>
						<h1>
							<i>{gameDetail.name}</i>
						</h1>
					</div>
					<div className={style.content}>
						<div className={style.imgContainer}>
							<img
								src={gameDetail.image}
								alt={gameDetail.name}
								className={style.imgDetail}
							/>
						</div>
						<div className={style.data}>
							<div className={style.descriptionContainer}>
								<h4>
									<i>Description:</i>
								</h4>
								<p>{gameDetail.description}</p>
							</div>
							<div className={style.rrDiv}>
								<h4>
									<i>Rating:</i>
									<p>{gameDetail.rating} &#9733;</p>
								</h4>
								<h4>
									<i>Released:</i>
									<p>{gameDetail.released}</p>
								</h4>
							</div>
						</div>

						<div className={style.divPlatGen}>
							<div className={style.divPlat}>
								<h4>
									<i>Platforms:</i>
									<p>
										{gameDetail.platforms && typeof gameDetail.platforms[0] === 'object'
											? gameDetail.platforms?.map((p) => p.name + ', ')
											: gameDetail.platforms?.join(', ')}
									</p>
								</h4>
							</div>
							<div className={style.divGen}>
								<h4>
									<i>Genres:</i>
									<p>
										{gameDetail.genres && typeof gameDetail.genres[0] === 'object'
											? gameDetail.genres?.map((g) => g.name + ', ')
											: gameDetail.genres?.join(', ')}
									</p>
								</h4>
							</div>
						</div>

						<div className={style.infoAdded}>
							<div>
								<h4>
									<i>Publishers:</i>
									<p>{gameDetail.publishers}</p>
								</h4>
								<h4>
									<i>Website:</i>
									<p>
										<a href={gameDetail.website}>{gameDetail.website}</a>
									</p>
								</h4>
							</div>
							<div>
								<h4>
									<i>Stores:</i>
									<p>
										{gameDetail.stores && typeof gameDetail.stores[0] === 'object'
											? gameDetail.stores?.map((s) => s.name + ', ')
											: gameDetail.stores?.join(', ')}
									</p>
								</h4>
							</div>

							<h4>
								<i>Tags:</i>
								<p>{gameDetail.tags.join(', ')}</p>
							</h4>
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
