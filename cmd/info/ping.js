const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'ping',
  category: 'info',
  description: 'shows bot ping',
  exec: (client, msg) => {
    const embed = new MessageEmbed()
      .setTitle('Pong!')
      .setColor(client.color)
      .setDescription('Message: ' + (new Date().getTime() - msg.createdTimestamp) + ' ms\nAPI: ' + Math.round(client.ws.ping) + 'ms')
    msg.channel.send(embed)
  }
}
