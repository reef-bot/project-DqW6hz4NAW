const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config/config.json');
const { handleCommand } = require('./handlers/commandHandler');
const { applyFilter } = require('./commands/filter');
const { applyModeration, logUserAction } = require('./services/moderationService');
const User = require('./models/User');

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    handleCommand(message);
  } else {
    applyModeration(message);
    applyFilter(message);
    logUserAction(message.author, message.content);
  }
});

client.login(token);