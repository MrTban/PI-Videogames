import React from 'react';

const Paged = ({ allVideogames, videogamesPerPage, paged }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul>
				{pageNumbers?.map((number) => (
					<li key={number}>
						<button onClick={() => paged(number)}>{number}</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Paged;
