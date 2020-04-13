const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ping',
  isValid: (msg) => {
    return 0
  },
  exec: (msg) => {
    const embed = new MessageEmbed()
      .setTitle('Pong!')
      .setColor('#1e90ff')
      .setDescription((new Date().getTime() - msg.createdTimestamp) + ' ms')
    msg.channel.send(embed)
  }
}
