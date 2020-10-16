const { PubSub } = require('@google-cloud/pubsub')

const ALREADY_EXISTS = 6

const client = new PubSub()

module.exports.listAll = async () => {
  console.log('Listing all subscriptions...')
  const [subscriptions] = await client.getSubscriptions()
  console.log(subscriptions.map(sub => sub.name))
}

module.exports.listOnTopic = async topic => {
  console.log(`Listing all subscriptions on '${topic}' topic`)
  const [subscriptions] = await client.topic(topic).getSubscriptions()
  console.log(subscriptions.map(sub => sub.name))
}

module.exports.getInfo = async name => {
  console.log(`Retrieving metadata for subscription '${name}'...`)
  const metadata = await client.subscription(name).getMetadata()
  console.log(metadata)
}

module.exports.delete = async name => {
  console.log(`Deleting subscription '${name}'`)
  await client.subscription(name).delete()
}

module.exports.createSubscription = async (topic, subscription) => {
  try {
    console.log(`Creating subscription '${subscription}'...`)
    await client.topic(topic).createSubscription(subscription)
    console.log(`Subscription '${subscription}' created`)
  } catch (error) {
    if (error.code === ALREADY_EXISTS) {
      console.warn(`Subscription '${subscription}' already exists. Skipping subscription creation...`)
    } else {
      throw error
    }
  }
}

module.exports.client = client
