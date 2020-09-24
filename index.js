const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
require("./functions/commands");
const { getVersiculo } = require("./functions/bible");

client.once("ready", () => {
	console.log("ready");
	try {
		const canal = client.channels.cache.find(
			(channel) => channel.name === "versiculo-diario"
		);
		getVersiculo()
			.then((versiculo) => {
				setInterval(() => {
					const mensaje = new MessageEmbed()
						.setColor("#eee")
						.setTitle(versiculo.title)
						.setDescription(versiculo.preview);
					canal.send(mensaje);
				}, 10000);
			})
			.catch((err) => console.log(err));
		return;
	} catch (err) {
		console.log(err);
		return;
	}
});

client.on("message", (msg) => {
	if (msg.content.toLowerCase() === "hola") {
		if (msg.member === null) {
			msg.channel.send(`Hola, ${msg.author} :wave:`);
			return;
		}
		msg.channel.send(`Hola, ${msg.member} :wave:`);
	}
});

client.on("guildMemberAdd", (member) => {
	const channel = member.guild.channels.cache.find(
		(ch) => ch.name === "general"
	);
	if (!channel) return;
	channel.send(
		`Te damos la bienvenida, ${member} :partying_face:\n\nPuedes conocer los comandos usando: !help en el chat.`
	);
});

client.login(process.env.TOKEN);
