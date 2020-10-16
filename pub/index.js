const { client, createTopic, listAll } = require('./pub-utils')

const publish = async (topic, message) => {
  const data = JSON.stringify(message)
  client.topic(topic).publish(Buffer.from(data))
  console.log('Sending message', data)
}

listAll()
createTopic('test')
publish('test', { patient: 20, date: new Date() })

process.on('unhandledRejection', err => {
  console.error(err.message)
  console.error(err.stack)
  process.exitCode = 1
})
