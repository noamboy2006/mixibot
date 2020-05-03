module.exports = {
  name: 'help',
  isValid: (msg, client) => {
    return 0
  },
  exec: (msg, client) => {
    msg.channel.send('asciiart,help,invite,kkutu,latex,mute,ping,programmerhumor,secure,unmute')
  }
}
