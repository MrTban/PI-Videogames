import React from 'react';
import load from '../../assets/11.gif';

const Loading = () => {
	return (
		<div>
			<div>
				<img src={load} alt='loading' width='600px' height='600px' />
			</div>
		</div>
	);
};

export default Loading;
