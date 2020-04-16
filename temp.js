const discordjs = require('discord.js')
const { get } = require('superagent-sync')

const client = new discordjs.Client()
const count = []
client.login('Njk5NDk3NDYwOTMzODUzMjM1.XphHmQ.NcywLUxAGunJQb8Qaqy1Kluq3b4')

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag + '!')
  client.user.setActivity('DiscLists PartNer', { type: 'WATCHING' })
})

client.on('message', (msg) => {
  if (msg.content == '?ping') {
    msg.channel.send('loading...').then((text) => {
      embed = new discordjs.MessageEmbed({ title: 'DiscLists Games Ping', color: 'f9f57b' }).addFields([
        { name: 'Message Latency', value: (text.createdAt - msg.createdAt) + 'ms' },
        { name: 'Bots Latency', value: Math.round(client.ws.ping) + 'ms' }
      ])
      text.edit('', embed)
    })
  }

  if (msg.content == '?profile') {
    msg.channel.send('Loading...').then((text) => {
      embed = new discordjs.MessageEmbed({ title: msg.author.username + '\'s Profile (DiscLists Games)', color: 'f9f57b' }).addFields([

        { name: 'Name(NameId)', value: msg.author.username + '(' + msg.author.id + ')' },
        { name: 'CreatedAt', value: msg.author.createdAt },
        { name: 'Message CreatedAt', value: msg.createdAt },
        { name: 'Message CreatedTimestemp', value: msg.author.createdTimestamp }
      ])
        .setURL(msg.author.displayAvatarURL())
      text.edit('', embed)
    })
  }

  if (msg.content == '?kkutu') {
    if (count.includes(msg.channel.id)) return msg.channel.send('The game has already begun')

    const embed = new discordjs.MessageEmbed({ title: 'DiscLists Kkutu', color: 'f9f57b' })
      .setDescription('Please press the **emoji**')

    msg.channel.send(embed)
      .then((m) => {
        m.react('🖐️')
        m.createReactionCollector((r, u) => u.id !== client.id && r.emoji.name === '🖐️', { time: 10000 })
          .on('end', (r) => {
            m.reactions.removeAll()

            if (count.includes(msg.channel.id)) return msg.channel.send('The game has already begun.')

            if (!r.first()) return m.edit('Cancelled because no accumulated participants were found.')
            else if ((r.first().count - 1) < 2) return m.edit('Cancelled because no accumulated participants were found', { embed: null })
            else {
              count.push(msg.channel.id)
              m.edit('Players : **' + (r.first().count - 1) + '** => Game Start!', { embed: null })

              const used = []
              const users = r.first().users.cache.array().slice(1)
              let c = Math.floor(Math.random() * users.length)
              let time = 1

              let first = ['그날본꽃의이름을우리는아직모른다', '4월은너의거짓말', '아이돌마스터', '이멋진세계에축복을',
                '자라투스트라는이렇게말했다', '기교소녀는상처받지않아', '역학적에너지보존의법칙', '기체크로마토질량분석법',
                '이세상은이미내가구해부와권력을손에넣었으며여기사나여마왕과성에서즐겁게살고있으니나이외의용사는이제더이상이세계로찾아오지마시길바랍니다']
              first = first[Math.floor(Math.random() * first.length)]

              setTimeout(() => {
                m.edit('<@' + users[c] + '>' + '\'s turn! / Time limit : ' + Math.floor(60 / time * 1000) / 1000 + 'Seconds\n- Start Word : ' + first.slice(0, first.length - 1) + '**' + first.slice(first.length - 1) + '**')
                m.channel.createMessageCollector((m2) => m2.author.id === users[c].id && m2.content.length > 1 && startsWith(m2.content, first) && isAKoreanWordLOL(m2.content), { max: 1, time: 60 / time * 1000 })
                  .on('end', stackFn)
              }, 1000)

              function stackFn (r2) {
                if (!r2.first()) {
                  count[count.findIndex((v) => v === msg.channel.id)] = null
                  return m.channel.send('<@' + users[c] + '>\'s Lose!\nReason: Time Over (' + Math.floor(60 / time * 1000) / 1000 + 'Seconds)')
                } else {
                  c++, time++
                  if (c === users.length) c = 0

                  const f = r2.first().content
                  used.push(f)
                  m.channel.send('<@' + users[c] + '>' + '\'s turn! / Time limit : ' + Math.floor(60 / time * 1000) / 1000 + 'Seconds\n- Word : ' + f.slice(0, f.length - 1) + '**' + f.slice(f.length - 1) + '**')
                  m.channel.createMessageCollector((m2) => m2.author.id === users[c].id && m2.content.length > 1 && !used.includes(m2.content) && startsWith(m2.content, f) && isAKoreanWordLOL(m2.content), { max: 1, time: 60 / time * 1000 })
                    .on('end', stackFn)
                }
              }
            }
          })
      })
  }
})

function isAKoreanWordLOL (w) {
  const res = get('https://namu.wiki/w/' + encodeURIComponent(w)).retry(0).send()
  if (res.end().statusCode === 200) return true
  if (res.end().statusCode === 301) return true
  return false
}

function startsWith (m, t) {
  const l = t.slice(t.length - 1)
  if (l === '리' && m.startsWith('이')) return true
  return m.startsWith(l)
}
