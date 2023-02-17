import React from 'react';
import style from './Paged.module.css';

const Paged = ({ videogamesPerPage, allVideogames, paged }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<section className={style.paged}>
			<ul>
				{pageNumbers &&
					pageNumbers.map((number) => (
						<li className='number' key={number}>
							<button className={style.active} onClick={() => paged(number)}>
								<i>{number}</i>
							</button>
						</li>
					))}
			</ul>
		</section>
	);
};

export default Paged;
