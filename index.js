const Discord = require('discord.js')
const env = require('./env.json')
const muted = require('./etc/muted.js')
const fs = require('fs')

const client = new Discord.Client()

client.on('ready', () => {
  client.user.setActivity('>help')
  if (env.devMode) client.user.setActivity('현재 개발모드, 명령어 사용 불가')
  console.log('I am ready!')
})

client.on('message', msg => {
  // permission check
  if (!msg.guild.me.hasPermission('ADMINISTRATOR')) msg.guild.leave()
  // dm check
  if (msg.channel.type === 'dm') return
  // muted check
  if (muted.isMuted(msg)) {
    muted.erase(msg)
    return
  }
  // etc checks
  if (!msg.content.startsWith(env.prefix)) return
  if (msg.author.bot) return
  if (env.devMode && !(env.devs.includes(msg.author.id))) return
  // get cmd infos
  const cmdList = []
  fs.readdirSync('./cmd', 'utf-8').forEach((fileName) => {
    const cmdInfo = require('./cmd/' + fileName)
    cmdList.push(cmdInfo)
  })
  // execute cmd
  const input = msg.content.substr(1).split(' ')[0].trim()
  const cmd = cmdList.find(elem => elem.name === input)
  if (!(/^[a-zA-Z()]+$/.test(input))) return
  if (cmd === undefined) {
    msg.channel.send('해당 명령어는 존재하지 않는 명령어 입니다. 다시 시도해주세요.')
    return
  }
  if (cmd.isValid(msg, client) !== 0) {
    msg.channel.send(cmd.isValid(msg, client))
    return
  }
  cmd.exec(msg, client)
})

client.login(env.token)
