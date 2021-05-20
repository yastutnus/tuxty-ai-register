const Discord = require('discord.js');
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase("myDatabase");
require('../MesajYanitla.js')
exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.inlineReply(`**Bu komutu kullanabilmek için Yönetici yetkisine sahip olmalısın.**`);

  if(!message.mentions.roles.first()) return message.inlineReply('**Erkek rolü olacak rolü etiketlemelisin.**');

  const pokdra = message.mentions.roles.first();
  db.set(`noydierkek.${message.guild.id}`, pokdra.id);
const yarramikitla = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle('**Başarı!**')
  .setFooter('**Eğer rolü değiştirmek istersen bu komudu tekrar kullan.**')
  .setDescription(`Erkek rolü **${pokdra}** olarak ayarlandı.`);
  return message.inlineReply(yarramikitla)


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['erkek-rol'],
  permLevel: 0
};

exports.help = {
  name: 'erkek-rol'
};