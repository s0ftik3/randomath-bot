const textToImage = require('text-to-image');
const Randomath = require('randomath');
const math = new Randomath();

const mongo = require('mongodb');
const url = process.env.MONGO;

module.exports = () => (ctx) => {
    // Add true answer to database
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        let db = client.db('randomath');
        db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
            db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "true_answers" : data[0].true_answers + 1, "last_time_used": new Date().getTime(), "subtraction": data[0].subtraction + 1 } }, (err, result) => {
                if (err) return console.error(err);
            });
        });
    });

    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
        let db = client.db('randomath');
        db.collection('users').find({ "id": ctx.from.id }).toArray((err, data) => {
            let difficulty = data[0].difficulty;

            let sample = math.getRandomSubtract(1, difficulty);
            textToImage.generate(`\n${sample[0].example}`, {
                maxWidth: 720,
                fontSize: 100,
                fontFamily: 'Helvetica',
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: 70,
                customHeight: 250,
                margin: 10,
                bgColor: "#309f5e",
                textColor: "#f1f1e9"
            }).then(async function (dataUri) {
                let length = dataUri.length
                let imagestring = dataUri.slice(21, length);
                let image = { source: Buffer.from(imagestring, 'base64') }
        
                let trueAnswer = sample[0].answer;
        
                let answerDataF = 'wrong1:ru';
                let answerDataS = 'wrong2:ru';
                let answerDataT = 'wrong3:ru';
        
                if (sample[0].answers[0] === trueAnswer) {
                    answerDataF = 'ru_right_sub';
                } else if (sample[0].answers[1] === trueAnswer) {
                    answerDataS = 'ru_right_sub';
                } else if (sample[0].answers[2] === trueAnswer) {
                    answerDataT = 'ru_right_sub';
                }
        
                await ctx.editMessageMedia({ type: 'photo', media: image})
                ctx.editMessageReplyMarkup({
                    inline_keyboard: [[
                        {text: sample[0].answers[0], callback_data: answerDataF}, 
                        {text: sample[0].answers[1], callback_data: answerDataS}, 
                        {text: sample[0].answers[2], callback_data: answerDataT}
                    ],
                    [
                        {text: '❌ Закончить', callback_data: 'back:train:ru'}
                    ]] 
                })
            });
            ctx.answerCbQuery('✅ Верно!');
        })
    })
}