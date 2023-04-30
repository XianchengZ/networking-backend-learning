const { Kafka } = require('kafkajs')

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'kafkaDemo', // unique identify the client
      brokers: ['localhost:9092'],
    })

    const consumer = kafka.consumer({ groupId: 'test' }) // same groupId for all consumers
    console.log('Consumer connecting...')
    await consumer.connect()
    console.log('Consumer connected!')

    await consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    })

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received Message ${result.message.value} on partition ${result.partition}`
        )
      },
    })
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

run()
