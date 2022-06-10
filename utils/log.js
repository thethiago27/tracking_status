const fs = require("fs");


const createLog = async (data) => {
    fs.writeFileSync('./logs.json', JSON.stringify(data));
}

const getLog = async () => {

    const logFile = fs.readFileSync('./logs.json', 'utf8');
    return JSON.parse(logFile);
}

module.exports = { getLog, createLog };