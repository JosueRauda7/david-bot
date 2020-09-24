const config = require("../config.json");
const { Client, MessageEmbed, Message } = require("discord.js");
const client = new Client();

require("./music");

client.on("message", (msg) => {
	if (msg.author.bot) return;

	if (msg.content.startsWith(config.prefix)) {
		const mensaje = msg.content.slice(config.prefix.length).trim().split(/ +/);
		const comando = mensaje.shift().toLowerCase();
		if (comando === "help") {
			const embedMessage = new MessageEmbed()
				.setTitle("Lista de comandos")
				.setDescription(
					'Para usar comandos debes usar "!"\nEjemplo: !music\n\nLos comandos son:\n' +
						"- help: pedir ayuda.\n\n" +
						"Disponibles en canal de voz:\n" +
						"- music: poner música.\n" +
						"- play [enlace de Youtube]: reproducir música con enlace de YouTube." +
						"- stop: detener música."
				)
				.setColor("#eeeeee");
			msg.channel.send(embedMessage);
			return;
		}
	}
});

client.login(process.env.TOKEN);
