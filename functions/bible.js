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
			`https://api.biblia.com/v1/bible/search/rvr60.json?mode=verse&query=${categoria}&key=${process.env.KEY_BIBLE}`
		)
	)
		.then((res) => res.json())
		.then((resData) => {
			const versiculos = resData.results;
			const versiculo = versiculos[getRandomInt(0, versiculos.length)];
			return versiculo;
		})
		.catch((err) => console.log(err));
	return versiculos;
};

module.exports = { getVersiculo };
