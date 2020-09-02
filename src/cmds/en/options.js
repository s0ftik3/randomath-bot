const config = require('../../config');
const levelEn = require('../../config/level.json');
const levelNums = require('../../config/numbers.json');
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
            let isLevelUp = (correct > 0 && correct <= 100) ? ((correct % 10) === 0) : ((correct % 20) === 0);
            let answersLeft = (correct >= 0 && correct <= 100) ? Math.abs(10 - correct.toString().split('').reverse()[0]) : Math.abs(20 - correct.toString().split('').reverse()[0]);
            let numbers = levelNums;
    
            if (isLevelUp) {
                mongo.connect(url, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }, (err, client) => {
                    let db = client.db('randomath');
                    db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
                        let lvl = {
                            level: levelEn[data[0].level],
                            nextLevel: `❔ Complete ${numbers[answersLeft]} example(s) to reach a new level.`
                        }
                
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
            
                        let emoji = (difficulty === 0) ? '🤓 Easy' : (difficulty === 1) ? '🧐 Medium' : '🤯 Hard';
                        let back = (difficulty === 0) ? 'edit_0' : (difficulty === 1) ? 'edit_1' : 'edit_2';
                
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
                                    [{ text: emoji, callback_data: back }],
                                    [{ text: "⬅️ Back", callback_data: "back" }]
                                ]
                            }, parse_mode: "markdown"
                        })
                        ctx.answerCbQuery();
                        db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "level" : data[0].level + 1 } }, (err, result) => {
                            if (err) return console.error(err);
                        });
                    });
                });
            } else {
                let lvl = {
                    level: levelEn[data[0].level],
                    nextLevel: `❔ Complete ${numbers[answersLeft]} example(s) to reach a new level.`
                }
        
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
    
                let emoji = (difficulty === 0) ? '🤓 Easy' : (difficulty === 1) ? '🧐 Medium' : '🤯 Hard';
                let back = (difficulty === 0) ? 'edit_0' : (difficulty === 1) ? 'edit_1' : 'edit_2';
        
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
                            [{ text: emoji, callback_data: back }],
                            [{ text: "⬅️ Back", callback_data: "back" }]
                        ]
                    }, parse_mode: "markdown"
                })
                ctx.answerCbQuery();
            }
        })
    })
}