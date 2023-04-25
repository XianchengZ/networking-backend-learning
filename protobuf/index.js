const fs = require('fs')
const employees = []

employees.push({
  name: 'Andrew',
  salary: 1000,
  id: 1,
})

const john = {
  name: 'John',
  salary: 112221,
  id: 2,
}

employees.push(john)

employees.push({
  name: 'Rick',
  salary: 5000,
  id: 3,
})

fs.writeFileSync('jsondata.json', JSON.stringify(employees))
