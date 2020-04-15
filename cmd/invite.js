const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'invite',
  isValid: (msg) => {
    return 0
  },
  exec: (msg) => {
    const embed = new MessageEmbed()
      .setTitle('믹시봇 초대링크')
      .setColor('#1e90ff')
      .setDescription('다음 [링크](https://discordapp.com/api/oauth2/authorize?client_id=678979031139614721&permissions=8&scope=bot)로 믹시봇을 초대하세요! 참고로 믹시봇은 관리자 권한이 없으면 탈주합니다. 관리자 권한을 꼭 부여해주세요!')
    msg.channel.send(embed)
  }
}
