import { Client, Guild } from 'eris';
import config from '../config.json';

export function handleGuildCreate(bot: Client, guild: Guild) {
    if (config.logGuildJoinLeave) {
        console.log(`Bot joined a new guild: ${guild.name} (${guild.id})`);
    }
}

export function handleGuildDelete(bot: Client, guild: Guild) {
    if (config.logGuildJoinLeave) {
        console.log(`Bot left a guild: ${guild.name} (${guild.id})`);
    }
}