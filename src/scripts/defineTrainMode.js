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

module.exports = () => (ctx) => {
    let mode = ctx.callbackQuery.data.replace(/train_/gi, '');

    if (mode === 'add') {
        return addCommand();
    }
}