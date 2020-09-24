const config = require("./config.json");
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const colors = require("colors");
require("./functions/commands");

client.once("ready", () => {
	console.log("ready");
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
