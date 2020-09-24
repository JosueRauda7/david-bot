const fetch = require("node-fetch");
const categoriasBiblicas = require("../config.json").categories;

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};

const getCategoria = () => {
	const categoria =
		categoriasBiblicas[getRandomInt(0, categoriasBiblicas.length - 1)];
	return categoria;
};

const getVersiculo = async () => {
	const categoria = getCategoria();
	const versiculos = await fetch(
		encodeURI(
			`https://api.biblia.com/v1/bible/search/rvr60.json?query=${categoria}&key=5ddfd67aaf8f6fce56e52f450eba3957`
		)
	)
		.then((res) => res.json())
		.then((resData) => {
			return resData.results;
		})
		.catch((err) => console.log(err));
	return versiculos;
};

module.exports = { getVersiculo };
