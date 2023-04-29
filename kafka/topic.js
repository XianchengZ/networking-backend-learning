const { Kafka } = require('kafkajs')

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'kafkaDemo', // unique identify the client
      brokers: ['localhost:9092'],
    })

    const adminObject = kafka.admin()
    console.log('Connecting....')
    await adminObject.connect()
    console.log('Connected!')
    await adminObject.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions: 2, // A-M, N-Z
        },
      ],
    })
    console.log('Created Successfully!')
    await adminObject.disconnect()
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

run()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    console.log(`Run Error: ${e}`)
    process.exit(1)
  })
