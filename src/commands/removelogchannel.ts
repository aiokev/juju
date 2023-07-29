import { CommandInteraction } from 'eris';
import * as fs from 'fs';

// color config
import { defaultColor } from '../bot';
import { warningColor } from '../bot';

interface LogChansData {
  [guildId: string]: string;
}

export default {
  name: 'removelogchannel',
  description: 'Remove the logging channel for the server.',
  options: [],
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

    const logChansData = readLogChansData();
    if (!logChansData[guildId]) {
      const embed = {
        description: `${interaction.member?.mention}: Logging channel is not set for this server.`,
        color: warningColor,
      };
      interaction.createMessage({ embed });
      return;
    }

    delete logChansData[guildId];
    writeLogChansData(logChansData);

    const embed = {
      description: `${interaction.member?.mention}: Logging channel has been removed for this server.`,
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
