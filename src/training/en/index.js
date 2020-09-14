const addCommand = require('./add');
const subCommand = require('./sub');
const multCommand = require('./mult');
const devCommand = require('./div');
const compCommand = require('./comp');

const rightAdd = require('./rightAdd');
const rightSub = require('./rightSub');
const rightMult = require('./rightMult');
const rightDiv = require('./rightDiv');
const rightComp = require('./rightComp');

const defineMode = require('./mode');

const wrong = require('./wrong');
 
module.exports = {
    addCommand,
    subCommand,
    multCommand,
    devCommand,
    compCommand,
    rightAdd,
    rightSub,
    rightMult,
    rightDiv,
    rightComp,
    defineMode,
    wrong
}