const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

client.login(process.env.BOTTOKEN);

client.on('message', msg => {
	if (msg.content === '!pomagamy') {
		var text = "Pomóż Majeczce! :)";
		msg.channel.send({files: ['./images/majeczka.jpg']});
		msg.react(':regional_indicator_c:');
	}
});