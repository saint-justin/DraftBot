import { MessageEmbed } from "discord.js";
import { EmbeddedMessageData } from "./Types";

const generateEmbeddedMessage = (messageData: EmbeddedMessageData) => {
  const msg = new MessageEmbed();

  // Required info
  msg.setColor('#EC9192').setTitle(messageData.title);

  // Optional info
  if (messageData.url) msg.setURL(messageData.url);
  if (messageData.image) msg.setImage(messageData.image);

  // Dev footer
  msg.setFooter({ text: 'Bot Developed by Justin Vaughn' })

  return msg;
};