module.exports = {
  name: 'help',
  isValid: (msg, client) => {
    return '명령어를 사용하는 방식이 잘못되었습니다'
  },
  exec: (msg, client) => {
    msg.channel.send('there is no help LOL')
  }
}
