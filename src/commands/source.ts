import { CommandInteraction } from 'eris';
import config from '../config.json';

export default {
  name: 'source',
  description: 'Get the bot\'s source code.',
  execute(interaction: CommandInteraction) {
    interaction.createMessage({ content: `https://github.com/keptz/juju`, flags: config.invisCmdResponses? 64 : 0 });
  }
};
