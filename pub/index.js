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
    if (error.code === ALREADY_EXISTS) console.warn(error)
  }
}

const publish = async (topic, message) => {
  const myTopic = client.topic(topic)
  // console.log(myTopic)
}

createTopic('test')
publish('test', null)

process.on('unhandledRejection', err => {
  console.error(err.message)
  process.exitCode = 1
})