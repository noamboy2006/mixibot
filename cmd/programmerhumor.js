const request = require('sync-request')

module.exports = {
  name: 'programmerhumor',
  isValid: (msg, client) => {
    return 0
  },
  exec: (msg, client) => {
    const res = request('GET', 'http://main-noamboy2006504805.codeanyapp.com:8080/api/meme', {
      headers: {
        ContentType: 'application/x-www-form-urlencoded'
      }
    })
    msg.channel.send({ files: [res.getBody('utf-8')] })
  }
}
