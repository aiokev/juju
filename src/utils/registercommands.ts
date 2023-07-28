// command imports
import balanceCommand from '../commands/balance';
import workCommand from '../commands/work';
import helpCommand from '../commands/help';
import leaderboardCommand from '../commands/leaderboard';
import sourceCommand from '../commands/source';
import gambleCommand from '../commands/gamble';
import dailyCommand from '../commands/daily';

// command exports
export const balanceCmd = {
    name: balanceCommand.name,
    description: balanceCommand.description,
    options: balanceCommand.options,
}

export const workCmd = {
    name: workCommand.name,
    description: workCommand.description,
}

export const helpCmd = {
    name: helpCommand.name,
    description: helpCommand.description,
}

export const leaderboardCmd = {
    name: leaderboardCommand.name,
    description: leaderboardCommand.description,
}

export const sourceCmd = {
    name: sourceCommand.name,
    description: sourceCommand.description,
}

export const gambleCmd = {
    name: gambleCommand.name,
    description: gambleCommand.description,
    options: gambleCommand.options,
}

export const dailyCmd = {
    name: dailyCommand.name,
    description: dailyCommand.description,
}