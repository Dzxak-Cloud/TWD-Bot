const bot = require('./telegram/bot');
require('./discord/bot');
// require('./public/game/Pacman-main/server');
const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const { start } = require('./spinner');
const chalk = require('chalk');
const serveIndex = require('serve-index');
const path = require('path');
const app = express();
// socket
// Socket connection
var http = require('http')
/* Creates new HTTP server for socket */
var socketServer = require('http').createServer(app);
var io = require('socket.io')(socketServer);

/* Listen for socket connection on port 3002 */
socketServer.listen(3002, function(){
console.log('Socket server listening on : 3002');
});

/* This event will emit when client connects to the socket server */
io.on('connection', function(socket){
console.log('Socket connection established');
});

/* Create HTTP server for node application */
var server = http.createServer(app);

/* Node application will be running on 3000 port */
server.listen(3000);
// app.use(express.static('.'), serveIndex('.', { 'icons': true }));
// Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async function(req, res) {
  console.log("User is on home page");
  res.sendFile(path.join(__dirname + '/public/index.html'));
}); 
// game web
app.get('/game', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/game/index.html'));
}); 
// style css file
app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/style.css'));
});
// script js file
app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/script.js'));
});
//

app.get('/status', (req, res) => {
  const botStatus = bot.isPolling() ? 'Public' : 'Private';
  res.send(`Bot Status: ${botStatus}`);
});

app.post('/public', async (req, res) => {
  try {
    await bot.startBot();
    console.log(chalk`{blue Bot Public}`);
    res.redirect('/');
  } catch (error) {
    console.error('Error Public bot:', error);
    res.status(500).send('Error Public bot');
  }
});

app.post('/restart', async (req, res) => {
  try {
    await bot.restartBot();
    console.log('Bot Restarted');
    res.redirect('/');
  } catch (error) {
    console.error('Error restarting bot:', error);
    res.status(500).send('Error restarting bot');
  }
});

app.post('/private', async (req, res) => {
  try {
    await bot.stopBot();
    console.log(chalk`{red Bot Private}`);
    res.redirect('/');
  } catch (error) {
    console.error('Error Private bot:', error);
    res.status(500).send('Error Private bot');
  }
});

// app.listen(port, () => {
//   console.log(chalk`{blue RUNNING ON: http://localhost:${port}}`);
// });
app.listen(80, '0.0.0.0', function() {
  // console.log('Listening to port:  ' + 3000);
  console.log('http://192.168.1.29:80')
}); 
// console.clear()
// start('', ' ');
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
