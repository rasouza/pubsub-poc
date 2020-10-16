const { PubSub } = require('@google-cloud/pubsub')

const ALREADY_EXISTS = 6

const client = new PubSub()
const listTopics = async () => {
  const [topics] = await client.getTopics()
  console.log(topics)
}

const createTopic = async topic => {
  try {
    await client.createTopic(topic)
    console.log(`Topic ${topic} created`)
  } catch (error) {
    if (error.code === ALREADY_EXISTS) 
      console.warn(`Topic '${topic}' already exists. Skipping topic creation...`)
  }
}

const publish = async (topic, message) => {
  const data = JSON.stringify(message)
  client.topic(topic).publish(Buffer.from(data))
  console.log('Sending message', data)
}

createTopic('test')
publish('test', { patient: 20})

process.on('unhandledRejection', err => {
  console.error(err.message)
  process.exitCode = 1
})