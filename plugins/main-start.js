const plugin = {
  commands: ['/start'],
  tags: ['main'],
  init: (bot, { buttonUrl }) => {
    bot.onText(/^\/start$/, (msg) => {
      const From = msg.chat.id;
      const user = msg.from;
      const caption = `Hi ${user.first_name}! selamat datang di AQUA BOT Ai. Aku adalah bot telegram yang di buat untuk mempermudah hidup 😄, silahkan ketik /menu untuk melihat daftar menu ya :)`;
      const replyMarkup = {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Script Bot', url: buttonUrl }],
          ],
        },
      };
      bot.sendMessage(From, caption, { reply_to_message_id: msg.message_id, ...replyMarkup });
    });
  }
};

module.exports = plugin;
