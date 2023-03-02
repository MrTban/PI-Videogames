import React from 'react';
import style from './Paged.module.css';

const Paged = ({ videogamesPerPage, allVideogames, paged, currentPage }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<section className={style.paged}>
			<ul>
				{pageNumbers &&
					pageNumbers.map((number) => {
						if (number === currentPage) {
							return (
								<li className='number' key={number}>
									<button className={style.active} onClick={() => paged(number)}>
										<i>{number}</i>
									</button>
								</li>
							);
						} else {
							return (
								<li className='number' key={number}>
									<button onClick={() => paged(number)}>
										<i>{number}</i>
									</button>
								</li>
							);
						}
					})}
			</ul>
		</section>
	);
};

export default Paged;
