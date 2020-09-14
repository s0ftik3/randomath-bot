const startCommand = require("./menu");
const trainCommand = require("./train");
const helpCommand = require("./help");
const backCommand = require("./back");
const achievementsCommand = require("./achievements");
const optionsCommand = require("./options");

const backTrain = require("./backTrain");

module.exports = {
  startCommand,
  helpCommand,
  trainCommand,
  backCommand,
  backTrain,
  optionsCommand,
  achievementsCommand,
};