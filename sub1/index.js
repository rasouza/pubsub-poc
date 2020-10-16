const { client, createSubscription } = require('./sub-utils')

const processMessage = message => {
  console.log(new Date(), message.data.toString())
  message.ack()
}

const runWorker = async () => {
  const subscription = client.subscription('beneficiary-patients')
  subscription.on('message', processMessage)
}

createSubscription('test', 'beneficiary-patients')
runWorker()

process.on('unhandledRejection', err => {
  console.error(err.message)
  console.error(err.stack)
  process.exitCode = 1
})
