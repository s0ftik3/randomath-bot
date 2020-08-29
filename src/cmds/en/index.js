const startCommand = require('./menu');
const trainCommand = require('./train');
const helpCommand = require('./help');
const backCommand = require('./back');
const testCommand = require('./test');
const achievementsCommand = require('./achievements');
const optionsCommand = require('./options');

const backTrain = require('./backTrain');

module.exports = {
    startCommand,
    helpCommand,
    trainCommand,
    backCommand,
    testCommand,
    backTrain,
    optionsCommand,
    achievementsCommand
}