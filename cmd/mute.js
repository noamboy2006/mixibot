const data = require('../data/muted.json')
const env = require('../env.json')
const fs = require('fs')

module.exports = {
  name: 'mute',
  isValid: (msg, client) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return '당신은 이 서버의 관리자가 아니므로 뮤트할 권한이 없습니다.'
    if (msg.mentions.users.size <= 0) return '뮤트할 사용자를 맨션해주세요.'
    if (msg.mentions.users.size > 1) return '뮤트할 사용자는 한명만 선택해주세요.'
    if (msg.mentions.users.array()[0].id === msg.author.id) return '본인은 뮤트할 수 없습니다.'
    if (env.devs.find(elem => elem === msg.mentions.users.array()[0].id) !== undefined) return '뮤트할 수 없는 사용자입니다.'
    if (data.list.find(elem => (elem.guild === msg.guild.id) && (elem.user === msg.mentions.users.array()[0].id)) !== undefined) return '이미 뮤트된 사용자입니다.'
    return 0
  },
  exec: (msg, client) => {
    data.list.push({ guild: msg.guild.id, user: msg.mentions.users.array()[0].id })
    fs.writeFileSync('./data/muted.json', JSON.stringify(data, null, 2))
    msg.channel.send('해당 사용자가 뮤트되었습니다.')
  }
}
