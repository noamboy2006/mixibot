const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'invite',
  category: 'info',
  exec: (client, msg) => {
    const embed = new MessageEmbed()
      .setColor(client.color)
      .setDescription('Invite mixibot with this link!\n[http://mixibot.olve.me](http://mixibot.olve.me)')
    msg.channel.send(embed)
  }
}