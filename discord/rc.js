const chalk = require('chalk');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

    const commands = [
        {
            name: 'hello',
            description: 'replies with World'
        },
        {
            name: 'ping',
            description: 'replies with Pong!'
        },
        {
            name: 'embed',
            description: 'embed!'
        }
    ];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN_DC);

(async () => {
    try {
        console.log(chalk`{blue REGIS SLASH}..`);
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID_DC, process.env.GUILD_ID_DC), 
            { body: commands}
        )
        console.log(chalk``);
    } catch(error) {
        console.log(chalk`{red Ada error di sini} ${error}`);
    }
})(); 
