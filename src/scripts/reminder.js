const mongo = require('mongodb');
const url = process.env.MONGO;
const Telegram = require('telegraf/telegram');
const telegram = new Telegram(process.env.TOKEN);

const messagesEn = [
    '😢 *Did you forgot about me? Keep studying and you will get the result!*',
    '😒 *I\'ve let you down, huh? You were supposed to fight for me, not join ignoramus club. Start training right now!*',
    '😐 *I have a soul too and I am too disappointed that you are not training anymore!*'
]

const messagesRu = [
    '😢 *Вы забыли обо мне? Продолжайте заниматься и вы добьетесь успехов в математике!*',
    '😒 *Я вас подвел... Вы должны были сражаться за меня, а не примкнуть к отряду неучей. Начните тренировку прямо сейчас!*',
    '😐 *У меня тоже есть душа, и я очень недоволен тем, что вы прекратили занятия!*'
];

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
                            });

                            if (lang === 'EN') {
                                let i = Math.floor(Math.random() * messagesEn.length);
                                telegram.sendMessage(user.id, messagesEn[i], {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "🤘 Start training!", callback_data: "train" }]
                                        ]
                                    }, parse_mode: "markdown"
                                })
                            } else if (lang === 'RU') {
                                let i = Math.floor(Math.random() * messagesRu.length);
                                telegram.sendMessage(user.id, messagesRu[i], {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [{ text: "🤘 Начать тренировку!", callback_data: "train:ru" }]
                                        ]
                                    }, parse_mode: "markdown"
                                });
                            };
                        });
                    });
                };
            };
        });
    });
}

module.exports = remind;