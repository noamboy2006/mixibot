const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'rps',
  category: 'fun',
  description: 'Can play a rock paper sissors game with mixibot!',
  exec: async (client, msg) => {
    const Embed = new MessageEmbed()
      .setColor(client.color)
      .setDescription('choose a emoji in 15 seconds!')
    const m = await msg.channel.send(Embed)
    const arr = ['⛰️', '📰', '✂️']
    if (!m.member.hasPermission('ADD_REACTIONS')) {
      m.delete()
      m.channel.send('MixiBot has no permission to react to messages. aborted.')
    }
    arr.forEach(async elem => await m.react(elem))
    const collector = m.createReactionCollector((r, u) => (arr.find(e => e === r.emoji.name) !== undefined) && (u.id === msg.author.id), { time: 15000 })
    collector.on('collect', r => {
      collector.stop()
    })
    collector.on('end', res => {
      if (m.member.hasPermission('MANAGE_MESSAGES')) {
        m.reactions.removeAll()
      }
      if (res.size === 0) {
        const Embed = new MessageEmbed()
          .setTitle('You lost!')
          .setColor('#ff0000')
          .setDescription('You didn\'t choosed!')
        m.edit(Embed)
        return
      }
      const didWeWin = Math.floor(Math.random() * 3)
      let Embed
      switch (didWeWin) {
        case 0:
          Embed = new MessageEmbed()
            .setTitle('You lost!')
            .setColor('#ff0000')
            .setDescription('Your choice: ' + res.first().emoji.name + ' VS Bot\'s choice: ' + arr[(arr.findIndex(e => e === res.first().emoji.name) + 1) % 3])
          m.edit(Embed)
          break
        case 1:
          Embed = new MessageEmbed()
            .setTitle('You won!')
            .setColor('#00ff00')
            .setDescription('Your choice: ' + res.first().emoji.name + ' VS Bot\'s choice: ' + arr[(arr.findIndex(e => e === res.first().emoji.name) - 1) % 3])
          m.edit(Embed)
          break
        case 2:
          Embed = new MessageEmbed()
            .setTitle('It\'s a tie!')
            .setColor('#ffff00')
            .setDescription('Your choice: ' + res.first().emoji.name + ' VS Bot\'s choice: ' + arr[arr.findIndex(e => e === res.first().emoji.name) % 3])
          m.edit(Embed)
          break
      }
    })
  }
}
