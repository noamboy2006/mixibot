module.exports = {
  name: 'clear',
  category: 'moderation',
  description: 'clears messages. %clear `length of messages to clear`',
  exec: async (client, msg) => {
    if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
      msg.channel.send('You have no permission to use this command.')
    }
    if (!msg.guild.me.hasPermission('MANAGE_MESSAGES')) {
      msg.channel.send('You have no permission to execute this command. Please give mixibot `manage messages` permission.')
    }
    if (msg.content.split(' ').length === 1) {
      msg.channel.send('give mixibot the length of messages to clear.')
      return
    }
    if (msg.content.split(' ').length !== 2) {
      msg.channel.send('to many arguments')
      return
    }
    const num = parseInt(msg.content.split(' ')[1])
    if (isNaN(num)) {
      msg.channel.send('the length of messages to clear must be a number.')
      return
    }
    if(num > 99) msg.channel.bulkDelete(100, true)
    msg.channel.bulkDelete(num + 1, true)
      .then((deleted) => msg.channel.send(`deleted ${deleted.size} messages.`).then((m) => m.delete({ timeout: 3000 })))
  }
}
