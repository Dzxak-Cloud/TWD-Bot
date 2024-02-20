// settings.js
const fs = require('fs');
const chalk = require('chalk');
const sessionFolder = './sessions/';
const tokenFilePath = sessionFolder + 'token.txt';

global.footert = 'TELE BOT'
// global.spofity_cid = 'ec822bd0f3a8437ba7243cd67bab1d65' // SPOTIFY_CLIENT_ID
// global.spofity_cs = '82bcc0246e714ac181930b4ddb2103ec' // SPOTIFY_CLIENT_SECRET
global.owner = ['dzaki_sc']
global.ownerId = '6913188344'
global.token = '6596069281:AAGj1XbrHItFU8wrLap0t9uYEgNUpxYzsew'
global.ownerNumber = ['6285162713889 // WhatsApp']
global.author = 'Dzaki'
token = 'MTE2NjY4MDE3MjEzMzYyOTk4Mg.Gr_2KC.tP50asUDNP4H4qQWyqB_JkI4A9cLks7mb4gCtE'
global.version = '1.0.0'
global.LUpdate = '23, Desember, 2023'
global.mess = {
    owner: 'Fitur Khusus Owner Bot',
    jangan: `Fitur ini hanya bisa di gunakan oleh group yang sudah ditambahkan secara manual oleh ${global.owner}. Jika mau silahkan private message ${global.owner}.`,
}

// Buat folder session jika belum ada
if (!fs.existsSync(sessionFolder)) {
    fs.mkdirSync(sessionFolder);
}
module.exports = {
    getTelegramBotToken() {
        try {
            return fs.readFileSync(tokenFilePath, 'utf-8').trim();
        } catch (error) {
            return null;
        }
    },

    setTelegramBotToken(token) {
        fs.writeFileSync(tokenFilePath, token);
    },
};

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
