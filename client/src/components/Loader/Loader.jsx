import React from 'react';
import style from './Loader.module.css';

const Loading = () => {
	return (
		<div className={style.main}>
			<div className={style.container}>
				<div className={style.dots}>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
					<div className={style.dot}></div>
				</div>
				<div className={style.dots2}>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
					<div className={style.dot2}></div>
				</div>
				<div className={style.circle}></div>
			</div>
		</div>
	);
};

export default Loading;
