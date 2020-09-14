const defineMode = require('./mode');

const rightAdd = require('./rightAdd');
const rightSub = require('./rightSub');
const rightMult = require('./rightMult');
const rightDiv = require('./rightDiv');
const rightComp = require('./rightComp');

const wrong = require('./wrong');
 
module.exports = {
    defineMode,
    rightAdd,
    rightSub,
    rightMult,
    rightDiv,
    rightComp,
    wrong
}