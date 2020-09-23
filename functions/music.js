const config = require("../config.json");
const { Client } = require("discord.js");
const client = new Client();
const ytdl = require("ytdl-core");
const pathToFfmpeg = require("ffmpeg-static");

client.on("message", async (msg) => {
	if (msg.author.bot) return;

	if (msg.content.startsWith(config.prefix)) {
		const mensaje = msg.content.slice(config.prefix.length).trim().split(/ +/);
		const comando = mensaje.shift().toLowerCase();

		// Music
		if (comando === "music") {
			if (msg.member.voice.channel) {
				const connection = await msg.member.voice.channel.join();
				try {
					connection.play(
						ytdl("https://www.youtube.com/watch?v=jfX07JYnQYo", {
							quality: "highestaudio",
						}),
						{ volume: 0.3 }
					);
				} catch (err) {
					console.log(err);
				}
				return;
			}
			msg.channel.send(
				`${msg.author} tienes que estar en un canal de voz para reproducir música :headphones:`
			);
			return;
		}

		// Play url de YT
		if (comando === "play") {
			const connection = await msg.member.voice.channel.join();
			if (!mensaje[0]) {
				msg.channel.send(
					`${msg.author} tienes que enviar un enlace de YouTube para reproducir.`
				);
			}
			if (msg.member.voice.channel) {
				msg.channel.send(`Reproduciendo...`);
				try {
					connection.play(
						ytdl(mensaje[0], {
							quality: "highestaudio",
						}),
						{ volume: 0.3 }
					);
					return;
				} catch (err) {
					msg.channel.send(
						"Enlace de YouTube no ha sido introducido correctamente"
					);
					return;
				}
			}
			msg.channel.send(
				`${msg.author} tienes que estar en un canal de voz para reproducir música :headphones:`
			);
			return;
		}
	}
});

client.login(process.env.TOKEN);
