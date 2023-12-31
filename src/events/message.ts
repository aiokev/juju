import { MessageContent, TextChannel } from 'eris';
import { defaultColor, errorColor, successColor, warningColor } from '../utils/colors';

export function createDeleteLog(message: any): MessageContent {
  const embed = {
    title: 'Message Deleted',
    color: errorColor,
    timestamp: new Date().toISOString(),
    fields: [
      {
        name: 'Author',
        value: `${message.author.username}#${message.author.discriminator} (${message.author.id})`,
        inline: true,
      },
      {
        name: 'Channel',
        value: `${message.channel instanceof TextChannel ? message.channel.mention : 'Unknown'}`,
        inline: true,
      },
      {
        name: 'Content',
        value: message.content || 'Content unavailable (probably an embed)',
        inline: false,
      },
    ],
  };

  if (message.attachments.length > 0) {
    const attachment = message.attachments[0];

    if (attachment.width && attachment.height) {
      embed.image = { url: attachment.url };
    } else {
      embed.fields.push({
        name: 'Attachment',
        value: attachment.url,
      });
    }
  }

  return { embed };
}
