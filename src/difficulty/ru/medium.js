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
                { text: "🇷🇺 Язык", callback_data: "lang:en" },
                { text: "🤯 Тяжело", callback_data: "edit_2:ru" },
              ],
              [{ text: "📊 Статистика", callback_data: "stats:ru" }],
              [{ text: "⬅️ Назад", callback_data: "back:ru" }],
            ];
          } else {
            menu = [
              [
                { text: "🇷🇺 Язык", callback_data: "lang:en" },
                { text: "🤯 Тяжело", callback_data: "edit_2:ru" },
              ],
              [{ text: "⬅️ Назад", callback_data: "back:ru" }],
            ];
          }

          ctx.editMessageReplyMarkup({
            inline_keyboard: menu,
          });
          ctx.answerCbQuery("✅ Сложность изменена.");
        });
    }
  );
};
