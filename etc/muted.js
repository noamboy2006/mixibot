const data = require('../data/muted.json')
module.exports = {
  isMuted: (msg) => {
    return data.list.find(elem => (elem.guild === msg.guild.id) && (elem.user === msg.author.id)) !== undefined
  },
  erase: (msg) => {
    msg.delete()
  }
}
