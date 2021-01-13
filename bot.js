const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const readline = require('readline');

require('dotenv').config();

client.login(process.env.BOTTOKEN);

client.on('message', gotMessage);
client.on('ready', onReady);

const botId = '795751008004210688';

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

const facepalmGifs = [
	'https://tenor.com/udI6.gif',
	'https://tenor.com/o4u5.gif',
	'https://tenor.com/Z4Di.gif',
	'https://tenor.com/EOpu.gif',
	'https://tenor.com/EOpu.gif'
]

var commands = new Array();
var commandMessages = new Array();
var pastaCooldown = new Date();

function onReady() {
	console.log('authenticated');
	const readInterface = readline.createInterface({
		input: fs.createReadStream('messages.txt'),
		output: process.stdout,
		console: false
	});
	
	readInterface.on('line', function(line) {
		const singleCommandName = /^!\w*$/;
		
		if (singleCommandName.test(line)) {
			commands.push(line);
		}
		else {
			const messageLine = line.split('=');
			commands.push(messageLine[0]);
			commandMessages.push({
				"command": messageLine[0],
				"message": messageLine[1]
			});
		}
	});
	
	readInterface.on('close', function(line) {
		commands = commands.sort();
	});
}

function gotMessage(msg) {
	commandMessages.forEach(commandMessage => {
		if (msg.content === commandMessage.command) {
			msg.channel.send(commandMessage.message);
		}
	});
	if (msg.content === '!karp') {
		const index = Math.floor(Math.random() * karpReplies.length);
		msg.channel.send(karpReplies[index]);
	}
	else if (msg.content === '!gocha') {
		const index = Math.floor(Math.random() * gochaReplies.length);
		msg.channel.send(gochaReplies[index]);
	}
	else if (msg.content === '!pastakarp') {
		var pastaTime = new Date();
		if (pastaTime.getTime() - pastaCooldown.getTime() > 60000) {
			pastaCooldown = pastaTime;
			fs.readFile('fanatyk-karpi.txt', 'utf8', function(err,data) {
				if (err) {
					return console.log(err);
				}
				
				const messages = data.split(';');
				messages.forEach(message => msg.channel.send(message));
			});
		}
	}
	else if (msg.content === '!facepalm') {
		const index = Math.floor(Math.random() * (facepalmGifs.length + 2));
		if (index == facepalmGifs.length) {
			msg.channel.send({files: ['./images/bear.png']});
		}
		else if (index == facepalmGifs.length + 1) {
			msg.channel.send({files: ['./images/triple-face-palm.png']});
		}
		else {
			msg.channel.send(facepalmGifs[index]);
		}
	}
	else if (msg.content === '!commands') {
		msg.channel.send('Mam takie komendy:\n' + commands.join(',\n'));
	}
	else if (msg.content === '!pog') {
		msg.channel.send({files: ['./images/PogFish.png']});
	}
	else if (msg.content?.startsWith('!losuj')) {
		lottery(msg);
	}
	console.log(msg.content);
}

function lottery(msg) {
	const commandParams = msg.content.split(' ');
	const userParam = commandParams.length > 1 ? ((isNaN(commandParams[1]) || Number(commandParams[1]) < 1) ? 1 : Number(commandParams[1])) : 1;
	const timeParam = commandParams.length > 2 ? ((isNaN(commandParams[2]) || Number(commandParams[2]) < 1) ? 60 : Number(commandParams[2])) : 60;
	
	const userText = userParam > 1 ? 'Karpików' : 'Karpia'
	msg.channel.send('Zaczynamy losowanie ' + userParam + ' ' + userText + '! Losowanie kończy się za ' + timeParam + ' sekund. Aby wziąć udział w losowaniu zareaguj :fish: na powyższą wiadomość!');
	msg.react('🐟');
	setTimeout(() => { msg.channel.send('Losowanie kończy się za ' + timeParam/2 + ' sekund!') }, timeParam/2*1000);
	msg.awaitReactions((reaction, user) => reaction.emoji.name === '🐟', { time: timeParam*1000 })
		.then(collected => {
			if (collected.get('🐟').count < (userParam + 1)) {
				msg.channel.send('Niewystarczająca ilość karpików zareagowała na wiadomość 🙁');
			}
			else {
				var selectedUsers = new Array();
				
				while (selectedUsers.length < userParam) {
					var selectedUser = collected.get('🐟').users.cache.randomKey(1);
					
					console.log(selectedUser);
					if (selectedUser != botId) {
						selectedUsers.push(selectedUser);
					}
				}
				
				msg.channel.send('Wylosowane Karpiki:\n' + selectedUsers.map(user => '<@' + user + '>').join(',\n'));
			}
		})
		.catch(console.error);
}