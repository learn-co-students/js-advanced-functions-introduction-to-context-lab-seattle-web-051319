// Your code here
function createEmployeeRecord(array) {
  let newObject = {}
  newObject.firstName = array[0]
  newObject.familyName = array[1]
  newObject.title = array[2]
  newObject.payPerHour = array[3]
  newObject.timeInEvents = []
  newObject.timeOutEvents = []
  return newObject
}

function createEmployees(array) {
  return array.map(element => createEmployeeRecord(element))
}

function createTimeInEvent(employee, string) {
  let newEvent = {
    type: 'TimeIn',
    date: string.slice(0, -5),
    hour: parseInt(string.slice(-5))
  }
  employee.timeInEvents.push(newEvent)
  return employee
}

function createTimeOutEvent(employee, string) {
  let newEvent = {
    type: 'TimeOut',
    date: string.slice(0, -5),
    hour: parseInt(string.slice(-5))
  }
  employee.timeOutEvents.push(newEvent)
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let timeInInfo = employee.timeInEvents.find(element => {return element.date === date})
  let timeOutInfo = employee.timeOutEvents.find(element => {return element.date === date})
  return (timeOutInfo.hour - timeInInfo.hour)/ 100
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  const days = employee.timeInEvents
  return days.reduce(function(accumulator, currentValue, currentIndex) {
    return accumulator + wagesEarnedOnDate(employee, days[currentIndex].date)
  }, 0)
}

function calculatePayroll(employees) {
  return employees.reduce(function(accumulator, currentValue, currentIndex) {
    return accumulator + allWagesFor(employees[currentIndex])
  }, 0)
}

function createEmployeeRecords(array) {
  return array.map(element => createEmployeeRecord(element))
}

function findEmployeebyFirstName(array, string) {
  return array.find(element => {
    return element.firstName === string
  })
}
