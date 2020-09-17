const config = require("../../config");
const defineLevel = require("../../scripts/defineLevel");
const mongo = require("mongodb");
const moment = require("moment");
const url = process.env.MONGO;

module.exports = () => async (ctx) => {
  mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      let db = client.db("randomath");
      db.collection("users")
        .find({ id: ctx.from.id })
        .toArray((err, data) => { 
          let correct = data[0].true_answers;
          let incorrect = data[0].false_answers;

          let addition = data[0].addition;
          let subtraction = data[0].subtraction;
          let multiplication = data[0].multiplication;
          let division = data[0].division;
          let comparison = data[0].comparison;

          ctx.editMessageText(
            `📊 *Statistics*\n\n` +
              `🎲 *Modes:*\n` +
              `➕ Addition — *${addition}*\n` + 
              `➖ Subtraction — *${subtraction}*\n` +
              `✖️ Multiplication — *${multiplication}*\n` +
              `➗ Division — *${division}*\n` +
              `⚖️ Comparison — *${comparison}*\n\n` +
              `🧮 *Total:*\n` +
              `✅ Correct answers — *${correct}*\n` +
              `❌ Incorrect answers — *${incorrect}*`,
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "⬅️ Back", callback_data: "options" }],
                ],
              },
              parse_mode: "markdown",
            }
          );
          ctx.answerCbQuery();
        });
    }
  );
};