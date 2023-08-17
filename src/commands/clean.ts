import { CommandInteraction } from 'eris';
import config from '../config.json';
import { defaultColor, errorColor, successColor, warningColor } from '../utils/colors';

export default {
  name: 'clean',
  description: 'Delete between 1 and 1000 messages in the channel.',
  options: [
    {
      name: 'amount',
      description: 'The number of messages to delete (1 to 1000).',
      type: 4,
      required: true,
    },
  ],
  async execute(interaction: CommandInteraction) {
    if (!interaction.member?.permissions.has('manageMessages')) {
      const embed = {
        description: `${interaction.member?.mention}: You do not have the required permissions to use this command.`,
        color: warningColor,
      };
      interaction.createMessage({ embed, flags: config.invisCmdResponses? 64 : 0 });
      return;
    }

    const amountOption = interaction.data.options[0];
    if (!amountOption || amountOption.type !== 4) {
      console.error('Invalid amount option.');
      return;
    }

    const amount = amountOption.value;
    if (amount < 1 || amount > 1000) {
      const embed = {
        description: `${interaction.member?.mention}: Please provide a number between 1 and 1000.`,
        color: warningColor,
      };
      interaction.createMessage({ embed, flags: 64 });
      return;
    }

    const messages = await interaction.channel?.getMessages(amount);
    if (!messages || messages.length === 0) {
      const embed = {
        description: `${interaction.member?.mention}: No messages found to delete.`,
        color: errorColor,
      };
      interaction.createMessage({ embed, flags: 64 });
      return;
    }

    const deletedCount = messages.length;
    const messageIds = messages.map((msg) => msg.id);
    await interaction.channel?.deleteMessages(messageIds);

    const embed = {
      description: `${interaction.member?.mention}: Deleted **${deletedCount}** messages in this channel.`,
      color: defaultColor,
    };
    interaction.createMessage({ embed, flags: 64 });
  },
};
