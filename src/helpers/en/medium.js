const mongo = require('mongodb');
const url = process.env.MONGO;

module.exports = () => async (ctx) => {
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        let db = client.db('randomath');
        db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
            db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "difficulty" : 2 } }, (err, result) => {
                if (err) return console.error(err);
            });
        });
    });

    ctx.editMessageReplyMarkup({
        inline_keyboard: [
            [{ text: "🇬🇧 Language", callback_data: "lang" }],
            [{ text: '🤯 Hard', callback_data: 'edit_2' }],
            [{ text: "⬅️ Back", callback_data: "back" }]
        ]
    });
    ctx.answerCbQuery();
}