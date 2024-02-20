// bot.js
const TelegramBot = require('node-telegram-bot-api');
const fs = require("fs");
const path = require('path');
require('./settings');
const { constrainedMemory } = require('process');
const bot = new TelegramBot('6596069281:AAGj1XbrHItFU8wrLap0t9uYEgNUpxYzsew', { polling: true });
// const bot = new Telegraf(getTelegramBotToken);
const { handleIfameCommand, handleInfoCommand} = require('./plugins/fame');
const { handleGreetCommand, handleOwnerCommand, handleHelpCommand} = require('./plugins/ocmd');
const { arch } = require('os'); 
// const { Markup } = require('telegraf');
// const domainFunctions = require('./plugins/domain');
const axios = require('axios');
const moment = require('moment-timezone');
const chalk = require('chalk');
const ownerChatId = `${global.ownerId}`;
const currentTime = getCurrentTimeWIB();
function getCurrentTimeWIB() {
    // Mendapatkan waktu saat ini dengan zona waktu WIB
    const currentTimeWIB = moment().tz('Asia/Jakarta').format('h:mm:ss A');
  
    return currentTimeWIB;
  }
const allowedGroups = "-1002099569903";
const KEYBOARD = {
    reply_markup: JSON.stringify({
        keyboard: [
            ['---Group Menu---'],
            ['/listdomain', '/info', '/userinfo'],
            ['--Other Menu---'],
            ['/myip', '/greet', '/help'],
            ['/owner', '/totalfitur', '/hub'],
            ['/om']
        ],
        resize_keyboard: true,
    })
}
const OWNERKEYBOARD = {
    reply_markup: JSON.stringify({
        keyboard: [
            ['---Owner Menu---'],
            ['/ifame','/link'],
            ['/hub']
        ],
        resize_keyboard: true,
    })
}
// Fungsi untuk membuat Inline Keyboard
// Catat peristiwa pengiriman pesan
const getUserInfo = (msg) => {
    const user = msg.from;
    const chat = msg.chat;

    let userInfo = `USERNAME = @${user.username || 'N/A'}\n`;
    userInfo += `USER_ID = ${user.id}\n`;

    if (chat.type === 'group' || chat.type === 'supergroup') {
        userInfo += `GROUP_ID = ${chat.id}\n`;
    }

    userInfo += `Lang = ${user.language_code || 'N/A'}`;

    return userInfo;
};
// jangan
// Check if the message is from a group and is in the allowed groups

// bts
// Variabel untuk menunjukkan status ifame
let ifameStatus = 'on'; 

//total fitur case
const totalFitur = () => {
    var mytext = fs.readFileSync("./telegram/bot.js").toString();
    var numUpper = (mytext.match(/case\s+'.*?'/g) || []).length;
    return numUpper;
}

