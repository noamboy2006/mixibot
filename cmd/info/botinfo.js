const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'botinfo',
  category: 'info',
  description: 'shows the bot\'s information',
  exec: (client, msg) => {
    const Embed = new MessageEmbed()
      .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
      .setColor(client.color)
      .addField(
        'Bot Info',
        `**\\>Joined servers:** ${client.guilds.cache.size}
        **\\> Bot Users:** ${client.users.cache.size}
        **\\> Available Bot Commands:** ${client.commands.length}`
      )
      .addField(
        'Deveoloper',
        'dissolve#8112([github](https://github.com/noamboy2006))'
      )
    msg.channel.send(Embed)
  }
}
