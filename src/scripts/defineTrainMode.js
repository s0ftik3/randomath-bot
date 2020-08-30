// English
const {
    addCommand,
    subCommand,
    multCommand,
    devCommand,
    compCommand,
    rightAdd,
    rightSub,
    rightMult,
    rightDev,
    rightComp,
    wrong
} = require('../training/en');

// Russian
const {
    addCommandRu,
    subCommandRu,
    multCommandRu,
    devCommandRu,
    compCommandRu,
    rightAddRu,
    rightSubRu,
    rightMultRu,
    rightDevRu,
    rightCompRu,
    wrongRu
} = require('../training/ru');

function defineTrainMode() {
    let mode = ctx.callbackQuery.data.replace(/train-/gi, '');

    if (mode === 'add') {
        return addCommand();
    }
}

module.exports = defineTrainMode;