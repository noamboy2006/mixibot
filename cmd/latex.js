/* eslint-disable no-control-regex */
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'latex',
  isValid: (msg, client) => {
    if (msg.content.substring(6).trim().split('`').length !== 3) return '>latex \\`수식\\` 형태로 메세지를 작성해주세요.'
    if (msg.content.substring(6).trim().split('`')[1] === '') return '수식을 입력해주세요'
    if (!/^[\x00-\x7F]*$/.test(msg.content.substring(6).trim().split('`')[1])) return '퉤'
    return 0
  },
  exec: (msg, client) => {
    const embed = new MessageEmbed()
      .setDescription('<@' + msg.author.id + '>님이 요청하신 수식')
      .setImage('https://chart.googleapis.com/chart?cht=tx&chl=' + encodeURIComponent(msg.content.substring(6).trim().split('`')[1]) + '&chf=bg,s,00000000&chco=ffffff')
      .setColor('#1e90ff')
    msg.channel.send(embed)
  }
}
