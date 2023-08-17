import * as fs from 'fs';

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function readLogChansData(): Record<string, string> {
  try {
    const rawData = fs.readFileSync('./src/data/logchans.json', 'utf-8');
    return JSON.parse(rawData) || {};
  } catch (error) {
    console.error('Error reading logchans.json:', error);
    return {};
  }
}
