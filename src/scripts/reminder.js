const mongo = require('mongodb');
const url = process.env.MONGO;
const Telegram = require('telegraf/telegram');
const telegram = new Telegram(process.env.TOKEN);

function remind() {
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        let db = client.db('randomath');
        db.collection('users').find().toArray((err, data) => {
            let today = new Date().getTime();
            let fiveDays = today - 432000000;
                
            for (let i = 0; i < data.length; i++) {
                let user = data[i];
                if (user.last_time_used <= fiveDays) {
                    mongo.connect(url, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    }, (err, client) => {
                        let db = client.db('randomath');
                        db.collection('users').find({ "id": user.id }).toArray((err, data) => {
                            let lang = user.lang;

                            mongo.connect(url, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true
                            }, (err, client) => {
                                let db = client.db('randomath');
                                db.collection('users').find({ "id": user.id }).toArray((err, data) => {
                                    db.collection('users').updateOne({ "id": user.id }, { $set: { "last_time_used": new Date().getTime() } }, (err, result) => {
                                        if (err) return console.error(err);
                                    });
                                });
                                client.close();
                            });

                            if (lang === 'EN') {
                                telegram.sendMessage(user.id, '😢 *Did you forgot about me? Keep studying and you will get the result!*', {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "🤘 Start training!", callback_data: "train" }]
                                        ]
                                    }, parse_mode: "markdown"
                                })
                            } else if (lang === 'RU') {
                                telegram.sendMessage(user.id, '😢 *Вы забыли обо мне? Продолжайте заниматься и вы добьетесь успехов в математике!*', {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "🤘 Начать тренировку!", callback_data: "train:ru" }]
                                        ]
                                    }, parse_mode: "markdown"
                                });
                            };
                        });
                        client.close();
                    });
                };
            };
        });
        client.close();
    });
}

module.exports = remind;