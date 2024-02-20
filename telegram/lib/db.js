// db.js

const fs = require('fs');
const path = require('path');

const premFilePath = path.join(__dirname, 'database', 'prem.json');

function getPremList() {
    try {
        const data = fs.readFileSync(premFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function addPrem(userId) {
    const premList = getPremList();
    if (!premList.includes(userId)) {
        premList.push(userId);
        savePremList(premList);
    }
}

function removePrem(userId) {
    const premList = getPremList();
    const index = premList.indexOf(userId);
    if (index !== -1) {
        premList.splice(index, 1);
        savePremList(premList);
    }
}

function savePremList(premList) {
    fs.writeFileSync(premFilePath, JSON.stringify(premList), 'utf-8');
}

module.exports = {
    // ... (fungsi-fungsi lain)
    getPremList,
    addPrem,
    removePrem,
};