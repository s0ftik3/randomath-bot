const config = require('../../config');
const mongo = require('mongodb');
const url = process.env.MONGO;

module.exports = () => async (ctx) => {
    mongo.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function(err, client) {
        let db = client.db('randomath');
        db.collection('users').find({ "id": ctx.from.id }).toArray(function(err, doc) {
            // if found check user's lang preferences
            if (doc && doc.length) {
                if (doc[0].lang === 'EN') {
                    ctx.replyWithMarkdown(
                        `👋 Hello, *${ctx.from.first_name}*!\n` +
                        `\n🤖 I am glad to see you here, thanks for starting me! It is awesome that you decided to improve your math skills. Want to find out more? — tap *help* button below.`, {
                        reply_markup: {
                            inline_keyboard: config.main_keyboard
                        }, parse_mode: "markdown"
                    });
                } else if (doc[0].lang === 'RU') {
                    ctx.replyWithMarkdown(
                        `👋 Привет, *${ctx.from.first_name}*!\n` +
                        `\n🤖 Рад видеть Вас, спасибо что запустили меня! Прекрасно, что Вы решили улучшить свои навыки в математике. Хотите узнать больше? — жмите на кнопку *помощь* ниже.`, {
                        reply_markup: {
                            inline_keyboard: config.main_keyboard_ru
                        }, parse_mode: "markdown"
                    });
                }
            } else {
                // add new user
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, client) => {
                    let db = client.db('randomath');
                    db.collection('users').insertOne({
                        id: ctx.from.id,
                        name: ctx.from.first_name,
                        lang: "EN",
                        true_answers: 0,
                        false_answers: 0,
                        timestamp: new Date().getTime(),
                        last_time_used: 0
                    }, (err, result) => {
                        if (err) console.error(err);
                    });
                });

                ctx.replyWithMarkdown(
                    `👋 Hello, *${ctx.from.first_name}*!\n` +
                    `\n🤖 I am glad to see you here, thanks for starting me! It is awesome that you decided to improve your math skills. Want to find out more? — tap *help* button below.` +
                    `\n\n🇷🇺 Поменять язык на русский — ⚙️ *Options*`, {
                    reply_markup: {
                        inline_keyboard: config.main_keyboard
                    }, parse_mode: "markdown"
                });
            }
        })
    })
}