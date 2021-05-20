const Discord = require('discord.js');
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase("myDatabase");
require('../MesajYanitla.js')
exports.run = async (client, message, args) => {

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.inlineReply(`**Yönetici yetkin yoh!**`);
  const kari = db.fetch(`noydikiz.${message.guild.id}`) 
  if(!kari) return message.inlineReply(`**Bu sistemde tüm sistemler açık değildi, sadece açık olan sistemler veritabanından silindi.**`)
  
  db.delete(`noydikiz.${message.guild.id}`);
  db.delete(`noydikayitsiz.${message.guild.id}`);
  db.delete(`noydierkek.${message.guild.id}`);
  db.delete(`noydikanal.${message.guild.id}`);
  const yarrabeniyarraaskina = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle(client.user.username)
  .setDescription(`**Sıfırladım ok**`)
  return message.inlineReply(yarrabeniyarraaskina)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sifirla'],
  permLevel: 0
};

exports.help = {
  name: 'sifirla'
};