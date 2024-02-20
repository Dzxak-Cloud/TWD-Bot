const handleIfameCommand = (bot, msg, isOwner) => {
    if (!isOwner) {
        bot.sendMessage(msg.chat.id, `${mess.owner}`);
        return;
    }
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'ON', callback_data: 'on' },
                    { text: 'DOWN', callback_data: 'down' },
                    { text: 'SUS', callback_data: 'sus' },
                ],
            ],
        },
    };

    bot.sendMessage(msg.chat.id, 'Pilih:', options);
};


const handleInfoCommand = (bot, msg, ifameStatus) => {
    bot.sendMessage(msg.chat.id, `FAME-PS Sedang ${ifameStatus.toUpperCase()}`);
};


module.exports = {
    handleIfameCommand,
    handleInfoCommand
};