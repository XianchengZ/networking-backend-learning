const Schema = require('./employees_pb')
const fs = require('fs')

const andrew = new Schema.Employee()
andrew.setId(10001)
andrew.setName('Andrew')
andrew.setSalary(2000000000)

const Hussein = new Schema.Employee()
Hussein.setId(10003)
Hussein.setName('Hussein')
Hussein.setSalary(4399)

const rick = new Schema.Employee()
rick.setId(102)
rick.setName('Rick')
rick.setSalary(222)

const employees = new Schema.Employees()
employees.addEmployees(andrew)
employees.addEmployees(Hussein)
employees.addEmployees(rick)

const bytes = employees.serializeBinary()

fs.writeFileSync('employeesbinary', bytes)

const deserialized = Schema.Employees.deserializeBinary(bytes)

console.log(deserialized.toString())
