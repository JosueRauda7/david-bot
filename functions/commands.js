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
						"- !help: pedir ayuda. :question:\n\n" +
						"Disponibles en canal de voz:\n" +
						"- !music: poner música. :notes:\n" +
						"- !play [enlace de Youtube]: reproducir música con enlace de YouTube.:headphones:\n" +
						"- Ejemplo: !play https://www.youtube.com/watch?v=BEA0YMm4lcE\n" +
						"- stop: detener música. :no_entry_sign:"
				)
				.setColor("#ffd73e");
			msg.channel.send(embedMessage);
			return;
		}
	}
});

client.login(process.env.TOKEN);
