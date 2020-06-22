const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
  name: 'cat',
  category: 'fun',
  description: 'Shows a cute cat!',
  exec: async (client, msg) => {
    const result = await Axios.get('http://aws.random.cat/meow')
    const Embed = new MessageEmbed()
      .setTitle('a cute cat!')
      .setURL(result.data.file)
      .setImage(result.data.file)
      .setColor(client.color)
      .setFooter('powered by random.cat')
    msg.channel.send(Embed)
  }
}
