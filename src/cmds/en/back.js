const config = require('../../config');
const facts = require('../../config/facts.json');

module.exports = () => async (ctx) => {
    ctx.editMessageText(
        `🤔 *Interesting fact:* ${facts[Math.floor(Math.random() * facts.length)]}`, {
        reply_markup: {
            inline_keyboard: config.main_keyboard
        }, parse_mode: "markdown"
    })
    ctx.answerCbQuery();
}