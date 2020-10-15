const { PubSub } = require('@google-cloud/pubsub')

const client = new PubSub()
const listTopics = async () => {
  const topics = await client.getTopics()
  console.log(topics)
}

listTopics()