const totalFiturbot = () => {
    var mytext = fs.readFileSync("./telegram/bot.js").toString();
    var numUpper = (mytext.match(/bot\.onText\s*?\(/g) || []).length;
    return numUpper;
}
// batas  
// group fungsi
const dgroup = `${global.groupId}`;
// batas group fungsi

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text.toLowerCase();

    const [command, ...args] = messageText.split(' ');


// Pemeriksaan apakah pengguna adalah pemilik bot
// Fungsi untuk memeriksa apakah pengguna adalah pemilik (owner) bot
const isOwner = (msg) => {
    const pathToOwnerJson = path.join(__dirname, 'telegram/database/owner.json');
    try {
        const ownerIds = JSON.parse(fs.readFileSync(pathToOwnerJson, 'utf-8'));
        return ownerIds.includes(msg.from.id.toString());
    } catch (error) {
        console.error('Error reading owner.json:', error.message);
        return false;
    }
};
// parse_mode html //
bot.onText(/\/link/, (msg) => {
    const chatId = msg.chat.id;
    // Menggunakan HTML untuk membuat hyperlink
    const linkText = 'Google';
    const linkUrl = 'https://www.google.com';
  
    const message = `Klik di sini untuk kunjungi <a href="${linkUrl}">${linkText}</a>`;
    bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  });
// end parse
// domain
bot.onText(/\/cd1 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'XrhLR2AB9e5RvHs-BQJiFI3v_SEx-7q57HcffiDn';
    const cloudflareZoneId = 'a97316c2d6861ec74fc8b63282d7b54f';
    const cloudflareTLD = 'dzxak.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd2 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'jJceOyzbnad4chQZqogEqdQmBg6GczMvf7ftE7IL';
    const cloudflareZoneId = 'ea1164fede588aa789aba67ce6462117';
    const cloudflareTLD = 'dzxak-cloud.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd3 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'S9vpD52WJQuRRSMd5InaOJAHTuC1grAUAtyzCI_I';
    const cloudflareZoneId = '2b2578de0d3fc591e48c4b183aa2d15f';
    const cloudflareTLD = 'ditzpanel.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd4 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'mjR4BdiOo6aFO3uPl8BTgMqcHrZkArCxbYJaa_jiIPxJNxfRvAFaWie1Y__j5';
    const cloudflareZoneId = '39bb2cadd4c38dfff53c5648cb0e4cc1';
    const cloudflareTLD = 'ditzoffc.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd5 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'lZ0XMXdnwp2L1DsI3f8frkPwvkQ6ENee2PnAfOsY';
    const cloudflareZoneId = '2bb49b2de0cbf75c0462ed90d7d333e1';
    const cloudflareTLD = 'cafegt.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd6 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'HsUwdzxuVhReE6Fy9rHXP-8Ee-k5XcrECn38BG6N';
    const cloudflareZoneId = '610339f238cd3edf6e0744d3800b1c23';
    const cloudflareTLD = 'ditzxdzak.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd7 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = '9gFG-ukCTa6mIEGrWTRtE7mnDbFVvRmzRovtk3TO';
    const cloudflareZoneId = 'd83c5ac7ea30ce273256b0644972b4a9';
    const cloudflareTLD = 'raditzoffc.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd8 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'oUpof7DcQTNHMme4_wo0ftcBEbDWDY1PaJivGPpX';
    const cloudflareZoneId = '1c88ef42cd8081702c15d0b58a150cb2';
    const cloudflareTLD = 'daniloffc.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd9 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'bMiZlOhkSzozUq1jMLO5bk4OeZr0GllyVtVWX1F4';
    const cloudflareZoneId = '9b28f4ad0f06b36dd94cc56b01efc19a';
    const cloudflareTLD = 'plerkuda.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd10 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = '1W9IHC9mLAKj8hQaMjczy0gA3Of7kPjJ3gAvTlnZ';
    const cloudflareZoneId = '98264c6c53c5bc9080230b077422d748';
    const cloudflareTLD = 'adminpanel.biz.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd11 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'OajJ0jtCB0FTFwfdiTB_ktzNKFWAmsENFdlE4Hvd';
    const cloudflareZoneId = '5024bc4a02924cf69ddf4dfa6ee96069';
    const cloudflareTLD = 'dewapanel.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd12 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = '33F2gfJ0cEoLv4NlEqLYGd6Ahc5_dzyUH_ClKuX_';
    const cloudflareZoneId = '8132a433dc4eea653e38e168f2f45fc0';
    const cloudflareTLD = 'jasapanel.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd13 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'mjR4BdiOo6aFO3uPl8BTgRTe9hBdh_-nt0wzOvYN183JyQC011yaiodQ7Po1b';
    const cloudflareZoneId = 'd318f96a6327c5340d136415e860f545';
    const cloudflareTLD = 'kangpanel.biz.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd14 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = '54kx4yvi3CBqomC99WSaqZo9tbxHoe9U';
    const cloudflareZoneId = 'cada0ecef8f1e8d904435d469aef1b05';
    const cloudflareTLD = 'mypanel.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd15 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'fxR0JgMIVwd0wvGIeBTymygdSMx1yNAN12lN8ure';
    const cloudflareZoneId = '6c4af9293eed7ea87c94d8effe5f2de2';
    const cloudflareTLD = 'panellprivate.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd16 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'BP2uUPgVfrM4pHW_ivo2AawAyiLqOMYoLYyS2BF7';
    const cloudflareZoneId = '8080d914883ed0b9e17d281f593df945';
    const cloudflareTLD = 'sellerpanel.biz.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd17 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'qwAWquCm1cqKEzZnZUEuAbfFq3PCOLleQZifxPog';
    const cloudflareZoneId = '4049d75623d46e90d616fdf878a5ed84';
    const cloudflareTLD = 'store-panel.biz.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd18 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'SgON4r6174fMe3h3B9wyP3caEtwUIfnVuNvSpl1k';
    const cloudflareZoneId = '77c6588b3b36e74d07538e62ef91d6ba';
    const cloudflareTLD = 'tokopanel.biz.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd19 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'ycq92Hz_KkhfnVPp-Zo83AtKIUaErg1UmkHRckm';
    const cloudflareZoneId = 'fb953c98b23bc7619f0e54701db07878';
    const cloudflareTLD = 'xmartpanel.my.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
bot.onText(/\/cd20 (.+)/, (msg, match) => {
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);



    const cloudflareApiToken = 'dYQuhL6RuDLbGh3-I4BXNyM62YwPqZcjwkw2guOh';
    const cloudflareZoneId = '3f82cb7c0056c3327aaa8d9dd012c26e';
    const cloudflareTLD = 'dzxak.biz.id';
        if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }

    const raw = match[1].trim();
    const [name, ip] = raw.split("|").map(value => value.trim());   

    if (!name || !ip) {
        bot.sendMessage(msg.chat.id, "PENGGUNAAN /domain1 (name)|(ip vps)");
        return;
    }

    const subDomainData = {
        type: "A",
        name: `${name}.${cloudflareTLD}`,
        content: ip,
        ttl: 1, // Auto
        priority: 10,
        proxied: false
    };

    axios.post(
        `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/dns_records`,
        subDomainData,
        {
            headers: {
                Authorization: `Bearer ${cloudflareApiToken}`,
                "Content-Type": "application/json",
            },
        }
    ).then((response) => {
        const result = response.data.result;
        const link = `https://${result.name}`;

        bot.sendMessage(msg.chat.id, `┏━━━━━━━━━━━━━━━━━━━\n┣ Ip = ${result.content}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Link = ${link}\n┗━━━━━━━━━━━━━━━━━━━\n┣ Create By = ${global.nameBot}\n┗━━━━━━━━━━━━━━━━━━━`);
    }).catch((error) => {
        const errorMessage = error.response?.data?.errors?.[0]?.message || "Failed to add subdomain";
        bot.sendMessage(msg.chat.id, `Gagal membuat subdomain\nMsg: ${errorMessage}`);
    });
});
// DOMAIN SELESAI
// casebot.on('message', (msg) => {

    switch (command) {
        case '/hub':
                const owned = `${global.ownerNumber}@s.whatsapp.net`
                bot.sendMessage(chatId,`▬▭▬▭▬▭▬▭▬▭▬▭▬
「 *BOT INFO* 」
»⟩ Name Bot : ${global.nameBot}
»⟩ Creator : @${owned.split("@")[0]}
»⟩ Version : ${global.version}
»⟩ Last Update : ${global.LUpdate}
»⟩ Current time : ${currentTime}

┌─> MENU
│❏ /ifame
│❏ /listdomain
│❏ /info
│❏ /help
│❏ /hub
│❏ /myip
│❏ /math
│❏ /greet
│❏ /owner
│❏ /totalfitur
└──>

Powered By @${owned.split("@")[0]}
▬▭▬▭▬▭▬▭▬▭▬▭▬`, KEYBOARD);
                break;
                case '/om':
                    if (!isOwner(msg)) { return bot.sendMessage(chatId, mess.owner)}
                    bot.sendMessage(chatId, '»⟩ Owner Mode sudah menyala!.', OWNERKEYBOARD);
                    break;
                // default commands
        case '/help':
            handleHelpCommand(bot, msg, chatId);
            break;
        case '/greet':
            handleGreetCommand(bot, chatId, args);
                break;
        case '/owner':
            handleOwnerCommand(bot, msg);
                break;
            // fame-ps command
        case '/ifame':
            handleIfameCommand(bot, msg, isOwner);
                break;
        case '/info':
            handleInfoCommand(bot, msg, ifameStatus);
                break;
        case '/myip':
            if (!isOwner) return bot.sendMessage(chatId, mess.owner);        
                const http = require('http');
                    http.get({
                        'host': 'api.ipify.org',
                        'port': 80,
                        'path': '/'
                            }, function (resp) {
                    let data = '';
                    resp.on('data', function (chunk) {
                    data += chunk;
                        });
                        resp.on('end', function () {
                    bot.sendMessage(chatId, "🔎 My public IP address is: " + data);
                        });
                                                });          
                break;
        // batass
            }
        });
        
        bot.onText(/\/totalfitur/, (msg) => {
            const chatId = msg.chat.id;
            const message =  `
            Total Semua Fitur Bot Dengan System Case ===> ${totalFitur()}
Total Semua Fitur Bot Dengan System bot.onText ===> ${totalFiturbot()}`;
            bot.sendMessage(chatId, message,);
        })

        
        
        
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const thumbUrl = 'https://dzxak.my.id/foto/fame-ps.png';
    const captionText = `BOT FAME-PS SUDAH MENYALA\n/hub untuk memunculkan commands.`;

    bot.sendPhoto(chatId, thumbUrl, {
    caption: captionText, KEYBOARD,
    });    
});



  bot.onText(/\/listdomain/, (msg) => {
    const chatId = msg.chat.id;
    const jangan = msg.chat.type === 'group' && allowedGroups.includes(msg.chat.id);

    if (!jangan) {
        bot.sendMessage(msg.chat.id, `${mess.jangan}`);
        return;
    }
    
    const thumbUrl = 'https://dzxak.my.id/foto/fame-ps.png';
    const captionText = `╭──═[ *LIST SUBDOMAIN* ]═────
    ⋈ /cd1 dzxak.my.id
    ⋈ /cd2 dzxak-cloud.my.id    
    ⋈ /cd3 ditzpanel.my.id
    ⋈ /cd4 ditzoffc.my.id
    ⋈ /cd5 cafegt.my.id
    ⋈ /cd6 ditzxdzak.my.id
    ⋈ /cd7 raditzoffc.my.id
    ⋈ /cd8 daniloffc.my.id
    ⋈ /cd9 plerkuda.my.id
    ⋈ /cd10 adminpanel.biz.id
    ⋈ /cd11 dewapanel.my.id
    ⋈ /cd12 jasapanel.my.id
    ⋈ /cd13 kangpanel.biz.id
    ⋈ /cd14 mypanel.my.id
    ⋈ /cd15 panellprivate.my.id
    ⋈ /cd16 sellerpanel.biz.id
    ⋈ /cd17 store-panel.biz.id
    ⋈ /cd18 tokopanel.biz.id
    ⋈ /cd19 xmartpanel.my.id
    ⋈ /cd20 dzxak.biz.id
    ╰──────────────˧
    
    *NOTE :*
    *DOMAIN INI YANG BERSANGKUTAN DENGAN WHM / CPANEL OTOMATIS DI KICK + NOREFFUND !*
    
    MAU JOIN LAGI? GA NERIMA
    BAYAR? GA NERIMA
    
    ▬▭▬▭▬▭▬▭▬▭▬▭▬`;

    bot.sendPhoto(chatId, thumbUrl, {
    caption: captionText,
    });
});
        //==========================================//
        // test button

        //==========================================//


        bot.on('callback_query', (callbackQuery) => {
            const data = callbackQuery.data;
        
            if (data === 'on' || data === 'down' || data === 'sus') {
                ifameStatus = data;
                bot.answerCallbackQuery(callbackQuery.id, { text: `FAME-PS STATUS = ${ifameStatus.toUpperCase()}` });
            }
        });
        

