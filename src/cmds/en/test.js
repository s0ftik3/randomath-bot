const textToImage = require('text-to-image');
const Randomath = require('randomath');
const math = new Randomath();

module.exports = () => (ctx) => {
    let sample = math.getRandomAdd();
    textToImage.generate(`\n${sample[0].example} = ?`, {
        maxWidth: 720,
        fontSize: 120,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 70,
        customHeight: 260,
        margin: 10,
        bgColor: "white",
        textColor: "black"
    }).then(function (dataUri) {
        let length = dataUri.length
        let imagestring = dataUri.slice(21, length);
        let image = { source: Buffer.from(imagestring, 'base64') }

        let trueAnswer = Number(sample[0].example.slice(0,2)) + Number(sample[0].example.slice(5, 8));

        let answerDataF = 'wrong';
        let answerDataS = 'wrong';
        let answerDataT = 'wrong';

        if (sample[0].answers[0] === trueAnswer) {
            answerDataF = 'right';
        } else if (sample[0].answers[1] === trueAnswer) {
            answerDataS = 'right';
        } else if (sample[0].answers[2] === trueAnswer) {
            answerDataT = 'right';
        }

        ctx.replyWithPhoto(image, { caption: 'What is the answer?',
            reply_markup: { 
                inline_keyboard: [[
                    {text: sample[0].answers[0], callback_data: answerDataF}, 
                    {text: sample[0].answers[1], callback_data: answerDataS}, 
                    {text: sample[0].answers[2], callback_data: answerDataT}
                ],
                [
                    {text: 'Back', callback_data: 'back:train'}
                ]] 
            } 
        })
    });
}