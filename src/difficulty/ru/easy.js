const mongo = require('mongodb');
const url = process.env.MONGO;

module.exports = () => async (ctx) => {
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        let db = client.db('randomath');
        db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
            db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "difficulty" : 1 } }, (err, result) => {
                if (err) return console.error(err);
            });
        });
    });

    ctx.editMessageReplyMarkup({
        inline_keyboard: [
            [{ text: "🇷🇺 Язык", callback_data: "lang:en" }, { text: '🧐 Средне', callback_data: 'edit_1:ru' }],
            [{ text: "⬅️ Назад", callback_data: "back:ru" }]
        ]
    });
    ctx.answerCbQuery('✅ Сложность изменена.');
}