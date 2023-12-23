const plugin = {
  commands: ['/menu'],
  tags: ['info', 'main'],
  init: (bot, { loadedPlugins, buttonUrl, imageUrl }) => {
    const Start = new Date();

    bot.onText(/^\/menu$/, async (msg) => {
      const chatId = msg.chat.id;
      const now = new Date();
      const uptimeMilliseconds = now - Start;
      const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
      const uptimeMinutes = Math.floor(uptimeSeconds / 60);
      const uptimeHours = Math.floor(uptimeMinutes / 60);

      let menuText = `Hi ${msg.from.username}\naku adalah sistem otomatis (Telegram Bot) yang akan membantu mu setiap saat.\n\n`;
      menuText += `┌  ◦ Uptime: ${uptimeHours} hours ${uptimeMinutes % 60} minutes ${uptimeSeconds % 60} seconds\n`;
      menuText += `│  ◦ Library: Telegraf\n`;
      menuText += `│  ◦ Hari: ${getDayName(now.getDay())}\n`;
      menuText += `│  ◦ Waktu: ${now.toLocaleTimeString()}\n`;
      menuText += `│  ◦ Tanggal: ${now.toLocaleDateString()}\n`;
      menuText += '│  ◦ Version: 0.0.5\n';
      menuText += '└\n\n';

      const tagsAndCommands = {};

      loadedPlugins.forEach((plugin) => {
        const tag = plugin.tags[0];
        if (!tagsAndCommands[tag]) {
          tagsAndCommands[tag] = [];
        }
        tagsAndCommands[tag].push(plugin.commands);
      });

      Object.entries(tagsAndCommands).forEach(([tag, commands]) => {
        menuText += `┌  ◦ *${tag}*\n`;
        commands.flat().forEach((command) => {
          menuText += `│  ◦ ${command}\n`;
        });
        menuText += '└\n';
      });

      try {
        const sentMessage = await bot.sendPhoto(chatId, imageUrl, {
          caption: menuText,
          parse_mode: 'Markdown',
          reply_to_message_id: msg.message_id,
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Script Bot', url: buttonUrl }],
            ],
          },
        });

      } catch (error) {
        console.error('Error sending menu:', error);
        bot.sendMessage(chatId, 'Error sending menu. Please try again later.', { reply_to_message_id: msg.message_id });
      }
    });
  },
};

function getDayName(dayIndex) {
  const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  return days[dayIndex];
}

module.exports = plugin;

