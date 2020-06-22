const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'vote',
  category: 'utility',
  description: 'creates a vote. %vote %option1 %option2 ...',
  exec: async (client, msg) => {
    const alphabet = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿']
    const args = msg.content.substring(1).split(client.prefix)
    args.shift()
    const Embed = new MessageEmbed()
      .setColor(client.color)
    if (args.length <= 1) {
      msg.channel.send('Not enough options.')
      return
    }
    if (args.length >= 21) {
      msg.channel.send('To many options.')
      return
    }
    for (let i = 0; i < args.length; i++) {
      Embed.addField(alphabet[i], args[i], true)
    }
    const m = await msg.channel.send(Embed)
    for (let i = 0; i < args.length; i++) {
      m.react(alphabet[i])
    }
  }
}
