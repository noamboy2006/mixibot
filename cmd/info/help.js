const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'help',
  category: 'info',
  description: 'shows help message',
  exec: (client, msg) => {
    if (msg.content.split(' ').length === 2) {
      const cmd = client.commands.find(cmd => cmd.name === msg.content.split(' ')[1])
      if (cmd === undefined) {
        msg.channel.send('command `' + msg.content.split(' ')[1] + '` does not exist.')
        return
      }
      const Embed = new MessageEmbed()
        .setTitle(`Help for ${cmd.name}`)
        .addField('Category', cmd.category)
        .addField('Description', cmd.description)
      msg.channel.send(Embed)
    } else if (msg.content.split(' ').length === 1) {
      const Embed = new MessageEmbed()
        .setTitle('Mixibot Help')
      client.categories.forEach(c => {
        let str = ''
        client.commands.forEach(cmd => {
          if (cmd.category === c) {
            str += '`' + cmd.name + '`, '
          }
        })
        if (str !== '') Embed.addField(c, str.substring(0, str.length - 2))
      })
      msg.channel.send(Embed)
    }
  }
}
