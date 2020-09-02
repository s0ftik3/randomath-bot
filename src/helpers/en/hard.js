const mongo = require('mongodb');
const url = process.env.MONGO;

module.exports = () => async (ctx) => {
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        let db = client.db('randomath');
        db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
            db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "difficulty" : 0 } }, (err, result) => {
                if (err) return console.error(err);
            });
        });
        client.close();
    });

    ctx.editMessageReplyMarkup({
        inline_keyboard: [
            [{ text: "🇬🇧 Language", callback_data: "lang" }, { text: '🤓 Easy', callback_data: 'edit_0' }],
            [{ text: "⬅️ Back", callback_data: "back" }]
        ]
    });
    ctx.answerCbQuery('✅ The difficulty has been changed.');
}