const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'userinfo',
  category: 'info',
  description: 'shows the user\'s information',
  exec: (client, msg) => {
    if (msg.mentions.members.size > 2) {
      msg.channel.send('Please mention only one user.')
      return
    }
    let member
    if (msg.mentions.members.size === 1) {
      member = msg.mentions.members.first()
    } else {
      member = msg.member
    }
    const Embed = new MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ format: 'png' }))
      .setColor(client.color)
      .setTitle(`Information of ${member.user.tag}`)
      .setDescription(
        `**\\> Username:** ${member.user.username}
        **\\> User ID:** ${member.user.id}
        **\\> Account create date:** ${member.user.createdAt.toDateString()}
        **\\> Server join date:** ${msg.member.joinedAt.toDateString()}`
      )
    msg.channel.send(Embed)
  }
}
