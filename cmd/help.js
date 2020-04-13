module.exports = {
  name: 'help',
  isValid: (msg) => {
    return '명령어를 사용하는 방식이 잘못되었습니다'
  },
  exec: (msg) => {
    msg.channel.send('there is no help LOL')
  }
}
