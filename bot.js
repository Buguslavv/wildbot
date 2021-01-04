﻿const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.login(process.env.BOTTOKEN);

client.on('ready', redyDiscord);

function redyDiscord() {
	console.log('authenticated');
}

client.on('message', gotMessage);

const replies = [
	'Karp to najlepsza ryba!',
	'To prawda, karp jest rybą i nikt temu nie zaprzeczy. Nawet maruda Wilu.',
	'Karp jest rybą!',
	'Karp to ryba'
]

function gotMessage(msg) {
	if (msg.content === '!karp') {
		const index = Math.floor(Math.random() * replies.length);
		msg.channel.send(replies[index]);
	}
	console.log(msg.content);
}

console.log("test");