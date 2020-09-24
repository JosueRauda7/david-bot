const categoriasBiblicas = require("../config.json").categories;

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

const getCategoria = () => {
	const categoria =
		categoriasBiblicas[getRandomInt(0, categoriasBiblicas.length - 1)];
	return categoria;
};

module.exports = {
	getRandomInt,
	getCategoria,
};
