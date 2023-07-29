import { CommandInteraction } from 'eris';
import * as fs from 'fs';

// color config
import { defaultColor } from '../bot';
import { warningColor } from '../bot';

interface LogChansData {
  [guildId: string]: string;
}

export default {
  name: 'setlogchannel',
  description: 'Set the logging channel for the server.',
  options: [
    {
      name: 'channel',
      description: 'The channel to set as the logging channel for the server.',
      type: 7,
      required: true,
    },
  ],
  execute(interaction: CommandInteraction) {
    if (!interaction.member?.permissions.has('manageGuild')) {
      const embed = {
        description: `${interaction.member?.mention}: You do not have the required permissions to use this command.`,
        color: warningColor,
      };
      interaction.createMessage({ embed });
      return;
    }

    const guildId = interaction.guildID;
    if (!guildId) {
      console.error('Guild ID not available in the interaction.');
      return;
    }

    const channelOption = interaction.data.options[0];
    if (!channelOption) {
      console.error('Missing channel option.');
      return;
    }

    if (channelOption.type !== 7) {
      console.error('Invalid channel option type.');
      return;
    }

    const channelId = channelOption.value;
    const logChansData = readLogChansData();
    logChansData[guildId] = channelId;
    writeLogChansData(logChansData);

    const embed = {
      description: `${interaction.member?.mention}: Logging channel has been set to <#${channelId}> for this server.`,
      color: defaultColor,
    };
    interaction.createMessage({ embed });
  },
};

function readLogChansData(): LogChansData {
  try {
    const rawData = fs.readFileSync('./src/data/logchans.json', 'utf-8');
    return JSON.parse(rawData) || {};
  } catch (error) {
    console.error('Error reading logchans.json:', error);
    return {};
  }
}

function writeLogChansData(data: LogChansData) {
  try {
    fs.writeFileSync('./src/data/logchans.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing logchans.json:', error);
  }
}
