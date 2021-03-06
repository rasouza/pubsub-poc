const { client, createSubscription } = require('./sub-utils')

const processMessage = message => {
  console.log(new Date(), message.data.toString())
  message.ack()
}

const runWorker = async name => {
  console.log(`Subscribing on '${name}'`)
  const subscription = client.subscription(name)
  subscription.on('message', processMessage)
}

createSubscription('test', 'beneficiary-patients')
runWorker('beneficiary-patients')

process.on('unhandledRejection', err => {
  console.error(err.message)
  console.error(err.stack)
  process.exitCode = 1
})
