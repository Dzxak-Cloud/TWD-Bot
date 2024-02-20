const chalk = require('chalk');
const fs = require('fs')
require('dotenv').config();
require("./rc");
require('./config');
const moment = require('moment-timezone');
const currentTime = getCurrentTimeWIB();
function getCurrentTimeWIB() {
    // Mendapatkan waktu saat ini dengan zona waktu WIB
    const currentTimeWIB = moment().tz('Asia/Jakarta').format('h:mm:ss A');
  
    return currentTimeWIB;
  }
const { Client, GatewayIntentBits  } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent

    ],
	partials: [
		'MESSAGE'
	]
});
client.on('ready', (c) => {
	console.log(chalk
`{red ----------- 	  {blue |}  -----------}
{blue ${global.footer} 	  |  ${global.footert}}
{white Login as:   	  {blue |}  Login as:}
{blue ${c.user.tag}  |  fame_i_bot}
{red -----------} 	  {blue |}  {red -----------}
`);
});

client.on('messageCreate', (msg) => {
	if (msg.author.bot) {
		return;
	}
	console.log(chalk`
{red -----------}
{blue Discord: ${msg.author.displayName}}
{green ==} ${msg.content}
{red -----------}`);
})

client.on('messageCreate', (msg) => {
	if (msg.author.bot) {
		return;
	}
	if (msg.content === 'hello') {
        msg.reply(`Hello @${msg.author.displayName}`);	
    }
	if (msg.content === 'ct') {
        msg.reply(`Current Time in Jakarta: ${currentTime}`);	
    }
});

client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'hello') {
		interaction.reply('World');
	}
	if (interaction.commandName === 'ping') {
		interaction.reply('Pong!');
	}
})


client.login(process.env.TOKEN_DC);

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
