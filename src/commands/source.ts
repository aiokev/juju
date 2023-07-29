import { CommandInteraction } from 'eris';
import config from '../config.json';

export default {
  name: 'source',
  description: 'Get the bot\'s source code.',
  execute(interaction: CommandInteraction) {
    interaction.createMessage(`https://github.com/keptz/juju`);
  }
};