// launch
bot.launch
// ss
bot.onText(/\/userinfo/, (msg) => {
    const chatId = msg.chat.id;
    const infoText = getUserInfo(msg);

    bot.sendMessage(chatId, infoText);
});


  
// Event handler untuk setiap pesan yang masuk
  // Event handler untuk setiap pesan yang masuk
  bot.onText(/.*/, (msg) => {
    const messageToOwner = `
      <b>Bot received a message:</b>
      <pre>${msg.text}</pre>
      <i>From user ${msg.from.id}</i>
    `;
    bot.sendMessage(ownerChatId, messageToOwner, { parse_mode: 'HTML' });
  });
  
  const sendBotRunningNotification = () => {
  const startMessageToOwner = `
            <b>Bot started!</b>`
  bot.sendMessage(ownerChatId, startMessageToOwner, { parse_mode: 'HTML' });
};
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'Unknown'; // Jika tidak ada username, gunakan 'Unknown'
    const chatType = msg.chat.type;
    const text = msg.text;
  
    console.log(chalk`
{red -----------}
{blue Telegarm: ${chatId}}{white /}{green ${username}}
{blue GROUP/PRIVATE}: ${chatType},
{blue TEXT}: ${text}
{red -----------}`);

  });

// Panggil fungsi notifikasi ketika bot dimulai
sendBotRunningNotification();

// Event handler untuk setiap pesan yang masuk
bot.stopBot = () => {
    return bot.stopPolling();
  };
  
  // Define a method to start the bot
  bot.startBot = () => {
    // Use appropriate method to start the bot
    return bot.startPolling();
  };
  
  // Define a method to restart the bot
  bot.restartBot = async () => {
    await bot.stopBot();
    return bot.startBot();
  };
  
  // Log jika bot sudah berjalan
  bot.on('polling_error', (error) => {
    console.log(`Polling error: ${error}`);
  });
  
  let file = require.resolve(__filename)
  fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
  delete require.cache[file]
  require(file)
  })
  module.exports = bot;