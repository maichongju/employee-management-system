const {extraDate} = require("./utils");

const generateSchedule = (store_department, store_hour, employees, weather, off_request, start_date) => {
    var result = {
        store_id: store_department.store_id,
        start_date: extraDate(start_date,false),
        end_date: "",
    }
    var department_schedule = [];
    for (var i = 0; i < 7; i++) {
        department_schedule.push(department_day( start_date.plus({days:i})));
    }
    var department = store_department.map(item => ({
        ...item,
        schedule: department_schedule

    }));
    console.log(department);


    var schedule = department;

    result.schedule = schedule;
    return result;
}

const department_day = function(date){
    return {
        date: extraDate(date,false),
        schedule:[]
    }
}

module.exports = { generateSchedule };