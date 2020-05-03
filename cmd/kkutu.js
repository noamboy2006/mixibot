const Discord = require('discord.js')
const env = require('../env.json')
const request = require('sync-request')
const convert = require('xml-js')
const count = []

module.exports = {
  name: 'kkutu',
  isValid: (msg, client) => {
    if (count.includes(msg.channel.id)) return '이미 해당 채널에서 진행중인 게임이 있습니다. 다른 채널에서 게임을 진행 해주세요.'
    return 0
  },
  exec: (msg, client) => {
    const embed = new Discord.MessageEmbed({ title: '나랑 끝말잇기 할 사람!' })
      .setDescription('이모지를 눌러 참가')
      .setColor('#1e90ff')
    msg.channel.send(embed)
      .then((m) => {
        count.push(msg.channel.id)
        m.react('🖐️')
        m.createReactionCollector((reaction, user) => user.id !== client.id && reaction.emoji.name === '🖐️', { time: 10000 })
          .on('end', (r) => {
            m.reactions.removeAll()
            if (!r.first()) {
              count[count.findIndex((v) => v === msg.channel.id)] = null
              return m.edit('아무도 없어요...? ㅠㅠ', { embed: null })
            }
            if (r.first().count <= 2) {
              count[count.findIndex((v) => v === msg.channel.id)] = null
              return m.edit('사람이 부족해요. 친구를 ~~납치~~ 데려옵시다!', { embed: null })
            }
            m.edit('플레이어 : **' + (r.first().count - 1) + '** => 게임 시작!', { embed: null })

            const used = []
            const users = r.first().users.cache.array().slice(1)
            let c = Math.floor(Math.random() * users.length)
            let time = 0

            let first = ['기차', '기러기', '미국']
            first = first[Math.floor(Math.random() * first.length)]

            setTimeout(() => {
              m.edit('<@' + users[c] + '>의 차례 / 시간제한 : ' + Math.floor(30000 - time * 1000) / 1000 + '초\n- 시작단어 : ' + first.slice(0, first.length - 1) + '**' + first.slice(first.length - 1) + '**')
              m.channel.createMessageCollector((m2) => m2.author.id === users[c].id && m2.content.length > 1 && startsWith(m2.content, first) && isAKoreanWordLOL(m2.content), { max: 1, time: 30000 - time * 1000 })
                .on('end', stackFn)
            }, 1000)

            function stackFn (r2) {
              if (!r2.first()) {
                count[count.findIndex((v) => v === msg.channel.id)] = null
                return m.channel.send('<@' + users[c] + '>의 패배! \n 시간초과 (' + Math.floor(30000 - time * 1000) / 1000 + '초)')
              }
              c++
              time++
              if (c === users.length) c = 0
              const f = r2.first().content
              used.push(f)
              m.channel.send('<@' + users[c] + '>' + '의 차례 / 시간제한 : ' + Math.floor(30000 - time * 1000) / 1000 + '초\n- 단어 : ' + f.slice(0, f.length - 1) + '**' + f.slice(f.length - 1) + '**')
              m.channel.createMessageCollector((m2) => m2.author.id === users[c].id && m2.content.length > 1 && !used.includes(m2.content) && startsWith(m2.content, f) && isAKoreanWordLOL(m2.content), { max: 1, time: 30000 - time * 1000 })
                .on('end', stackFn)
            }
          })
      })
  }
}

function isAKoreanWordLOL (w) {
  if (!(/^[가-힣() ]+$/.test(w))) return 0
  const res = request('GET', 'https://stdict.korean.go.kr/api/search.do?key=' + env.key + '&q=' + encodeURIComponent(w), {
    headers: {
      ContentType: 'text/xml'
    }
  })
  if (parseInt(JSON.parse(convert.xml2json(res.getBody('utf-8'), { compact: true, spaces: 4 })).channel.total._text)) return 1
  return 0
}

function startsWith (m, t) {
  const l = t.slice(t.length - 1)
  let cCode = l.charCodeAt(0)
  if (cCode < 0xAC00 || cCode > 0xD7A3) return false
  cCode -= 0xAC00
  let cho = (((cCode - cCode % 28) / 28) - ((cCode - cCode % 28) / 28) % 21) / 21
  if (cho === 5) {
    cho = 11
    cCode = (((cCode - cCode % 28) / 28) % 21 + cho * 21) * 28 + cCode % 28
    cCode += 0xAC00
    if (m.startsWith(String.fromCharCode(cCode))) return 1
    cCode -= 0xAC00
    cho = 2
    cCode = (((cCode - cCode % 28) / 28) % 21 + cho * 21) * 28 + cCode % 28
    cCode += 0xAC00
    if (m.startsWith(String.fromCharCode(cCode))) return 1
  }
  if (cho === 2) {
    cCode -= 0xAC00
    cho = 11
    cCode = (((cCode - cCode % 28) / 28) % 21 + cho * 21) * 28 + cCode % 28
    cCode += 0xAC00
    if (m.startsWith(String.fromCharCode(cCode))) return 1
  }
  return m.startsWith(l)
}
