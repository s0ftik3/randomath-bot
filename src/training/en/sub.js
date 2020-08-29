const textToImage = require('text-to-image');
const Randomath = require('randomath');
const math = new Randomath();

module.exports = () => (ctx) => {
    let sample = math.getRandomSubtract();
    textToImage.generate(`\n${sample[0].example} = ?`, {
        maxWidth: 720,
        fontSize: 100,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 70,
        customHeight: 250,
        margin: 10,
        bgColor: "#eb6a55",
        textColor: "#f1f1e9"
    }).then(function (dataUri) {
        let length = dataUri.length
        let imagestring = dataUri.slice(21, length);
        let image = { source: Buffer.from(imagestring, 'base64') }

        let trueAnswer = sample[0].answer;

        let answerDataF = 'wrong1';
        let answerDataS = 'wrong2';
        let answerDataT = 'wrong3';

        if (sample[0].answers[0] === trueAnswer) {
            answerDataF = 'rightSub';
        } else if (sample[0].answers[1] === trueAnswer) {
            answerDataS = 'rightSub';
        } else if (sample[0].answers[2] === trueAnswer) {
            answerDataT = 'rightSub';
        }

        ctx.deleteMessage();
        ctx.replyWithPhoto(image, {
            reply_markup: { 
                inline_keyboard: [[
                    {text: sample[0].answers[0], callback_data: answerDataF}, 
                    {text: sample[0].answers[1], callback_data: answerDataS}, 
                    {text: sample[0].answers[2], callback_data: answerDataT}
                ],
                [
                    {text: '⬅️ Back', callback_data: 'back:train'}
                ]] 
            } 
        })
    });
    ctx.answerCbQuery();
}