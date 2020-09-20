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
            { $set: { difficulty: 2 } },
            (err, result) => {
              if (err) return console.error(err);
            }
          );
        });
      db.collection("users")
        .find({ id: ctx.from.id })
        .toArray((err, data) => {
          let correct = data[0].true_answers;

          let menu;
          if (correct > 700) {
            menu = [
              [
                { text: "🇬🇧 Language", callback_data: "lang" },
                { text: "🤯 Hard", callback_data: "edit_2" },
              ],
              [{ text: "📊 Statistics", callback_data: "stats" }],
              [{ text: "⬅️ Back", callback_data: "back" }],
            ];
          } else {
            menu = [
              [
                { text: "🇬🇧 Language", callback_data: "lang" },
                { text: "🤯 Hard", callback_data: "edit_2" },
              ],
              [{ text: "⬅️ Back", callback_data: "back" }],
            ];
          }

          ctx.editMessageReplyMarkup({
            inline_keyboard: menu,
          });
          ctx.answerCbQuery("✅ The difficulty has been changed.");
        });
    }
  );
};
