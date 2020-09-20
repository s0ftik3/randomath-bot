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
    }
  );

  db.collection("users")
    .find({ id: ctx.from.id })
    .toArray((err, data) => {
      let correct = data[0].true_answers;

      let menu;
      if (correct > 700) {
        menu = [
          [
            { text: "🇬🇧 Language", callback_data: "lang" },
            { text: '🧐 Medium', callback_data: 'edit_1' },
          ],
          [{ text: "📊 Statistics", callback_data: "stats" }],
          [{ text: "⬅️ Back", callback_data: "back" }],
        ];
      } else {
        menu = [
          [
            { text: "🇬🇧 Language", callback_data: "lang" },
            { text: '🧐 Medium', callback_data: 'edit_1' },
          ],
          [{ text: "⬅️ Back", callback_data: "back" }],
        ];
      }

      ctx.editMessageReplyMarkup({
        inline_keyboard: menu,
      });
      ctx.answerCbQuery("✅ The difficulty has been changed.");
    });
};
