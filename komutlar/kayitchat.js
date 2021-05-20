const Discord = require('discord.js');
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase("myDatabase");
require('../MesajYanitla.js')

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`**Bu komutu kullanabilmek için Yönetici yetkisine sahip olmalısın.**`);

  if(!message.mentions.channels.first()) return message.inlineReply('**kayıt chati etiketle!**');
  const eren = message.mentions.channels.first();
  db.set(`noydikanal.${message.guild.id}`, eren.id);
  const erenbed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle('**Başarı!**')
  .setFooter('**Eğer kanalı değiştirmek istersen bu komudu tekrar kullan.**')
  .setDescription(`Kayıt chat **${eren}** olarak ayarlandı.`);
  return message.inlineReply(erenbed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayitchat'],
  permLevel: 0
};

exports.help = {
  name: 'kayıtchat'
};