const config = require('../../config');

module.exports = () => async (ctx) => {
    ctx.editMessageText(
        `\n\n❓ *How to start*` + 
        `\nHead to the main menu and tap on *study* button. You will find trainings for each mathematical skills. Choose the one you need and train your brain!` +
        `\n\n🛠 *A bit of how it works*` +
        `\nThe bot generates random mathematical examples with two values (A and B). These values can't be bigger than 100. You can train any numeracy skills using this bot. Examples are generated randomly and there is a little chance that they will be repeated. ` +
        `The main purpose is to help people learn to count faster or at least better. Take 5 minutes a day to this bot and you will get the result.` +
        `\n\n🤖 *${config.name}* — Telegram bot that can help you to count faster. You can train your addition, subtraction, multiplication and division mathematical skills just using this bot. The bot's version is *${config.version}*. The bot improves everyday. If you found some bugs or issues, report them by taping 💌 *Report* button below.`, {
        reply_markup: {
            inline_keyboard: config.report_keyboard
        }, parse_mode: "markdown"
    })
    ctx.answerCbQuery();
}