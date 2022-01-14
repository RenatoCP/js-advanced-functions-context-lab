/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(timeStamp) {
    let [date, hour] = timeStamp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour),
        date
    })
    return this;
}

function createTimeOutEvent(timeStamp) {
    let [date, hour] = timeStamp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour),
        date 
    })
    return this;
}

function hoursWorkedOnDate(date) {
    const timeOut = this.timeOutEvents.find(i => i.date === date).hour
    const timeIn = this.timeInEvents.find(i => i.date === date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(date) {
    let wages = hoursWorkedOnDate.call(this, date) * this.payPerHour 
    return wages;
}

function calculatePayroll(array) {
    return array.reduce(function(memo, x){
        return memo + allWagesFor.call(x)}, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(i => i.firstName === firstName)
} 