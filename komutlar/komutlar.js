const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

require('../MesajYanitla.js');
var prefix = ayarlar.prefix;
exports.run = async(client, message, args) => { 
          
           const noydra = new Discord.MessageEmbed()
 
        .setColor('#fff000')
        .setDescription(`Komutlar \n ${prefix}erkek-rol @Rol \n ${prefix}kayıtchat #Kanal \n ${prefix}kayıtsız-rol @Rol \n ${prefix}kız-rol @Rol \n ${prefix}sifirla \n ${prefix}tag`)
     

        return message.inlineReply(noydra);


          };
exports.conf = {
        enabled : true,
        guildOnly : false,
        aliases : ['komutlar'],
        permLevel : 0
}

exports.help = {
        name : 'komutlar',
        description : 'Komutları gösterir',
        usage : 'komutlar'
}


