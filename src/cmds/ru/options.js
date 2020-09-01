const config = require('../../config');
const lastTimeUse = require('../../scripts/lastTimeUse');
const defineLevel = require('../../scripts/defineLevel');
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
            let incorrect = data[0].false_answers;
            let joined = data[0].timestamp;
            let lastUsed = data[0].last_time_used;
            let difficulty = data[0].difficulty;

            let lvl = defineLevel(correct, incorrect, 'RU');

            let falsePercent = 0;
            incorrect !== 0 ? falsePercent = Math.round((incorrect / (correct + incorrect)) * 100) : falsePercent = falsePercent;

            mongo.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, client) => {
                let db = client.db('randomath');
                db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
                    db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "lang" : "RU"} }, (err, result) => {
                        if (err) return console.error(err);
                    });
                });
            });

            let used = lastTimeUse(lastUsed, 'RU');

            let month = new Date(joined).getMonth() + 1;

            let emoji = (difficulty === 0) ? '🤓 Легко' : (difficulty === 1) ? '🧐 Средне' : '🤯 Тяжело';
            let back = (difficulty === 0) ? 'edit_0:ru' : (difficulty === 1) ? 'edit_1:ru' : 'edit_2:ru';

            ctx.editMessageText(
                `👤 Пользователь — *${ctx.from.first_name}*\n` +
                `⭐️ Уровень — *${lvl.level}*\n` +
                `👋 Присоединился — *${new Date(joined).getDate().toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${new Date(joined).getFullYear()}*\n` +
                `🧠 Последняя тренировка — *${used}*\n` +
                `🧨 Ошибок — *${falsePercent}%*\n\n` +
                `*${lvl.nextLevel}*`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🇷🇺 Язык", callback_data: "lang:en" }],
                        [{ text: emoji, callback_data: back }],
                        [{ text: "⬅️ Назад", callback_data: "back:ru" }]
                    ]
                }, parse_mode: "markdown"
            })
            ctx.answerCbQuery();
        })
    })
}