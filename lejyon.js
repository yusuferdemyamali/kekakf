const Discord = require('discord.js');
const client = new Discord.Client();
const isaret = require('./isaret.json');
const { Client, MessageEmbed } = require('discord.js')

var prefix = isaret.prefix 

//Botun aktivitesi
client.on('ready', () => {
  console.log(`inegolden nefret ediyorum ${client.user.tag}!`);
  client.user.setActivity('boranin got deligini dilliyor', { type: 'STREAMING'})
  .then(presence => console.log('inegol online'))
});

//Oto-Rol 
client.on("guildMemberAdd", member => {
  try {
  let role = member.guild.roles.cache.find(role => role.name === 'guest')
  member.roles.add(role);
} catch(e) {
  console.log(e)
}
});

//Rol Verme
client.on("message", message => {
  if (message.content.startsWith('rolver')) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Bunu yapamazsın')
    let role = message.mentions.roles.first();
    let member = message.mentions.members.first();
    member.roles.add(role)
  }
});

//oylama
client.on('message' , message => {
  if(message.content.startsWith('.oylama')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('Bunu yapamazsın')
    if (!botmesajı) return message.reply('neyi oylayacagimizi yazmadin aq sala');
    message.delete(message.author)
    const embed = new MessageEmbed()
    .setTitle('OYLAMA')
    .setDescription(botmesajı)
    .setFooter('BORAAMMM');
    message.channel.send({ embed: embed }).then( embedMessage => {
      embedMessage.react("✅")
      embedMessage.react("❌");
    })
  }
})

//Sunucuya katılanları loglar.
client.on('guildMemberAdd', member =>{
  const gelengiden = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden');
  const embed = new MessageEmbed()

  .setTitle('inegolbot Log Sistemi')
  .setDescription(`${member}`)
  .setAuthor('Kullanıcı Girişi')
  .setTimestamp()
  .setColor("57F287")
  .setThumbnail('https://d.newsweek.com/en/full/1904169/paul-miller-gypsy-crusader.jpg')
  .addField(member, 'made by inegol');

  gelengiden.send(embed)
})

//Sunucudan quit atanları loglar.
client.on('guildMemberRemove', member => {
  const gelengiden = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden');
  const embed = new MessageEmbed()

  .setTitle('inegolbot Log Sistemi')
  .setDescription(`${member}`)
  .setAuthor('Kullanıcı Çıkışı')
  .setTimestamp()
  .setColor("ED4245")
  .setThumbnail('https://d.newsweek.com/en/full/1904169/paul-miller-gypsy-crusader.jpg')
  .addField(member, 'made by inegol');

  gelengiden.send(embed)

})

//kick komutu
client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('.kick')) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('rolun yok aptal oc')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
          const log = message.guild.channels.cache.find(channel => channel.name === 'log-kanalı')
           log.send(`${user.tag} attık gitti`);
          })
          .catch(err => {
            message.reply('bot patladi inegole yaz.');
            console.error(err);
          });
      } else {
        message.reply("boyle biri sunucuda yok");
      }
    } else {
      message.reply("kicklenecek kisiyi yazmadin aq");
    }
  }
});

//ban komutu
client.on('message', message => {
  if (!message.guild) return;
if (message.content.startsWith('.ban')) {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('rolun yok aptal oc')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
          const log = message.guild.channels.cache.find(channel => channel.name === 'log-kanalı')
           log.send(`${user.tag} banladik gittir.`);
          })
          .catch(err => {
            message.reply('bot patladi inegole yaz.');
            console.error(err);
          });
      } else {
        message.reply("boyle biri sunucuda yok");
      }
    } else {
      message.reply("banlanacak kisiyi yazmadin aq.");
    }
  }
});

//inegol yazılınca mesaj kanalına atılacak mesaj
client.on('message', message => {
  if (!message.guild) return;
if (message.content.startsWith('.öp')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .fetch()
          .then(() => {
          const log = message.guild.channels.cache.find(channel => channel.name === 'chat')
           message.reply(`seni yaliyor yutuyor ${user.username} https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTJ2aHVxam1hMHc3MjBpMWtoOW1ldng3dXdrYm1kcmhrNDJxZ2QzMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xWBpI79EOns1G/giphy.gif`);
          })
          .catch(err => {
            message.reply('bot patladi inegole yaz.');
            console.error(err);
          });
      } else {
        message.reply("bot sehid");
      }
    } else {
      message.reply("bot sehid.");
    }
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bahar') {
    msg.channel.send('vallahi biz bahari ozledik');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'alaca') {
    msg.channel.send('test cozuom sg');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'malaca') {
    msg.channel.send('o ananı bi sikerim senin  -alaca');
  }
});

//Arap selamı verilince özelden atılacak mesaj.
client.on('message', msg => {
  if (msg.content.toLowerCase() ==='sa') {
    msg.author.send('bi daha arap selamı verirsen ananı sikerim');
  }
});

client.on('message', message => {
  if (message.content.toLowerCase() === 'onder') {
    const kanal = new MessageEmbed()

    .setTitle('onder gypsy a saygı duyun')
    .setDescription('onder gypsy a saygı duyun')
    .setAuthor('onder gypsy a saygı duyun')
    .setColor("RANDOM")
    .setThumbnail('https://d.newsweek.com/en/full/1904169/paul-miller-gypsy-crusader.jpg')
    .addField(':heart: onder gypsy a saygı duyun', 'yasasin buyuk onder');
    message.channel.send(kanal);
  }
});

//Bot tokeni
client.login('MTE1MDUyNzUyMTkzNTM0MzYyNQ.Gq_ZIb.O7xNkgkOsnl6pvDc3xZXfCCDZkRMgOvmgoUMBo');