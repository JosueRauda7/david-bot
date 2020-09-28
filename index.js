const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
require("./functions/commands");
const { getVersiculo } = require("./functions/bible");

client.once("ready", () => {
	console.log("ready");
	try {
		const canales = client.channels.cache.filter(
			(channel) => channel.name === "versiculo-diario"
		);
		setInterval(() => {
			canales.map((canal) => {
				getVersiculo()
					.then((versiculo) => {
						const mensaje = new MessageEmbed()
							.setColor("#eee")
							.setTitle(versiculo.title)
							.setDescription(versiculo.text);
						canal.send(mensaje);
					})
					.catch((err) => console.log(err));
			});
		}, 86400 * 1000);
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
		` :confetti_ball: Te damos la bienvenida :tada:\n${member} :partying_face:\n\nPuedes conocer los comandos usando: !help en el chat.`
	);
});

client.login(process.env.TOKEN);
