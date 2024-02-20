function handleGreetCommand(bot, chatId, args) {
    if (args.length !== 1) {
        bot.sendMessage(chatId, 'Gunakan /greet [nama]');
    } else {
        const greeting = `Halo, ${args[0]}! Selamat datang.`;
        bot.sendMessage(chatId, greeting);
    }
}


function handleOwnerCommand(bot, msg) {

                    const ownerId = global.ownerNumber;
                    const ownerContact = `\nhttps://wa.me/${ownerId}\nhttps://t.me/dzaki_sc // Telegram`;
                    
                    bot.sendMessage(msg.chat.id, `Kontak Owner: ${ownerContact}`);     
}

const handleHelpCommand = (bot, msg, chatId) => {
    bot.sendMessage(msg.chat.id, `Jika ada kerusakan, kesalahan ketik.\nTolong memberitahu Owner dengan cara /owner`);
};

module.exports = {
     handleGreetCommand,
     handleOwnerCommand,
     handleHelpCommand
};
