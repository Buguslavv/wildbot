const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.login(process.env.BOTTOKEN);

client.on('ready', redyDiscord);

function redyDiscord() {
	console.log('authenticated');
}

client.on('message', gotMessage);

const karpReplies = [
	'Karp to najlepsza ryba!',
	'To prawda, karp jest rybą i nikt temu nie zaprzeczy. Nawet maruda Wilu.',
	'Karp jest rybą!',
	'Karp to ryba.'
]

const gochaReplies = [
	'Team Gocha!',
	'LULULULULULULULULULULU',
	'OHHHHHHHHH KITTTYYYYYYYYYYYY'
]

function gotMessage(msg) {
	if (msg.content === '!karp') {
		const index = Math.floor(Math.random() * karpReplies.length);
		msg.channel.send(karpReplies[index]);
	}
	else if (msg.content === '!wilu') {
		msg.channel.send('A któż to przyszedł? Pan maruda? Niszczyciel dobrej zabawy. Pogromca uśmiechów dzieci.');
	}
	else if (msg.content === '!laylaban') {
		msg.channel.send('Layla dostaje bana za gołąbki!');
	}
	else if (msg.content === '!nagimiban') {
		msg.channel.send('Nagimi has been permanently banned from this channel.');
	}
	else if (msg.content === '!myszon') {
		msg.channel.send('Chowajcie swoje ciasteczka, nadchodzi on! Pożeracz wszystkiego słodkiego i mięsnego.');
	}
	else if (msg.content === '!bbo') {
		msg.channel.send('Szykuj wodę! Nadszedł naczelny nawadniacz dzikiej rodziny.');
	}
	else if (msg.content === '!rafal') {
		msg.channel.send('Team Rafał!');
	}
	else if (msg.content === '!gocha') {
		const index = Math.floor(Math.random() * gochaReplies.length);
		msg.channel.send(gochaReplies[index]);
	}
	else if (msg.content === '!maslo') {
		msg.channel.send('Team masło!');
	}
	else if (msg.content === '!aris') {
		msg.channel.send('Czy ktoś tu ma niedobór przytulania? Aris tu jest żeby wyściskać wszystkie swoje dzieci!');
	}
	console.log(msg.content);
}