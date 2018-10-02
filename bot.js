
const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
var config = require("./config.json");
var key = config.key;


const {google} = require('googleapis');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = 'token.json';
var auth;

// discord setup
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(key);
 
// google credential setup
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content));
});

function authorize(credentials) {
	// setting variables based on gapi credentials
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Make sure we have previously stored a token
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return console.log("Error getting access token");

    oAuth2Client.setCredentials(JSON.parse(token));
    auth = oAuth2Client;
    console.log('authorized');
  });
}

client.on('message', message => {
	if(message.content === "!Nityan"){
		sendFile('nityan',message);
	}
	if(message.content === "!Ennis"){
		sendFile('ennis',message);
	}
	if(message.content === "!Dom"){
		sendFile('dom',message);
	}
	if(message.content === "!Tony"){
		sendFile('tony',message);
	}
	if(message.content === "!Brody"){
		sendFile('brody',message);
	}
	if(message.content === "!Squad"){
		sendFile('squad',message);
	}
	if(message.content === "!Steven"){
		sendFile('steven',message);
	}
});



function sendFile(name,message){
	const drive = google.drive({version: 'v3', auth});

	drive.files.list({ // do a large query just for the name
	    q: `name contains \"${name}\"`,
	    pageSize: 300
	}, (err, res) => {
	    if (err) return console.log('The API returned an error: ' + err);
	    const files = res.data.files;
	    const length = files.length -1; // -1 because this does not filter out the directory name

	    var random = Math.floor(Math.random() * length);
	    var id = files[random].id; // we now have the id of the random file we want, now we need to get the file data

	    var fname = files[random].name; // we need to extract the file extension
    	var index = fname.indexOf('.')
    	var ext = fname.substring(index);
    	ext = ext.toLowerCase();
    	console.log(ext);
	    var dest = fs.createWriteStream(`./test${ext}`);
	     drive.files.get({fileId: id, alt: 'media'}, {responseType: 'stream'},
		  function(err, res){
		     res.data
		     .on('end', () => {
		        console.log('done');
		     })
		     .on('error', err => {
		        console.log('Error', err);
		     })
		     .pipe(dest).on('finish', function(){ // once we finished outputting to the file we send the attachment
		     	const attachment = new Discord.Attachment(`./test${ext}`);
				message.channel.send(attachment);
		     })
		  })
		});
}