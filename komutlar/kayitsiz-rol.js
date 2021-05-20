const Discord = require('discord.js');
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase("myDatabase");
require('../MesajYanitla.js')
exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.inlineReply(`**Bu komutu kullanabilmek için Yönetici yetkisine sahip olmalısın.**`);

  if(!message.mentions.roles.first()) return message.inlineReply('**kayıtsız rolü olacak rolü etiketlemelisin.**');

  const pokdra = message.mentions.roles.first();
  db.set(`noydikayitsiz.${message.guild.id}`, pokdra.id);
const yarramikitla = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle('**Başarı!**')
  .setFooter('**Eğer rolü değiştirmek istersen bu komudu tekrar kullan.**')
  .setDescription(`Kayıtsız rolü **${pokdra}** olarak ayarlandı.`);
  return message.inlineReply(yarramikitla)


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıtsız-rol'],
  permLevel: 0
};

exports.help = {
  name: 'kayıtsız-rol'
};