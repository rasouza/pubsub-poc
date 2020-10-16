const { PubSub } = require('@google-cloud/pubsub')

const client = new PubSub()

const ALREADY_EXISTS = 6

module.exports.listAll = async () => {
  console.log('Listing all topics...')
  const [topics] = await client.getTopics()
  console.log(topics.map(topic => topic.name))
}

module.exports.listSubscriptions = async topic => {
  console.log(`Listing all subscriptions on '${topic}' topic`)
  const [subscriptions] = await client.topic(topic).getSubscriptions()
  console.log(subscriptions.map(sub => sub.name))
}

module.exports.getInfo = async name => {
  console.log(`Retrieving metadata for topic '${name}'...`)
  const metadata = await client.topic(name).getMetadata()
  console.log(metadata)
}

module.exports.createTopic = async topic => {
  try {
    await client.createTopic(topic)
    console.log(`Topic ${topic} created`)
  } catch (error) {
    if (error.code === ALREADY_EXISTS) {
      console.warn(`Topic '${topic}' already exists. Skipping topic creation...`)
    }
  }
}

module.exports.delete = async name => {
  console.log(`Deleting topic '${name}'`)
  await client.topic(name).delete()
}

module.exports.client = client
