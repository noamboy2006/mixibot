const securedServers = require('../data/securedServers.json')
const fs = require('fs')
const temp = {}
module.exports = (msg) => {
  if (msg.author.bot) return
  if (msg.member.hasPermission('ADMINISTRATOR')) return
  if (require('./muted.js').isMuted(msg.author)) return
  if (msg.content.includes('https://discord.gg/') || msg.content.includes('https://discordapp.com/invite/')) {
    const muted = require('../data/muted.json')
    msg.channel.send('<@' + msg.author.id + '> 홍보가 의심됩니다. 믹시봇 서버 보안 시스템이 자동으로 당신을 뮤트하였습니다. 이것이 오류라면 서버 관리자에게 뮤트해제요청을 하십시오.')
    muted.list.push({ guild: msg.guild.id, user: msg.author.id })
    fs.writeFileSync('./data/muted.json', JSON.stringify(muted, null, 2))
    return
  }
  if (securedServers.includes(msg.guild.id)) {
    if (temp[msg.guild.id] === undefined) temp[msg.guild.id] = {}
    if (temp[msg.guild.id][msg.author.id] === undefined) {
      temp[msg.guild.id][msg.author.id] = [msg.content]
      return
    }
    temp[msg.guild.id][msg.author.id].push(msg.content)
    setTimeout(() => {
      temp[msg.guild.id][msg.author.id].splice(temp[msg.guild.id][msg.author.id].findIndex((elem) => elem === msg.content))
    }, 3000)
    if (temp[msg.guild.id][msg.author.id].length >= 8) {
      const muted = require('../data/muted.json')
      msg.channel.send('<@' + msg.author.id + '> 도배가 의심됩니다. 믹시봇 서버 보안 시스템이 자동으로 당신을 뮤트하였습니다. 이것이 오류라면 서버 관리자에게 뮤트해제요청을 하십시오.')
      muted.list.push({ guild: msg.guild.id, user: msg.author.id })
      fs.writeFileSync('./data/muted.json', JSON.stringify(muted, null, 2))
      return
    }
    if (temp[msg.guild.id][msg.author.id].filter(elem => elem === msg.content).length >= 3) {
      const muted = require('../data/muted.json')
      msg.channel.send('<@' + msg.author.id + '> 도배가 의심됩니다. 믹시봇 서버 보안 시스템이 자동으로 당신을 뮤트하였습니다. 이것이 오류라면 서버 관리자에게 뮤트해제요청을 하십시오.')
      muted.list.push({ guild: msg.guild.id, user: msg.author.id })
      fs.writeFileSync('./data/muted.json', JSON.stringify(muted, null, 2))
    }
  }
}
