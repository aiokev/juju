import { CommandInteraction } from 'eris';
import * as fs from 'fs';
import config from '../config.json';
import { defaultColor, errorColor, successColor, warningColor } from '../utils/colors';

export default {
  name: 'leaderboard',
  description: 'View the top 10 richest users.',
  execute(interaction: CommandInteraction) {
    const balanceData = readBalanceData();

    const sortedBalances = Object.entries(balanceData)
      .sort(([, balanceA], [, balanceB]) => balanceB.cash - balanceA.cash)
      .slice(0, 10);

    const leaderboardText = sortedBalances
      .map(([userId, balance], index) => `\`${index + 1}\` <@${userId}> - ${balance.cash}`)
      .join('\n') || "N/A";

    const embed = {
      title: 'Top 10 Richest Users',
      description: leaderboardText,
      color: defaultColor,
    };
    interaction.createMessage({ embed, flags: config.invisCmdResponses? 64 : 0 });
  },
};

function readBalanceData(): Record<string, { cash: number; bank: number }> {
  const rawData = fs.readFileSync('./src/data/balance.json', 'utf-8');
  return JSON.parse(rawData) || {};
}
