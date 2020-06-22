const { MessageEmbed } = require('discord.js')
const Axios = require('axios')
module.exports = {
  name: 'shorturl',
  category: 'utility',
  description: 'shorten a long url',
  exec: async (client, msg) => {
    if (msg.content.split(' ').length !== 2) return msg.channel.send('URL is invalid')
    if (!(msg.content.split(' ')[1].includes('.')) || !(msg.content.split(' ')[1].length > 6)) return msg.channel.send('URL is invalid')
    Axios.post(`https://shol.xyz/?url=${msg.content.split(' ')[1]}`)
      .then((result) => {
        const Embed = new MessageEmbed()
          .setColor(client.color)
          .setDescription(`shortened URL:[https://shol.xyz/${result.data.short}](https://shol.xyz/${result.data.short})`)
          .setFooter('powered by shol.xyz')
        return msg.channel.send(Embed)
      })
      .catch((e) => {
        return msg.channel.send('An error has occured. `' + e + '`')
      })
  }
}
