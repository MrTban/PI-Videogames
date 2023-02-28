import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

const LandingPage = () => {
	return (
		<div>
			<br />
			<br />
			{/* <Link to='/home'>
				<button>Start</button>
			</Link> */}
			<div className={style.all}>
				<div className={style.cable}></div>
				<div className={style.controller}>
					<div className={style.centerBlue}>
						<div className={style.centerLeft}></div>
						<div className={style.centerRight}></div>
					</div>
					<button className={style.centerSelect}>
						<label className={style.labelSelect}>SELECT</label>
					</button>
					<Link to='/home' className={style.link}>
						<button className={style.centerStart}>
							<label className={style.labelStart}>START</label>
						</button>
					</Link>
					<div className={style.controllerLeft}>
						<div className={style.circle}></div>
						<div className={style.crossCenter}>
							<div className={style.crossTop}></div>
							<div className={style.crossBottom}></div>
							<div className={style.crossLeft}></div>
							<div className={style.crossRight}></div>
							<div className={style.crossCircle}></div>
						</div>
					</div>
					<div className={style.controllerRight}>
						<div className={style.backButton1Center}>
							<div className={style.cornerLeft1}></div>
							<div className={style.cornerRight1}></div>
						</div>
						<div className={style.backButton2Center}>
							<div className={style.cornerLeft2}></div>
							<div className={style.cornerRight2}></div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<br />
			<h1 className={style.landingTitle}>
				P R E S S &nbsp; S T A R T &nbsp; T O &nbsp; B E G I N
			</h1>
		</div>
	);
};

export default LandingPage;
