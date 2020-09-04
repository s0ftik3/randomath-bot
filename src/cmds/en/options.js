const config = require('../../config');
const defineLevel = require('../../scripts/defineLevel');
const inStreak = require('../../scripts/inStreak');
const mongo = require('mongodb');
const moment = require('moment');
const url = process.env.MONGO;

module.exports = () => async (ctx) => {
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        let db = client.db('randomath');
        db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
            let isInStreak = inStreak(data[0].last_time_used);

            console.log(isInStreak);

            if (isInStreak && data[0].studyToday) {
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, client) => {
                    let db = client.db('randomath');
                    db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
                        db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "streak" : data[0].streak + 1, "studyToday" : true } }, (err, result) => {
                            if (err) return console.error(err);
                        });
                    });
                });
            } else {
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, client) => {
                    let db = client.db('randomath');
                    db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
                        db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "streak" : 0, "studyToday" : false } }, (err, result) => {
                            if (err) return console.error(err);
                        });
                    });
                });
            }

            let correct = data[0].true_answers;
            let incorrect = data[0].false_answers;
            let joined = data[0].timestamp;
            let lastUsed = data[0].last_time_used;
            let difficulty = data[0].difficulty;
    
            let addition = data[0].addition;
            let subtraction = data[0].subtraction;
            let multiplication = data[0].multiplication;
            let division = data[0].division;
            let comparison = data[0].comparison;

            let lvl = defineLevel(correct, incorrect, addition, subtraction, multiplication, division, comparison);
    
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

            let month = new Date(joined).getMonth() + 1;

            let emoji = (difficulty === 0) ? '🤓 Easy' : (difficulty === 1) ? '🧐 Medium' : '🤯 Hard';
            let back = (difficulty === 0) ? 'edit_0' : (difficulty === 1) ? 'edit_1' : 'edit_2';

            moment.locale('en');
    
            ctx.editMessageText(
                `👤 User — *${ctx.from.first_name}*\n` +
                `⭐️ Level — *${lvl.level}*\n` +
                `🔥 Streak — *${data[0].streak}*\n` +
                `👋 Joined — *${new Date(joined).getDate().toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${new Date(joined).getFullYear()}*\n` +
                `🧠 Last time trained — *${moment(lastUsed).fromNow()}*\n` +
                `💪 Difficulty — *${emoji}*\n` +
                `🧨 Mistakes — *${falsePercent}%*\n\n` +
                `*${lvl.nextLevel}*`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🇬🇧 Language", callback_data: "lang" }, { text: emoji, callback_data: back }],
                        [{ text: "⬅️ Back", callback_data: "back" }]
                    ]
                }, parse_mode: "markdown"
            })
            ctx.answerCbQuery();
        })
    })
}