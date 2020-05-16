const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
  name: 'dog',
  category: 'fun',
  description: 'Shows a cute dog!',
  exec: async (client, msg) => {
    const result = await Axios.get('https://dog.ceo/api/breeds/image/random')
    const Embed = new MessageEmbed()
      .setTitle('a cute dog!')
      .setURL(result.data.message)
      .setImage(result.data.message)
      .setColor(client.color)
      .setFooter('powered by dog.ceo')
    msg.channel.send(Embed)
  }
}
