// import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const NavBar = ({ setCurrentPage }) => {
	return (
		<div>
			<Link to='/'>Log-Out</Link>
			<Link to='/home'>Home</Link>
			<Link to='/createvideogame'>Create Videogame</Link>
			<SearchBar setCurrentPage={setCurrentPage} />
		</div>
	);
};

export default NavBar;
