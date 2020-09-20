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
          db.collection("users").updateOne(
            { id: ctx.from.id },
            { $set: { difficulty: 1 } },
            (err, result) => {
              if (err) return console.error(err);
            }
          );
        });
      db.collection("users")
        .find({ id: ctx.from.id })
        .toArray((err, data) => {
          let correct = data[0].true_answers;
          let incorrect = data[0].false_answers;
          let joined = data[0].timestamp;
          let lastUsed = data[0].last_time_used;
          let difficulty = data[0].difficulty;

          let addition = data[0].addition;
          let subtraction = data[0].subtraction;
          let multiplication = data[0].multiplication;
          let division = data[0].division;
          let comparison = data[0].comparison;

          let lvl = defineLevel(
            correct,
            incorrect,
            addition,
            subtraction,
            multiplication,
            division,
            comparison
          );

          let falsePercent = 0;
          incorrect !== 0
            ? (falsePercent = Math.round(
                (incorrect / (correct + incorrect)) * 100
              ))
            : (falsePercent = falsePercent);

          let month = new Date(joined).getMonth() + 1;

          let emoji =
            difficulty === 0
              ? "🤓 Easy"
              : difficulty === 1
              ? "🧐 Medium"
              : "🤯 Hard";
          let back =
            difficulty === 0
              ? "edit_0"
              : difficulty === 1
              ? "edit_1"
              : "edit_2";

          moment.locale("en");

          let menu;
          if (correct > 700) {
            menu = [
              [
                { text: "🇬🇧 Language", callback_data: "lang" },
                { text: "🧐 Medium", callback_data: "edit_1" },
              ],
              [{ text: "📊 Statistics", callback_data: "stats" }],
              [{ text: "⬅️ Back", callback_data: "back" }],
            ];
          } else {
            menu = [
              [
                { text: "🇬🇧 Language", callback_data: "lang" },
                { text: "🧐 Medium", callback_data: "edit_1" },
              ],
              [{ text: "⬅️ Back", callback_data: "back" }],
            ];
          }

          ctx.editMessageText(
            `👤 User — *${ctx.from.first_name}*\n` +
              `⭐️ Level — *${lvl.level}*\n` +
              `👋 Joined — *${new Date(joined)
                .getDate()
                .toString()
                .padStart(2, "0")}.${month
                .toString()
                .padStart(2, "0")}.${new Date(joined).getFullYear()}*\n` +
              `🕗 Last time trained — *${moment(lastUsed).fromNow()}*\n` +
              `🧠 Difficulty — *${emoji}*\n` +
              `💥 Mistakes — *${falsePercent}%*\n\n` +
              `*${lvl.nextLevel}*`,
            {
              reply_markup: {
                inline_keyboard: menu,
              },
              parse_mode: "markdown",
            }
          );
          ctx.answerCbQuery("✅ The difficulty has been changed.");
        });
    }
  );
};
