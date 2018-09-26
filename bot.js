
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message', message => {
	if(message.content === "!Nityan"){
		sendFile('Nityan',message);
	}
	if(message.content === "!Ennis"){
		sendFile('Ennis',message);
	}
	if(message.content === "!Dom"){
		sendFile('Dom',message);
	}
	if(message.content === "!Tony"){
		sendFile('Tony',message);
	}
	if(message.content === "!Brody"){
		sendFile('Brody',message);
	}
	if(message.content === "!Squad"){
		sendFile('Squad',message);
	}
	if(message.content === "!Steven"){
		sendFile('Steven',message);
	}
});

client.login('NDk0MDA2NjEzMjE3MjQ3MjMy.DotP3A.v8U8cRyVRrJW_vViTTDSXPnDKsw');

function sendFile(name,message){
		const dir = `./images/${name}/`;
		var length;
		fs.readdir(dir, (err, files) => {

  			length = files.length;
  			var random = Math.floor(Math.random() * length) +1;
  			var file = files[random-1];

  			const attachment = new Discord.Attachment(`./images/${name}/${file}`);
			message.channel.send(attachment);
		});
}