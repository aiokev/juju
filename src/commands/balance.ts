import { CommandInteraction } from 'eris';
import * as fs from 'fs';
import config from '../config.json';

// color config
import { defaultColor } from '../bot';
import { warningColor } from '../bot';
import { successColor } from '../bot';
import { errorColor } from '../bot';

export default {
  name: 'balance',
  description: 'Show your or another user\'s balance.',
  options: [
    {
      name: 'user',
      description: 'The user whose balance you want to check.',
      type: 6,
      required: false,
    },
  ],
  execute(interaction: CommandInteraction) {
    // TODO: add support to view a users balance
    const userId = interaction.member?.id;
    if (!userId) {
      console.error('Member ID not available in the interaction.');
      return;
    }

    const balanceData = readBalanceData();

    if (!balanceData[userId]) {
      balanceData[userId] = { cash: 0, bank: 0 };
      writeBalanceData(balanceData);
    }

    const userBalance = balanceData[userId];
    const embed = {
      description: `${interaction.member?.mention}: You have a wallet balance of **${userBalance.cash}**!`,
      color: defaultColor,
    };
    interaction.createMessage({ embed });
    if (config.logCommands) {
      console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
    }
  }
};

function readBalanceData(): Record<string, { cash: number; bank: number }> {
  const rawData = fs.readFileSync('./src/data/balance.json', 'utf-8');
  return JSON.parse(rawData) || {};
}

function writeBalanceData(data: Record<string, { cash: number; bank: number }>) {
  fs.writeFileSync('./src/data/balance.json', JSON.stringify(data));
}
