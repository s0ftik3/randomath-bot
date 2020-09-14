const config = require("../../config");
const facts = require("../../config/factsRu.json");

module.exports = () => async (ctx) => {
  ctx.editMessageText(
    `🤔 *Интересный факт:* ${facts[Math.floor(Math.random() * facts.length)]}`,
    {
      reply_markup: {
        inline_keyboard: config.main_keyboard_ru,
      },
      parse_mode: "markdown",
    }
  );
  ctx.answerCbQuery();
};