const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDef = protoLoader.loadSync('todo.proto', {})

const grpcObject = grpc.loadPackageDefinition(packageDef)

const todoPackage = grpcObject.todoPackage

const text = process.argv[2]

const client = new todoPackage.Todo(
  'localhost:40000',
  grpc.credentials.createInsecure()
)

client.createTodo(
  {
    id: -1,
    text: text,
  },
  (err, response) => {
    console.log(
      'createTodo::::: Received from server',
      JSON.stringify(response)
    )
  }
)

client.readTodos(null, (err, res) => {
  console.log('readTodos:::: Received from server', JSON.stringify(res))
  if (!res.items) {
    res.items.forEach((i) => {
      console.log(i.text)
    })
  }
})

const call = client.readTodosStream()
call.on('data', (item) => {
  console.log('Server stream:', JSON.stringify(item))
})
call.on('end', (e) => console.log('server done!'))
