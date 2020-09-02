const levelNums = require('../config/numbers.json');
const mongo = require('mongodb');
const levelEn = require('../config/level.json');
const levelRu = require('../config/levelRu.json');

function defineLevel(trueAnswers, falseAnswers, lang = 'EN') {
    let correct = trueAnswers;
    let incorrect = falseAnswers;

    if (lang === 'EN') {
        let numbers = levelNums;
        let level = 0;
        let nextLevel = 'Complete 0️⃣ example(s) to reach new level.';

        let isLevelUp = (trueAnswers > 0 && trueAnswers <= 100) ? ((trueAnswers % 10) === 0) : ((trueAnswers % 20) === 0);
        let answersLeft = (trueAnswers >= 0 && trueAnswers <= 100) ? Math.abs(10 - trueAnswers.toString().split('').reverse()[0]) : Math.abs(20 - trueAnswers.toString().split('').reverse()[0]);
    
        if (isLevelUp) {
            mongo.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, client) => {
                let db = client.db('randomath');
                db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
                    level = levelEn[data[0].level];
                    nextLevel = `❔ Complete ${numbers[answersLeft]} example(s) to reach a new level.`;
                    db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "level" : data[0].level + 1 } }, (err, result) => {
                        if (err) return console.error(err);
                    });
                });
            });
        }

        if (correct > 700) {
            level = '50 (🎓 Doctor of Science)';
            nextLevel = '✅ Correct answers — ${correct}\n❌ Incorrect answers — ${incorrect}\n\n👍 You have reached the the maximum level and now you are available to see the full statistics.';
        }

        console.log(level, nextLevel);
        return { level, nextLevel }
    } else if (lang === 'RU') {
        let numbers = levelNums;
        let level = 0;
        let nextLevel = 'Завершите 0️⃣ примеров чтобы достичь нового уровня.';

        // Levels page. Now it's 30 levels
        if (correct <= 0) {    
            level = 0;
            nextLevel = `❔ Завершите хотя бы один пример, чтобы начать игру.`
        } else if (correct <= 10) {
            level = 1 + ' (🤓 Начинающий)';
            nextLevel = `❔ Завершите ${numbers[11 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 20) {
            level = 2 + ' (🤓 Начинающий)';
            nextLevel = `❔ Завершите ${numbers[21 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 30) {
            level = 3 + ' (🤓 Начинающий)';
            nextLevel = `❔ Завершите ${numbers[31 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 40) {
            level = 4 + ' (🤨 Любитель)';
            nextLevel = `❔ Завершите ${numbers[41 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 50) {
            level = 5 + ' (🤨 Любитель)';
            nextLevel = `❔ Завершите ${numbers[51 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 60) {
            level = 6 + ' (🤨 Любитель)';
            nextLevel = `❔ Завершите ${numbers[61 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 70) {
            level = 7 + ' (🤨 Любитель)';
            nextLevel = `❔ Завершите ${numbers[71 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 80) {
            level = 8 + ' (🧐 Счетовод)';
            nextLevel = `❔ Завершите ${numbers[81 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 90) {
            level = 9 + ' (🧐 Счетовод)';
            nextLevel = `❔ Завершите ${numbers[91 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 100) {
            level = 10 + ' (🧐 Счетовод)';
            nextLevel = `❔ Завершите ${numbers[101 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 120) {
            level = 11 + ' (🧐 Счетовод)';
            nextLevel = `❔ Завершите ${numbers[121 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 140) {
            level = 12 + ' (🧐 Счетовод)';
            nextLevel = `❔ Завершите ${numbers[141 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 160) {
            level = 13 + ' (🧐 Счетовод)';
            nextLevel = `❔ Завершите ${numbers[161 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 180) {
            level = 14 + ' (🧐 Счетовод)';
            nextLevel = `❔ Завершите ${numbers[181 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 200) {
            level = 15 + ' (🧐 Счетовод)';
            nextLevel = `❔ Завершите ${numbers[201 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 220) {
            level = 16 + ' (🤔 Эксперт)';
            nextLevel = `❔ Завершите ${numbers[221 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 240) {
            level = 17 + ' (🤔 Эксперт)';
            nextLevel = `❔ Завершите ${numbers[241 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 260) {
            level = 18 + ' (🤔 Эксперт)';
            nextLevel = `❔ Завершите ${numbers[261 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 280) {
            level = 19 + ' (🤔 Эксперт)';
            nextLevel = `❔ Завершите ${numbers[281 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 300) {
            level = 20 + ' (🤔 Эксперт)';
            nextLevel = `❔ Завершите ${numbers[301 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 320) {
            level = 21 + ' (😏 Ветеран)';
            nextLevel = `❔ Завершите ${numbers[321 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 340) {
            level = 22 + ' (😏 Ветеран)';
            nextLevel = `❔ Завершите ${numbers[341 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 360) {
            level = 23 + ' (😏 Ветеран)';
            nextLevel = `❔ Завершите ${numbers[361 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 380) {
            level = 24 + ' (🤠 Полу-профессионал)';
            nextLevel = `❔ Завершите ${numbers[381 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 400) {
            level = 25 + ' (🤠 Полу-профессионал)';
            nextLevel = `❔ Завершите ${numbers[401 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 420) {
            level = 26 + ' (😎 Профессионал)';
            nextLevel = `❔ Завершите ${numbers[421 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 440) {
            level = 27 + ' (😎 Профессионал)';
            nextLevel = `❔ Завершите ${numbers[441 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 460) {
            level = 28 + ' (😎 Профессионал)';
            nextLevel = `❔ Завершите ${numbers[461 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 480) {
            level = 29 + ' (😎 Профессионал)';
            nextLevel = `❔ Завершите ${numbers[481 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 500) {
            level = 30 + ' (😎 Профессионал)';
            nextLevel = `❔ Завершите ${numbers[501 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 520) {
            level = 31 + ' (👨‍🏫 Учитель)';
            nextLevel = `❔ Завершите ${numbers[521 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 540) {
            level = 32 + ' (👨‍🏫 Учитель)';
            nextLevel = `❔ Завершите ${numbers[541 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 560) {
            level = 33 + ' (👨‍🏫 Учитель)';
            nextLevel = `❔ Завершите ${numbers[561 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 580) {
            level = 34 + ' (👨‍🏫 Учитель)';
            nextLevel = `❔ Завершите ${numbers[581 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 600) {
            level = 35 + ' (👨‍🏫 Учитель)';
            nextLevel = `❔ Завершите ${numbers[601 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 620) {
            level = 36 + ' (🧑‍🔬 Учёный)';
            nextLevel = `❔ Завершите ${numbers[621 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 640) {
            level = 37 + ' (🧑‍🔬 Учёный)';
            nextLevel = `❔ Завершите ${numbers[641 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 660) {
            level = 38 + ' (🧑‍🔬 Учёный)';
            nextLevel = `❔ Завершите ${numbers[661 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 680) {
            level = 39 + ' (🧑‍🔬 Учёный)';
            nextLevel = `❔ Завершите ${numbers[681 - correct]} примеров, чтобы достичь нового уровня.`
        } else if (correct <= 700) {
            level = 40 + ' (🧑‍🔬 Учёный)';
            nextLevel = `❔ Завершите ${numbers[701 - correct]} примеров, чтобы достичь максимального уровня.`
        } else if (correct > 700) {
            level = 40 + ' (🎓 Доктор наук)';
            nextLevel = `✅ Верных ответов — ${correct}\n❌ Неверных ответов — ${incorrect}\n\n👍 Вы достигли максимального уровня и теперь Вам доступна полная статистика о Ваших ответах.`
        }

        return { level, nextLevel }
    }
}

module.exports = defineLevel;

function defineLevel(xp) {
    return {
        isLevelUp: (xp > 0 && xp <= 100) ? ((xp % 10) === 0) : ((xp % 20) === 0),
        answersLeft: (xp >= 0 && xp <= 100) ? Math.abs(10 - xp.toString().split('').reverse()[0]) : Math.abs(20 - xp.toString().split('').reverse()[0])
    }
}