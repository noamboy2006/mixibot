const fs = require('fs')
module.exports = {
  name: 'moderator',
  category: 'moderation',
  description: 'adds / deletes a server moderator. \nex) `>moderator add @mention`, `>moderator del @mention`',
  exec: (client, msg) => {
    if (!msg.member.hasPermission('ADMINISTRATOR')) {
      msg.channel.send('only a member with `ADMINISTRATOR` permission can add/delete a moderator')
      return
    }
    const args = msg.content.split(' ')
    if (args.length !== 3) {
      msg.channel.send('choose a correct action. add or delete is only allowed.')
      return
    }
    if (!(arg[1] === 'add') && !(arg[1] === 'del')) {
      msg.channel.send('choose a correct action. add or delete is only allowed.')
      return
    }
    if (msg.mentions.members.size + msg.mentions.roles.size !== 1) {
      msg.channel.send('mention only one user/ role.')
      return
    }
    if (msg.mentions.members.size === 1) {
      const data = require('./data/' + msg.guild.id + '.json')
      data.
    } else {

    }
  }
}
