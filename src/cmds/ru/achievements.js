const config = require('../../config');
const achievementReceive = require('../../scripts/achievementReceive');
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

            let item = achievementReceive(correct, incorrect, 'RU');
            
            let achievements = 
                `${item.first} *Давайте начнём* — запустить бота и дать один верный ответ.\n` +
                `${item.second} *Может поделимся?* — достичь 5 уровня открыв ✖️ *Умножение* и ➗ *Деление*.\n` +
                `${item.third} *Позвольте сравнить* — достичь 10 уровня открыв ⚖️ *Сравнение*.\n` +
                `${item.fourth} *Встать не с той ноги* — допустить 25 ошибок.\n` +
                `${item.fifth} *Эксперт в математике* — дать 500 верных ответов.` +
                `${item.sixth}`;

            let displayAchievements = `🏅 *Достижения*\n\n` + achievements + '\n\n*Тренируйтесь, чтобы открыть больше достижений.*';

            ctx.editMessageText(
                `${displayAchievements}`, {
                reply_markup: {
                    inline_keyboard: config.help_keyboard_ru
                }, parse_mode: "markdown"
            })
            ctx.answerCbQuery();
        });    
    });
}