const Validate = (input) => {
	let errors = {};
	if (!input.name) {
		errors.name = 'The Name field is required to be completed.';
	} else if (!/^[a-zA-Z0-9-() .]+$/.test(input.name)) {
		errors.name = 'Only letters, numbers, hyphens and parentheses are accepted..';
	} else if (input.name > 40) {
		errors.name = 'The name is too long.';
	} else if (!input.description) {
		errors.description = 'The field Description is required to be completed.';
	} else if (input.description.length > 750) {
		errors.description = 'Description is too long (Max = 750 characters).';
	} else if (!input.released) {
		errors.released = 'The Release date field must be completed.';
	} else if (input.rating > 5.0) {
		errors.rating = 'The rating cannot be higher than 5.0';
	} else if (input.rating < 1.0) {
		errors.rating = 'The rating cannot be less than 1.0';
	} else if (!input.genres.length) {
		errors.genres = 'You must select one or more Genres.';
	} else if (!input.platforms.length) {
		errors.platforms = 'You must select one or more Platforms.';
	}
	return errors;
};

export default Validate;
