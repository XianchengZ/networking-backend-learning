const { Kafka } = require('kafkajs')
const msg = process.argv[2]

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: 'kafkaDemo', // unique identify the client
      brokers: ['localhost:9092'],
    })

    const producer = kafka.producer()
    console.log('Producer connecting...')
    await producer.connect()
    console.log('Producer connected!')

    const partition = msg[0] < 'N' ? 0 : 1
    const result = await producer.send({
      topic: 'Users',
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    })

    console.log(`Message sent Successfully! ${JSON.stringify(result)}`)
    await producer.disconnect()
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
