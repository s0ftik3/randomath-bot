const config = require('../../config');
const mongo = require('mongodb');
const url = process.env.MONGO;

module.exports = () => async (ctx) => {
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        let db = client.db('randomath');
        db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
            let correct = data[0].true_answers;
            let keyboard;

            if (correct < 41) {
                keyboard = config.train_keyboard_less_5_lvl;
            } else if (correct < 91) {
                keyboard = config.train_keyboard_less_10_lvl;
            } else {
                keyboard = config.train_keyboard
            }

            ctx.deleteMessage();
            ctx.replyWithMarkdown(
                `🎓 *You can choose what skills you need to train here.*` +
                `\n\n❔ Each training is an infinite amount of math examples with three options. *There is only one right option.*`, {
                reply_markup: {
                    inline_keyboard: keyboard
                }, parse_mode: "markdown"
            })
        })
        client.close();
    })
}