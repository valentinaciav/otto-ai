const _ = require('underscore');

// Replace the console with a better console with colors
require('console-ultimate/global').replace();

// Define constants
global.__basedir = __dirname;
global.__tmpdir = __dirname + '/tmp';
global.__cachedir = __dirname + '/cache';
global.__publicdir = __dirname + '/public';
global.__etcdir = __dirname + '/etc';

// Read the config and expose as global
global.config = _.defaults(require('./config.json'), {
	
	// The UID used for your current AI instance to link other sessions with the same UID
	"uid": null,

	// A regex activator used to wakeup the AI in group messages
	"aiNameRegex": null,

	// A list of IO drivers to activate on boot for this instance
	"ioDrivers": [],

	// A list of Schedulers to run every tick
	"scheduler": [],

	// The source language of the AI
	"language": "en",

	// The source locale of the AI
	"locale": "en-US",

	"play": {
		// Additional args to send to SOX
		"addArgs": [], 
	},

	// Snowboy configuration
	"snowboy": {
		"apiKey": null,
		"hotword": null
	},

	// A Boolean value indicating if the AWH (API.AI Web Hook) should be spawn
	"awh": false,

	// An object indicating the port and the domain where the eventual server should be spawn, false otherwise
	"server": {
		"port": 8080,
		// The domain used for absolute URIs
		"domainWithPort": null
	},

	// A list of credentials for the Mongo connection
	"mongo": {
		"host": "db",
		"port": 27017,
		"database": "admin",
		"user": "admin",
		"password": null
	},

	// API.AI configuration
	"apiai": {
		"token": null
	},

	// IO/Telegram configuration
	"telegram": {
		"writeKeySpeed": 1,
		"token": null,
		"options": {
			"polling": true
		}
	},

	// IO/Kid configuration
	"kid": {
		// Timeout after the conversation should expire
		"eocMax": 10
	},

	// IO/Messenger configuration
	"messenger": {
		"token": null,
		"verify": null,
		"appId": null,
		"appSecret": null,
		// Port where webhook should listen
		"port": null
	},

	// Facebook app configuration
	"facebook": {
		"appId": null,
		"secret": null,
		"pageId": null,
		// The page token used concatenating access-token + secret
		"accessToken": null
	},

	// Google Cloud configuration
	"gcloud": {
		"cseId": null,
		"apiKey": null,
	},

	// Spotify configuration
	"spotify": {
		"clientId" : null,
		"clientSecret" : null
	},

	// Wolfram configuration
	"wolfram": {
		"appId": null
	},

	// MusixMatch configuration
	"musixmatch": {
		"apiKey": null
	},

	// Wunderground configuration
	"wunderground": {
		"apiKey": null
	},

	// Transmission configuration
	"transmission": {
		"host": null,
		"port": null,
		"username": null,
		"password": null,
		"ssl": false
	},

	// MIIO configuration
	"miio": {
		"devices": [
			{
				"name": null,
				"id": null,
				"token": null
			}
		]
	},

	"polly": {
		"gender": "Female"
	}

});

if (config.uid == null) {
	console.error("Please define config.uid with your Universal ID (username)");
	process.exit(1);
}

if (config.aiNameRegex == null) {
	console.error("Please define config.aiNameRegex with the Regex used to activate via text your AI");
	process.exit(1);
}

global.AI_NAME_REGEX = new RegExp(config.aiNameRegex, 'mgi');

// Global (App) packages
require(__basedir + '/src/helpers');
global.mongoose = require(__basedir + '/src/mongoose');
global.Data = require(__basedir + '/src/data');
global.AI = require(__basedir + '/src/ai');
global.IOManager = require(__basedir + '/src/iomanager');
global.Scheduler = require(__basedir + '/src/scheduler');
global.Actions = require(__basedir + '/src/actions');