const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ping',
  isValid: (msg, client) => {
    return 0
  },
  exec: (msg, client) => {
    const embed = new MessageEmbed()
      .setTitle('Pong!')
      .setColor('#1e90ff')
      .setDescription('Message: ' + (new Date().getTime() - msg.createdTimestamp) + ' ms\nAPI: ' + Math.round(client.ws.ping) + 'ms')
    msg.channel.send(embed)
  }
}
