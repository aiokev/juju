import { CommandInteraction } from 'eris';
import config from '../config.json';

// color config
import { defaultColor } from '../bot';

export default {
  name: 'help',
  description: 'Help command.',
  execute(interaction: CommandInteraction) {
    const embed = {
        title: `JuJu Help`,
        description: `JuJu is an open-source multipurpose discord bot. For more in depth help and information you should visit https://discord.gg/frkqsQEZ2W.`,
        color: defaultColor,
    }
    interaction.createMessage({ embed });
    if (config.logCommands) {
      console.log(`${interaction.member?.username} executed /${interaction.data.name}.`)
    }}
};
