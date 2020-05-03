const securedServers = require('../data/securedServers.json')
const fs = require('fs')

module.exports = {
  name: 'secure',
  isValid: (msg, client) => {
    if (msg.content.split(' ').length === 1) {
      return 0
    } else if (msg.content.split(' ').length === 2) {
      if (msg.member.hasPermission('ADMINISTRATOR')) {
        if (!(msg.content.split(' ')[1] === 'on' || msg.content.split(' ')[1] === 'off')) return '명령어를 잘못된 방법으로 사용하셨습니다'
        return 0
      } else return '관리자만 서버 설정을 다룰 수 있습니다'
    }
    return '명령어를 잘못된 방법으로 사용하셨습니다'
  },
  exec: (msg, client) => {
    if (msg.content.split(' ').length === 1) {
      if (!securedServers.includes(msg.guild.id)) {
        msg.channel.send('이 서버에서는 현재 믹시봇 서버 보안 기능이 비활성화 되어있습니다.')
      } else {
        msg.channel.send('이 서버에서는 현재 믹시봇 서버 보안 기능이 활성화 되어있습니다.')
      }
    } else {
      if (msg.content.split(' ')[1] === 'on') {
        if (securedServers.includes(msg.guild.id)) {
          msg.channel.send('이미 이 서버에서는 믹시봇 서버 보안 기능이 활성화 되어있습니다.')
        } else {
          securedServers.push(msg.guild.id)
          fs.writeFileSync('./data/securedServers.json', JSON.stringify(securedServers, null, 2))
          msg.channel.send('이 서버에서 믹시봇 서버 보안 기능을 활성화 시켰습니다.')
        }
      } else {
        if (!securedServers.includes(msg.guild.id)) {
          msg.channel.send('이미 이 서버에서는 믹시봇 서버 보안 기능이 비활성화 되어있습니다.')
        } else {
          msg.channel.send('이 서버에서 믹시봇 서버 보안 기능을 비활성화 시켰습니다.')
          securedServers.splice(securedServers.findIndex(elem => elem === msg.guild.id), 1)
          fs.writeFileSync('./data/securedServers.json', JSON.stringify(securedServers, null, 2))
        }
      }
    }
  }
}
