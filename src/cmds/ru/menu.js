const config = require("../../config");

module.exports = () => async (ctx) => {
  ctx.replyWithMarkdown(
    `👋 Привет, *${ctx.from.first_name}*!\n` +
      `\n🤖 Рад видеть Вас, спасибо что запустили меня! Прекрасно, что Вы решили улучшить свои навыки в математике. Хотите узнать больше? — жмите на кнопку *помощь* ниже.`,
    {
      reply_markup: {
        inline_keyboard: config.main_keyboard_ru,
      },
      parse_mode: "markdown",
    }
  );
};