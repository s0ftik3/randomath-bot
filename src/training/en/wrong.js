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
            db.collection('users').updateOne({ "id": ctx.from.id }, { $set: { "false_answers" : data[0].false_answers + 1, "last_time_used": new Date().getTime() } }, (err, result) => {
                if (err) return console.error(err);
            });
        });
    });

    ctx.answerCbQuery('❌ Incorrect! Try again.');
}