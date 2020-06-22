const Discord = require('discord.js')
const env = require('./env.json')
const fs = require('fs')

const client = new Discord.Client()

// load command
client.categories = fs.readdirSync('./cmd')
client.commands = []
client.categories.forEach(c => {
  fs.readdirSync('./cmd/' + c).forEach(n => {
    client.commands.push(require('./cmd/' + c + '/' + n))
  })
})
client.prefix = env.devMode ? env.testPrefix : env.prefix
client.color = env.color

client.on('ready', () => {
  client.user.setActivity(client.prefix + 'help')
  console.log('I am ready!')
})

client.on('guildCreate', guild => {
  if (fs.readdirSync('./data').find(elem => elem === guild.id) === undefined) {
    const data = {
      auto: false,
      modUsers: [guild.owner.id],
      modRoles: []
    }
    fs.writeFileSync('./data/' + guild.id + '.json', JSON.stringify(data, false, 2))
  }
})

client.on('message', msg => {
  // check
  if (msg.author.bot) return
  if (!msg.guild) return
  // auto_moderator
  require('./auto_moderator/index.js')(client, msg)
  // check if command
  if (!msg.content.startsWith(client.prefix)) return
  // find command
  const cmd = client.commands.find(cmd => cmd.name === msg.content.substring(1).split(' ')[0])
  if (cmd === undefined) {
    msg.channel.send('command `' + msg.content.substring(1).split(' ')[0] + '` does not exist.')
    return
  }
  cmd.exec(client, msg)
})

if (env.devMode) { client.login(env.testToken) } else { client.login(env.token) }
