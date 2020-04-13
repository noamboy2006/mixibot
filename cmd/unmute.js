const data = require('../data/muted.json')
const fs = require('fs')

module.exports = {
  name: 'unmute',
  isValid: (msg) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) return '당신은 이 서버의 관리자가 아니므로 뮤트를 해제할 권한이 없습니다.'
    if (msg.mentions.users.size <= 0) return '뮤트를 해제할 사용자를 맨션해주세요.'
    if (msg.mentions.users.size > 1) return '뮤트를 해제할 사용자는 한명만 선택해주세요.'
    if (data.list.find(elem => (elem.guild === msg.guild.id) && (elem.user === msg.mentions.users.array()[0].id)) === undefined) return '이미 뮤트되지 않은 사용자입니다.'
    return 0
  },
  exec: (msg) => {
    data.list.splice(data.list.findIndex(elem => (elem.guild === msg.guild.id) && (elem.user === msg.mentions.users.array()[0].id)), 1)
    fs.writeFileSync('./data/muted.json', JSON.stringify(data, null, 2))
    msg.channel.send('해당 사용자가 뮤트 해제되었습니다.')
  }
}