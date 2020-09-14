const config = require("../../config");
const achievementReceive = require("../../scripts/achievementReceive");
const mongo = require("mongodb");
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

          let item = achievementReceive(correct, incorrect, "EN");

          let achievements =
            `${item.first} *Let's get started* — start the bot and give 1 correct answer.\n` +
            `${item.second} *Maybe share?* — reach the 5th level and open ✖️ *Multiplication* and ➗ *Division*.\n` +
            `${item.third} *Let me compare it* — reach the 10th level and open ⚖️ *Comparison*.\n` +
            `${item.fourth} *To get off on the wrong foot* — make 25 mistakes.\n` +
            `${item.fifth} *Math expert* — give 500 correct answers.` +
            `${item.sixth}`;

          let displayAchievements =
            `🏅 *Achievements*\n\n` +
            achievements +
            "\n\n*Keep training your brain and you will get more ahievements soon.*";

          ctx.editMessageText(`${displayAchievements}`, {
            reply_markup: {
              inline_keyboard: config.help_keyboard,
            },
            parse_mode: "markdown",
          });
          ctx.answerCbQuery();
        });
    }
  );
};