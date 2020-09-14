// Connect telegraf framework
const telegraf = require("telegraf");
const bot = new telegraf(process.env.TOKEN);

// Reminder function that remindes people from database
// if they did not use the bot for a long time
const { reminder } = require("./src/scripts");

// English version of the bot
const {
  defineMode,
  rightAdd,
  rightSub,
  rightMult,
  rightDiv,
  rightComp,
  wrong
} = require("./src/training/en");

const {
  startCommand,
  helpCommand,
  trainCommand,
  backCommand,
  optionsCommand,
  backTrain,
  achievementsCommand,
} = require("./src/cmds/en");

const { easy, medium, hard } = require("./src/difficulty/en");

// Russian version of the bot
const {
  defineModeRu,
  rightAddRu,
  rightSubRu,
  rightMultRu,
  rightDivRu,
  rightCompRu,
  wrongRu,
} = require("./src/training/ru");

const {
  helpCommandRu,
  trainCommandRu,
  backCommandRu,
  optionsCommandRu,
  backTrainRu,
  achievementsCommandRu,
} = require("./src/cmds/ru");

const { easyRu, mediumRu, hardRu } = require("./src/difficulty/ru");

// English commands
bot.start(startCommand());

bot.action("train", trainCommand());
bot.action("help", helpCommand());
bot.action("options", optionsCommand());
bot.action("edit_0", easy());
bot.action("edit_1", medium());
bot.action("edit_2", hard());
bot.action("lang", optionsCommandRu());
bot.action("achievements", achievementsCommand());

bot.action("back", backCommand());
bot.action("back:train", backTrain());

bot.action("mult:block", (ctx) =>
  ctx.answerCbQuery("⚠️ You should reach 5th level.")
);
bot.action("dev:block", (ctx) =>
  ctx.answerCbQuery("⚠️ You should reach 5th level.")
);
bot.action("comp:block", (ctx) =>
  ctx.answerCbQuery("⚠️ You should reach 10th level.")
);

bot.action(/mode-*\w+/, defineMode());
bot.action("right_add", rightAdd());
bot.action("right_sub", rightSub());
bot.action("right_mult", rightMult());
bot.action("right_div", rightDiv());
bot.action("right_comp", rightComp());

bot.action(["wrong1", "wrong2", "wrong3"], wrong());

// Russian commands
bot.action("train:ru", trainCommandRu());
bot.action("help:ru", helpCommandRu());
bot.action("options:ru", optionsCommandRu());
bot.action("edit_0:ru", easyRu());
bot.action("edit_1:ru", mediumRu());
bot.action("edit_2:ru", hardRu());
bot.action("lang:en", optionsCommand());
bot.action("achievements:ru", achievementsCommandRu());

bot.action("back:ru", backCommandRu());
bot.action("back:train:ru", backTrainRu());

bot.action("mult:ru:block", (ctx) =>
  ctx.answerCbQuery("⚠️ Вам нужно достичь 5 уровня.")
);
bot.action("dev:ru:block", (ctx) =>
  ctx.answerCbQuery("⚠️ Вам нужно достичь 5 уровня.")
);
bot.action("comp:ru:block", (ctx) =>
  ctx.answerCbQuery("⚠️ Вам нужно достичь 10 уровня.")
);
//
bot.action(/ru-mode-*\w+/, defineModeRu());
bot.action("ru_right_add", rightAddRu());
bot.action("ru_right_sub", rightSubRu());
bot.action("ru_right_mult", rightMultRu());
bot.action("ru_right_div", rightDivRu());
bot.action("ru_right_comp", rightCompRu());

bot.action(["wrong1:ru", "wrong2:ru", "wrong3:ru"], wrongRu());

// Indicates that the bot has been started
bot.telegram.getMe().then((bot) => {
  console.log(`${bot.first_name} bot has been started. Enjoy!`);
});

// Checks if the reminder need to be send or not
setInterval(() => {
  reminder();
}, 3600000);

// Solves the problem with stucked loader next to the inline buttons
bot.on("callback_query", (ctx) => ctx.answerCbQuery());

// Start the bot
bot.startPolling();