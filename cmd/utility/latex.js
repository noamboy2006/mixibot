/* eslint-disable no-control-regex */
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'latex',
  category: 'utility',
  exec: (client, msg) => {
    if (msg.content.substring(6).trim().split('`').length !== 3) return 'message content should be as >latex \\`expression\\`'
    if (msg.content.substring(6).trim().split('`')[1] === '') return 'please write a command'
    if (!/^[\x00-\x7F]*$/.test(msg.content.substring(6).trim().split('`')[1])) return 'invalid charactor detacted'
    const embed = new MessageEmbed()
      .setDescription('Rendered LaTeX requested from <@' + msg.author.id + '>')
      .setImage('https://chart.googleapis.com/chart?cht=tx&chl=' + encodeURIComponent(msg.content.substring(6).trim().split('`')[1]) + '&chf=bg,s,00000000&chco=ffffff')
      .setColor(client.color)
    msg.channel.send(embed)
  }
}