const fetch = require("node-fetch");
const categoriasBiblicas = require("../config.json").categories;
const verses = require("../config.json").versiculos;

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
	const versiculos = fetch(
		encodeURI(
			`https://api.biblia.com/v1/bible/search/rvr60.json?mode=verse&query=${categoria}&key=${process.env.KEY_BIBLE}`
		)
	)
		.then((res) => res.json())
		.then(async (resData) => {
			const versiculos = resData.results;
			const versicle = versiculos[getRandomInt(0, versiculos.length)];
			let title = versicle.title.split(" ");
			const pasaje = title.filter((v) => v.match(/[a-z]+/));
			const traducido = verses[pasaje];
			const pje = title.map((i) => {
				if (i.match(pasaje)) {
					i = traducido;
				}
				return i;
			});
			const text = versicle.preview;
			const versiculo = {
				title: pje.join(" "),
				text,
			};
			return versiculo;
		})
		.catch((err) => console.log(err));
	return versiculos;
};

module.exports = { getVersiculo };
