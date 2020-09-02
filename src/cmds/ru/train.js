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
                keyboard = config.train_keyboard_ru_less_5_lvl;
            } else if (correct < 91) {
                keyboard = config.train_keyboard_ru_less_10_lvl;
            } else {
                keyboard = config.train_keyboard_ru
            }

            ctx.editMessageText(
                `🎓 *Выберите какие навыки Вы хотите тренировать.*` +
                `\n\n❔ Каждая тренировка состоит из бесконечного количества вопросов с тремя разными вариантами ответов. *Только один вариант является правильным.*`, {
                reply_markup: {
                    inline_keyboard: keyboard
                }, parse_mode: "markdown"
            })
            ctx.answerCbQuery();
        })
        client.close();
    })
}