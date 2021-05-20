const Discord = require('discord.js');
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase("myDatabase");
require('../MesajYanitla.js')
exports.run = async (client, message, args) => {

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.inlineReply(`**Yönetici yetkin yoq**`);

  if(!args[0]) return message.inlineReply(`**Hatalı kullanım! !tag <tag> veya !tag sıfırla yazmalısın**`);
  if(args[0] === 'sıfırla') {
    db.delete(`noyditag.${message.guild.id}`);
    return message.inlineReply('**Tag başarıyla sıfırlandı!**');
  } else {
    db.set(`noyditag.${message.guild.id}`, args[0]);
    return message.inlineReply(new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('**Başarı!**')
    .setFooter('**Tagı değiştirmek istersen komudu baştan kullan.kapatmak için !tag sıfırla yaz**')
    .setDescription(`tag **${args[0]}** bu tag konacak.`));
  };
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['tag'],
  permLevel: 0
};

exports.help = {
  name: 'tag'
};