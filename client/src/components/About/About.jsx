import { Link } from 'react-router-dom';
import style from './About.module.css';

const About = () => {
	return (
		<div>
			<Link to='/home'>
				<button className={style.button}>
					<i>Back to Home</i>
				</button>
			</Link>

			<div className={style.rawg}>
				<div className={style.rawgText}>
					<h1>API made from RAWG</h1>

					<h2>Explore RAWG Video Games Database API</h2>
					<p>
						There are two types of companies: hoarders and givers. RAWG is the largest
						video game database and game discovery service. And we are gladly sharing our
						500,000+ games, search, and machine learning recommendations with the world.
						Learn what the RAWG games database API can do and build something cool with
						it!
					</p>
					<a href='https://api.rawg.io/docs/'>
						<button className={style.buttonsAPI}>
							<i>Read documentation</i>
						</button>
					</a>
					<a href='https://rawg.io/login'>
						<button className={style.buttonsAPI}>
							<i>Get API Key</i>
						</button>
					</a>
				</div>
				<div className={style.rawgImg}>
					<img
						src='https://rawg.io/assets/images/cover.117cc320ec2800b9b12092ca23d6e86d.png'
						alt='games database'
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
