import { CommandInteraction } from 'eris';
import config from '../config.json';
import { defaultColor, errorColor, successColor, warningColor } from '../utils/colors';

export default {
  name: 'channelstats',
  description: 'Get statistics about the channel.',
  options: [],
  async execute(interaction: CommandInteraction) {
    const messages = await interaction.channel.getMessages({ limit: 100 });
    const totalMessages = messages.length;
    const userMessages = new Map<string, number>();
    const guild = interaction.channel.guild;

    messages.forEach((message) => {
      const userId = message.author.id;
      if (!userMessages.has(userId)) {
        userMessages.set(userId, 1);
      } else {
        userMessages.set(userId, userMessages.get(userId)! + 1);
      }
    });

    const sortedUsers = Array.from(userMessages.entries()).sort((a, b) => b[1] - a[1]);
    const topUsers = sortedUsers.slice(0, 10);
    let statsDescription = '';

    topUsers.forEach(([userId, messageCount], index) => {
      const user = guild.members.get(userId);
      if (user) {
        statsDescription += `\`${index + 1}\` **${user.username}**: ${messageCount}\n`;
      }
    });

    const statsMessage = {
          title: `Channel Statistics`,
          description: statsDescription,
          color: defaultColor,
          footer: {
            text: `Total messages: ${totalMessages}`,
          },
        };

    await interaction.createMessage({ embed: statsMessage, flags: config.invisCmdResponses? 64 : 0 });
  },
};
