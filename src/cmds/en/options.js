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
    
            let lvl = defineLevel(correct, incorrect);
    
            let falsePercent = 0;
            incorrect !== 0 ? falsePercent = Math.round((incorrect / (correct + incorrect)) * 100) : falsePercent = falsePercent; 

            mongo.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, client) => {
                let db = client.db('randomath');
                db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
                    db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "lang" : "EN"} }, (err, result) => {
                        if (err) return console.error(err);
                    });
                });
            });

            let used = lastTimeUse(lastUsed);

            let month = new Date(joined).getMonth() + 1;
    
            ctx.editMessageText(
                `👤 User — *${ctx.from.first_name}*\n` +
                `⭐️ Level — *${lvl.level}*\n` +
                `👋 Joined — *${new Date(joined).getDate().toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${new Date(joined).getFullYear()}*\n` +
                `🧠 Last time trained — *${used}*\n` +
                `🧨 Mistakes — *${falsePercent}%*\n\n` +
                `*${lvl.nextLevel}*`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🇬🇧 Language", callback_data: "lang" }],
                        [{ text: "⬅️ Back", callback_data: "back" }]
                    ]
                }, parse_mode: "markdown"
            })
            ctx.answerCbQuery();
        })
    })
}