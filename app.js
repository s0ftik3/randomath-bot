// Connect telegraf framework
const telegraf = require('telegraf');
const bot = new telegraf(process.env.TOKEN);

// Reminder function that remindes people from database
// if they did not use the bot for a long time
const { reminder } = require('./src/scripts');

const defineTrainMode = require('./src/scripts/defineTrainMode');

// English version of the bot
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
} = require('./src/training/en')

const {
    startCommand,
    helpCommand,
    trainCommand,
    backCommand,
    testCommand,
    optionsCommand,
    backTrain,
    achievementsCommand
} = require('./src/cmds/en');

// Russian version of the bot
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
} = require('./src/training/ru')

const {
    startCommandRu,
    helpCommandRu,
    trainCommandRu,
    backCommandRu,
    testCommandRu,
    optionsCommandRu,
    backTrainRu,
    achievementsCommandRu
} = require('./src/cmds/ru');

// English commands
bot.start(startCommand());

bot.action('train', trainCommand());
bot.action('help', helpCommand());
bot.action('back', backCommand());
bot.action('options', optionsCommand());
bot.action('lang', optionsCommandRu());
bot.action('achievements', achievementsCommand());

bot.action(/train-*\w+/, defineTrainMode());

bot.action('add', addCommand());
bot.action('sub', subCommand());
bot.action('mult', multCommand());
bot.action('dev', devCommand());
bot.action('comp', compCommand());
bot.action('back:train', backTrain());

bot.action('mult:block', ctx => ctx.answerCbQuery('⚠️ You should reach 5th level.'));
bot.action('dev:block', ctx => ctx.answerCbQuery('⚠️ You should reach 5th level.'));
bot.action('comp:block', ctx => ctx.answerCbQuery('⚠️ You should reach 10th level.'));

bot.action(['wrong1', 'wrong2', 'wrong3'], wrong());

bot.action('rightAdd', rightAdd());
bot.action('rightSub', rightSub());
bot.action('rightMult', rightMult());
bot.action('rightDev', rightDev());
bot.action('rightComp', rightComp());

// Russian commands
bot.action('train:ru', trainCommandRu());
bot.action('help:ru', helpCommandRu());
bot.action('back:ru', backCommandRu());
bot.action('options:ru', optionsCommandRu());
bot.action('lang:en', optionsCommand());
bot.action('achievements:ru', achievementsCommandRu());

bot.action('add:ru', addCommandRu());
bot.action('sub:ru', subCommandRu());
bot.action('mult:ru', multCommandRu());
bot.action('dev:ru', devCommandRu());
bot.action('comp:ru', compCommandRu());
bot.action('back:train:ru', backTrainRu());

bot.action('mult:ru:block', ctx => ctx.answerCbQuery('⚠️ Вам нужно достичь 5 уровня.'));
bot.action('dev:ru:block', ctx => ctx.answerCbQuery('⚠️ Вам нужно достичь 5 уровня.'));
bot.action('comp:ru:block', ctx => ctx.answerCbQuery('⚠️ Вам нужно достичь 10 уровня.'));

bot.action(['wrong1:ru', 'wrong2:ru', 'wrong3:ru'], wrongRu());

bot.action('rightAdd:ru', rightAddRu());
bot.action('rightSub:ru', rightSubRu());
bot.action('rightMult:ru', rightMultRu());
bot.action('rightDev:ru', rightDevRu());
bot.action('rightComp:ru', rightCompRu());

// Indicates that the bot has been started
bot.telegram.getMe().then((bot) => { console.log(`${bot.first_name} bot has been started. Enjoy!`) });

// Checks if the reminder need to be sent or not
setInterval(() => {
    reminder();
}, 3600000);

// Solves the problem with stucked loader next to the inline buttons
bot.on('callback_query', ctx => ctx.answerCbQuery());

// Start the bot
bot.startPolling();