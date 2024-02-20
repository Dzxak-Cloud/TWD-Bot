const fs = require('fs');

function handleAddGroup(ctx) {
    const chatId = ctx.message.chat.id;
    const groupName = ctx.message.chat.title;

    if (!isOwner) {
        bot.sendMessage(msg.chat.id, `${mess.owner}`);
        return;
    }

    // Check if the user is the owner (replace OWNER_ID with the actual owner's user ID)
    if (ctx.message.from.id !== !isOwner) {
        return ctx.reply('You are not the owner of this bot.');
    }

    // Load existing group data from the JSON file
    let groupData = {};
    try {
        const rawData = fs.readFileSync('./lib/database/group.json', 'utf8');
        groupData = JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading group data:', error.message);
    }

    // Check if the group is already in the database
    if (!groupData[chatId]) {
        // Add the group to the database
        groupData[chatId] = {
            groupName,
            addedBy: ctx.message.from.username,
            dateAdded: new Date().toISOString(),
        };

        // Save the updated group data to the JSON file
        try {
            fs.writeFileSync('./lib/database/group.json', JSON.stringify(groupData, null, 2), 'utf8');
            ctx.reply('Group added successfully!');
        } catch (error) {
            console.error('Error writing group data:', error.message);
            ctx.reply('Failed to add the group. Please try again later.');
        }
    } else {
        ctx.reply('This group is already in the database.');
    }
}

function handleDelGroup(ctx) {
    // Implement the logic for delgroup here
    // Similar structure to handleAddGroup

    ctx.reply('Not implemented yet.');
}

function handleListGroup(ctx) {
    // Implement the logic for listgroup here
    // Similar structure to handleAddGroup

    ctx.reply('Not implemented yet.');
}

module.exports = {
    handleAddGroup,
    handleDelGroup,
    handleListGroup,
};
