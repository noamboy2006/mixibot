const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'invite',
  category: 'info',
  exec: (client, msg) => {
    const embed = new MessageEmbed()
      .setColor(client.color)
      .setDescription('Invite mixibot with this link!\n[http://mixibot.olve.me](https://discordapp.com/api/oauth2/authorize?client_id=685133104884744244&permissions=0&scope=bot)')
    msg.channel.send(embed)
  }
}