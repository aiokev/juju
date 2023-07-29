import { CommandInteraction } from 'eris';

// color config
import { defaultColor } from '../bot';
import { warningColor } from '../bot';
import { successColor } from '../bot';
import { errorColor } from '../bot';

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
      interaction.createMessage({ embed });
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
        flags: 64,
      };
      interaction.createMessage({ embed });
      return;
    }

    const messages = await interaction.channel?.getMessages(amount); // Fetch messages to be deleted (+1 to include the command message)
    if (!messages || messages.length === 0) {
      const embed = {
        description: `${interaction.member?.mention}: No messages found to delete.`,
        color: errorColor,
        flags: 64,
      };
      interaction.createMessage({ embed });
      return;
    }

    const deletedCount = messages.length;
    const messageIds = messages.map((msg) => msg.id);
    await interaction.channel?.deleteMessages(messageIds);

    const embed = {
      description: `${interaction.member?.mention}: Deleted **${deletedCount}** messages in this channel.`,
      color: defaultColor,
      flags: 64,
    };
    interaction.createMessage({ embed });
  },
};
