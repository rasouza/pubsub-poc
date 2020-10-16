const { PubSub } = require('@google-cloud/pubsub')

const ALREADY_EXISTS = 6

const client = new PubSub()

const listSubscriptions = async () => {
  const [subscriptions] = await client.getSubscriptions()
  console.log(subscriptions.map(sub => sub.name))
}

const getInfo = async name => {
  const subscription = client.subscription(name)
  const metadata = await subscription.getMetadata()
  console.log(metadata)
}

const createSubscription = async (topic, subscription) => {
  try {
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

const processMessage = message => {
  console.log(new Date(), message.data.toString())
  message.ack()
}

const runWorker = async () => {
  const subscription = client.subscription('beneficiary-patients')
  subscription.on('message', processMessage)
}

listSubscriptions()
// getInfo('test')
createSubscription('test', 'beneficiary-patients')
runWorker()

process.on('unhandledRejection', err => {
  console.error(err.message)
  console.error(err.stack)
  process.exitCode = 1
})
