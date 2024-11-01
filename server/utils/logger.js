
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/actions.log');

const logAction = (action, details) => {
    const logEntry = `${new Date().toISOString()} - ${action}: ${JSON.stringify(details)}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error('Error logging action:', err);
    });
};

module.exports = logAction;
