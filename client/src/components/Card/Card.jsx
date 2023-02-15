import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, name, image, genres, rating }) => {
	return (
		<div id={id} key={id}>
			<div>
				<img src={image} alt={name} width='250px' height='250px' />
				<Link to={`/detail/${id}`}>
					<h2>
						<b>{name}</b>
					</h2>
				</Link>
				<h4>
					<i>{rating}</i>
				</h4>
				<h4>
					{genres && (
						<i>
							<p>{genres.map((g) => Object.values(g) + ' ')}</p>
						</i>
					)}
				</h4>
			</div>
		</div>
	);
};

export default Card;
