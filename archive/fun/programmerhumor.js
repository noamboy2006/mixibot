const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
  name: 'programmerhumor',
  category: 'fun',
  description: 'Shows a funny programming humor!',
  exec: async (client, msg) => {
    const result = await Axios.get('http://dissolve.kro.kr:8080/api/meme')
    const Embed = new MessageEmbed()
      .setURL(result.data)
      .setImage(result.data)
      .setColor(client.color)
      .setFooter('powered by dissolveAPI')
    msg.channel.send(Embed)
  }
}
