const createEmployeeRecord = (arr) => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployees = (arr) => {
    return arr.map(record => createEmployeeRecord(record));
}

const createTimeInEvent = (employee, dateStamp) => {
    let [date, time] = convertDateStamp(dateStamp);    

    let newEvent = {
        type: "TimeIn", 
        hour: time,
        date: date
    }

    employee.timeInEvents.push(newEvent);
    return employee;
}

const createTimeOutEvent = (employee, dateStamp) => {
    let [date, time] = convertDateStamp(dateStamp);

    let newEvent = {
        type: "TimeOut", 
        hour: time,
        date: date
    }

    employee.timeOutEvents.push(newEvent);
    return employee;
}

const convertDateStamp = dateStamp => {
    let [date, time] = dateStamp.split(" ")
    time = Number.parseInt(time, 10);
    return [date, time];
}

const hoursWorkedOnDate = (employee, date) => {
    let timeIn = employee.timeInEvents.find(e => e.date === date);
    let timeOut = employee.timeOutEvents.find(e => e.date === date);
    let hoursWorked = (timeOut.hour - timeIn.hour)/100;
    return hoursWorked;
}

const wagesEarnedOnDate = (employee, date) => {
    return hoursWorkedOnDate(employee,date) * employee.payPerHour;
}

const allWagesFor = employee =>  {
    let workDates = employee.timeInEvents.map(e => e.date);
    let wages = workDates.map(date => wagesEarnedOnDate(employee, date));
    let totalWages = wages.reduce((acc, curr) => acc + curr, 0)
    return totalWages;
}

const calculatePayroll = employees => {
    let employeeTotalWages = employees.map(employee => allWagesFor(employee));
    let totalPayroll = employeeTotalWages.reduce((acc, curr) => acc + curr, 0);
    return totalPayroll;
}

const createEmployeeRecords = arr => arr.map(employee => createEmployeeRecord(employee));

const findEmployeebyFirstName = (arr, firstName) => arr.find(employee => employee.firstName  === firstName);