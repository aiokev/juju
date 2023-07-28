import { CommandInteraction } from 'eris';
import * as fs from 'fs';
import { getRandomNumber } from '../utils/utils';
import config from '../config.json'

// color config
import { defaultColor } from '../bot';
import { warningColor } from '../bot';
import { successColor } from '../bot';
import { errorColor } from '../bot';

const MIN_GAMBLE_AMOUNT = config.minGamble;
const MAX_GAMBLE_AMOUNT = config.maxGamble;

export default {
  name: 'gamble',
  description: 'Gamble your coins for a chance to win big!',
  options: [
    {
      name: 'amount',
      description: 'The amount of coins you want to gamble.',
      type: 4,
      required: true,
    },
  ],
  execute(interaction: CommandInteraction) {
    const userId = interaction.member?.id;
    if (!userId) {
      console.error('something messed up.');
      return;
    }

    const amount = interaction.data?.options?.[0]?.value as number;
    if (amount < MIN_GAMBLE_AMOUNT || amount > MAX_GAMBLE_AMOUNT) {
      const embed = {
        description: `${interaction.member?.mention}: Please enter a valid gamble amount between **${MIN_GAMBLE_AMOUNT}** and **${MAX_GAMBLE_AMOUNT}** coins.`,
        color: warningColor,
      };
      interaction.createMessage({ embed });
      return;
    }

    const balanceData = readBalanceData();

    if (!balanceData[userId]) {
      balanceData[userId] = { cash: 0, bank: 0 };
      writeBalanceData(balanceData);
    }

    const userBalance = balanceData[userId];
    if (userBalance.cash < amount) {
      const embed = {
        description: `${interaction.member?.mention}: You do not have enough coins to gamble this amount.`,
        color: errorColor,
      };
      interaction.createMessage({ embed });
      return;
    }

    const gambleResult = getRandomNumber(1, 100);
    if (gambleResult <= 50) {
      userBalance.cash += amount;
      const embed = {
        description: `${interaction.member?.mention}: Congratulations! You won **${amount}** coins in the gamble. You now have **${userBalance.cash}** coins.`,
        color: successColor,
      };
      interaction.createMessage({ embed });
    } else {
      userBalance.cash -= amount;
      const embed = {
        description: `${interaction.member?.mention}: Sorry, you lost **${amount}** coins in the gamble. You now have **${userBalance.cash}** coins.`,
        color: errorColor,
      };
      interaction.createMessage({ embed });
    }

    writeBalanceData(balanceData);
  }
};

function readBalanceData(): Record<string, { cash: number; bank: number }> {
  const rawData = fs.readFileSync('./src/data/balance.json', 'utf-8');
  return JSON.parse(rawData) || {};
}

function writeBalanceData(data: Record<string, { cash: number; bank: number }>) {
  fs.writeFileSync('./src/data/balance.json', JSON.stringify(data));
}
