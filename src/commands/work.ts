import { CommandInteraction } from 'eris';
import * as fs from 'fs';
import config from '../config.json';

// color config
import { defaultColor } from '../bot';
import { warningColor } from '../bot';
import { successColor } from '../bot';
import { errorColor } from '../bot';

const WORK_COOLDOWN = config.workCooldown * 60 * 1000 / 2;
const MIN_CASH = config.workMinCash;
const MAX_CASH = config.workMaxCash;

export default {
  name: 'work',
  description: 'Work and earn some cash!',
  execute(interaction: CommandInteraction) {
    const userId = interaction.member?.id || "unknown";
    const cooldownData = readCooldownData();
    const now = Date.now();

    if (!cooldownData[userId] || now - cooldownData[userId] >= WORK_COOLDOWN) {
      const cashEarned = getRandomInt(MIN_CASH, MAX_CASH);
      updateBalance(userId, cashEarned);

      const nextAvailableTime = now + WORK_COOLDOWN;
      cooldownData[userId] = nextAvailableTime;

      const embed = {
        description: `${interaction.member?.mention}: You worked and earned **${cashEarned}** cash!`,
        color: defaultColor,
      };
      interaction.createMessage({ embed });
      if (config.ownerID === interaction.member?.id && config.ownerCooldownBypass || config.staffIDs.includes(interaction.member?.id || "unknown") && config.staffCooldownBypass) {
        return
      } else {
        writeCooldownData(cooldownData);
      }
    } else {
      const remainingCooldown = cooldownData[userId] + WORK_COOLDOWN - now;
      const remainingMinutes = Math.ceil(remainingCooldown / (60 * 1000));

      const embed = {
        description: `${interaction.member?.mention}: You need to wait **${remainingMinutes}** minutes before working again.`,
        color: defaultColor,
      };
      interaction.createMessage({ embed });
    }
  },
};

function readCooldownData(): Record<string, number> {
  const rawData = fs.readFileSync('./src/data/cooldown.json', 'utf-8');
  return JSON.parse(rawData) || {};
}

function writeCooldownData(data: Record<string, number>) {
  fs.writeFileSync('./src/data/cooldown.json', JSON.stringify(data));
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function readBalanceData(): Record<string, { cash: number; bank: number }> {
  const rawData = fs.readFileSync('./src/data/balance.json', 'utf-8');
  return JSON.parse(rawData) || {};
}

function updateBalance(userId: string, cashEarned: number) {
  const balanceData = readBalanceData();
  if (!balanceData[userId]) {
    balanceData[userId] = { cash: 0, bank: 0 };
  }
  balanceData[userId].cash += cashEarned;
  writeBalanceData(balanceData);
}

function writeBalanceData(data: Record<string, { cash: number; bank: number }>) {
  fs.writeFileSync('./src/data/balance.json', JSON.stringify(data));
}
