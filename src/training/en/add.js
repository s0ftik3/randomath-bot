const textToImage = require('text-to-image');
const Randomath = require('randomath');
const math = new Randomath();

module.exports = () => (ctx) => {
    let sample = math.getRandomAdd();
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
            answerDataF = 'rightAdd';
        } else if (sample[0].answers[1] === trueAnswer) {
            answerDataS = 'rightAdd';
        } else if (sample[0].answers[2] === trueAnswer) {
            answerDataT = 'rightAdd';
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


// module.exports = () => (ctx) => {
//     let sample = math.getRandomAdd();
//     let trueAnswer = Number(sample[0].example.slice(0,2)) + Number(sample[0].example.slice(5, 8));

//     let answerDataF = 'wrong';
//     let answerDataS = 'wrong';
//     let answerDataT = 'wrong';

//     if (sample[0].answers[0] === trueAnswer) {
//         answerDataF = 'right';
//     } else if (sample[0].answers[1] === trueAnswer) {
//         answerDataS = 'right';
//     } else if (sample[0].answers[2] === trueAnswer) {
//         answerDataT = 'right';
//     }

//     ctx.editMessageText(`*Addition training.*\n\n_${sample[0].example}_`, {
//         reply_markup: { 
//             inline_keyboard: [[
//                 {text: sample[0].answers[0], callback_data: answerDataF}, 
//                 {text: sample[0].answers[1], callback_data: answerDataS}, 
//                 {text: sample[0].answers[2], callback_data: answerDataT}
//             ],
//             [
//                 {text: 'Back', callback_data: 'back:train'}
//             ]] 
//         },
//         parse_mode: 'markdown' 
//     })
//     ctx.answerCbQuery();
// }