// imports
import * as Eris from 'eris';
import config from '../src/config.json';
import fs from 'fs';

// command imports
import balanceCommand from './commands/balance';
import workCommand from './commands/work';
import helpCommand from './commands/help';
import leaderboardCommand from './commands/leaderboard';
import sourceCommand from './commands/source';
import gambleCommand from './commands/gamble';
import dailyCommand from './commands/daily';
import setlogchannelCommand from './commands/setlogchannel';
import removelogchannelCommand from './commands/removelogchannel';
import cleanCommand from './commands/clean';
import { balanceCmd } from './utils/registercommands';
import { workCmd } from './utils/registercommands';
import { helpCmd } from './utils/registercommands';
import { leaderboardCmd } from './utils/registercommands';
import { sourceCmd } from './utils/registercommands';
import { gambleCmd } from './utils/registercommands';
import { dailyCmd } from './utils/registercommands';
import { setlogchannelCmd } from './utils/registercommands';
import { removelogchannelCmd } from './utils/registercommands';
import { cleanCmd } from './utils/registercommands';

const bot = new Eris.CommandClient(config.token, {
  firstShardID: config.firstShardID,
  lastShardID: config.lastShardID,
  maxShards: config.maxShards,
  getAllUsers: config.getAllUsers,
  intents: ["all"]}, {
  prefix: config.prefix,
});

bot.setMaxListeners(25);
bot.unregisterCommand(`help`);
// embed colors config
export const defaultColor = 0x7289DA;
export const warningColor = 0xfaa61a;
export const successColor = 0xa5eb78;
export const errorColor = 0xff6465;

bot.on('ready', () => {
  const botUser = `${bot.user.username}#${bot.user.discriminator}`
  console.log('Bot is ready!' + ` (logged in as ${botUser})`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});

bot.on("error", (err) => {
  console.error(err);
});

bot.on("shardReady", (id) => {
  console.log(`Shard: ${id} ready!`)
});

bot.on('ready', async () => {
  try {
    const filePath = './src/data/jujucmds.json';
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      if (fileContent.trim() === 'SGsDgvcaw') {
        return;
      }
    }
    
    console.log("Registering commands...");
    await bot.createCommand(balanceCmd);
    await bot.createCommand(workCmd);
    await bot.createCommand(helpCmd);
    await bot.createCommand(leaderboardCmd);
    await bot.createCommand(sourceCmd);
    await bot.createCommand(gambleCmd);
    await bot.createCommand(dailyCmd);
    await bot.createCommand(setlogchannelCmd);
    await bot.createCommand(removelogchannelCmd);
    await bot.createCommand(cleanCmd);
    
    fs.writeFileSync(filePath, 'SGsDgvcaw', 'utf8');
    
    console.log(`Commands registered successfully!`);
  } catch (error) {
    console.error('Error registering command:', error);
  }
});

/*
bot.on("ready", async () => {
  try {
    await bot.deleteCommand("1134489686291783851");
    console.log("Slash command unregistered successfully!");
  } catch (error) {
    console.error(`Failed to unregister slash command: ${error}`);
  }
});
*/

// command handling
// TODO: redo the command handling
bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'help':
        helpCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'balance':
        balanceCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'work':
        workCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'leaderboard':
        leaderboardCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'source':
        sourceCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'gamble':
        gambleCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'daily':
        dailyCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'setlogchannel':
        setlogchannelCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'removelogchannel':
        removelogchannelCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction instanceof Eris.CommandInteraction) {
    switch (interaction.data.name) {
      case 'clean':
        cleanCommand.execute(interaction);
        if (config.logCommands) {
          console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
        }
    }}
});

// event imports
import { handleGuildCreate, handleGuildDelete } from './events/guildjoinleave';
import { readLogChansData } from './utils/utils';
import { createDeleteLog } from './events/message';

// events
bot.on('guildCreate', (guild) => {
  handleGuildCreate(bot, guild);
  if (!config.public && guild.id !== config.mainServerID) {
    return guild.leave();
  } else return;
});

bot.on('guildDelete', (guild) => {
  handleGuildDelete(bot, guild);
})

bot.on('messageDelete', async (message) => {
  if (!message.guildID) return;

  const logChansData = readLogChansData();
  const logChannelId = logChansData[message.guildID];

  if (!logChannelId || !bot.getChannel(logChannelId)) return;

  const embed = createDeleteLog(message);
  bot.createMessage(logChannelId, embed);
});

bot.connect();
