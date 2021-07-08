const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');

const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase("myDatabase");

client.queue = new Map()
require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

client.on('guildMemberAdd', async member => {
  member.setNickname("İSİM | YAŞ")
})
client.on('guildMemberAdd', async member => {

  const guild = member.guild;
  const user = member.user;
  
  if(db.fetch(`noydikayitsiz.${guild.id}`)) {
    if(!guild.roles.cache.get(db.fetch(`noydikayitsiz.${guild.id}`)) || member.roles.cache.has(db.fetch(`noydikayitsiz.${guild.id}`))) return;
    const gacıdata = db.fetch(`noydikiz.${guild.id}`);
    if(!gacıdata) return;
    const gacı = guild.roles.cache.get(gacıdata);
    const pipilidata = db.fetch(`noydierkek.${guild.id}`);
    if(!pipilidata) return;
    const pipili = guild.roles.cache.get(pipilidata);
    member.roles.add(db.fetch(`noydikayitsiz.${guild.id}`));

    const noydra = guild.channels.cache.get(await db.fetch(`noydikanal.${guild.id}`));
    if(!noydra) return;

    if(db.fetch(`kaydoldu.${guild.id}.${user.id}`)) {
      member.roles.remove(db.fetch(`noydikayitsiz.${guild.id}`));
      const kayitgecmis = await db.fetch(`kaydoldu.${guild.id}.${user.id}`);
      if(kayitgecmis.sex == 'K') {
        member.roles.add(gacı.id);
      } else {
        member.roles.add(pipili.id);
      };

      member.setNickname(`${db.fetch(`noyditag.${guild.id}`) ? `${db.fetch(`noyditag.${guild.id}`)} ` : ''}${kayitgecmis.name} | ${kayitgecmis.yaş}`);
      return noydra.send(`Veritabanında önceden kayıt bulundu. Kayıt tamamlandı. **${kayitgecmis.name} | ${kayitgecmis.yaş}**`);

    };

    var ç = false;
    var s = false;

    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setImage('https://images-ext-1.discordapp.net/external/izL1xDlKn21lWw3bTGXBxihnHwjTj1vGwyHJNCQL4OY/http/eren.with-your.mom/r/kobstcrvb9a.gif')
    noydra.send(`<@${member.user.id}> hoş geldin dostum! Kayıt olmak için buraya sırayla ismini ve yaşını yaz!`);
    noydra.send(embed);

    const filter = m => m.author.id === member.user.id;
    const collector = noydra.createMessageCollector(filter, { time: 0 });

    collector.on('collect', async collected => {
      if(s == true) return;
          if(ç == false) {
          const cm = collected;
          if(cm.content.split('').some(x => !isNaN(x))) cm.reply('**Sadece ismini yaz.** \n **Yaşını birazdan alacağım.**');

            const isimler = require('./isimler.json').map(x => x);
            if(!isimler.some(x => x.name.toLowerCase() === cm.content.toLowerCase())) cm.reply(`**İsmini yazman gerekiyor dostum!** \n**Not: İsmini bilmiyorsan git kimliğine bak, ismin iki isimse. (Eren Can gibi) Erencan yaz. \n Eğer hata alıyorsan ismin sahtedir veya kayıtlarda bulunamamıştır. Bir yetkiliye yaz.**`);
            const data = isimler.find(x => x.name.toLowerCase() === cm.content.toLowerCase());
            const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setFooter(`İsmini hatalı yazdıysan bi yetkiliye yaz.`)
            .setDescription(`**Merhaba ${data.name.split('')[0].toUpperCase()}${data.name.split('').slice(1).join('')} şimdi yaşını yaz.**`)
            noydra.send(embed);
            ç = true;
            if(s == false) {
            const collectorr = noydra.createMessageCollector(filter, { time: 0 });
            var x = false;
            collectorr.on('collect', collectedd => {
              if(x == true) return;
              const cd = collectedd;
              if(isNaN(cd.content)) return cd.reply(`**Yaşını sayı biçiminde yaz!**`);
              if(Number(cd.content) > 17) return cd.reply(`**Merhaba beyefendi / hanımefendi ${cd.content} yaşında olduğunuzu söylediniz. Bunu kanıtlamanız için bir yetkiliye ulaşmanız gerekiyor**`);
              member.roles.remove(db.fetch(`noydikayitsiz.${guild.id}`));
              if(data.sex == 'K') {
                member.roles.add(gacı.id);
              } else {
                member.roles.add(pipili.id);
              };
              db.set(`kaydoldu.${guild.id}.${user.id}`, { 
                name: `${data.name.split('')[0].toUpperCase()}${data.name.split('').slice(1).join('')}`,
                sex: data.sex,
                yaş: Number(cd.content)
              });
              s = true;
              x = true;
              member.setNickname(`${db.fetch(`noyditag.${guild.id}`) ? `${db.fetch(`noyditag.${guild.id}`)} ` : ''}${data.name.split('')[0].toUpperCase()}${data.name.split('').slice(1).join('')} | ${cd.content}`);
              return noydra.send(`**Kayıt tamamlandı. Aramıza hoş geldin ${data.name.split('')[0].toUpperCase()}${data.name.split('').slice(1).join('')}**`);
      
            });
          };
        };
        });

  };

});
