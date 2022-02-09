const addForm = document.querySelector("form");
let schedules = [];

function changeTime(time){
    return parseInt(time.substr(0,2))*60+parseInt(time.substr(3,2))
}

function saveSchedules(eventData, date){
    const MONTH_ID = date.substr(0,7);
    schedules = JSON.parse(localStorage.getItem(MONTH_ID)); //updateSchedules
    schedules.push(eventData);
    console.log(schedules);
    localStorage.setItem(MONTH_ID, JSON.stringify(schedules))
}
function addSubmitHandle(event){
    event.preventDefault();
    const money = addForm.querySelector("#moneyPerHour").value;
    const date = addForm.querySelector("#date").value;
    const startTime = addForm.querySelector("#startTime").value;
    const endTime = addForm.querySelector("#endTime").value;
    const restTime = addForm.querySelector("#restTime").value;
    const instead = addForm.querySelector("#instead").checked;
    let workTime = changeTime(endTime)-changeTime(startTime)-restTime;
    if(workTime<0){
        workTime = 1440+workTime;
    }
    const eventData={
        title:`${workTime/60}시간 - ${workTime/60*money}원`,
        start: `${date}T${startTime}`,
        end:`${date}T${endTime}`,
        money: workTime/60 * money,
        instead:instead
    }
    calendarId.addEvent(eventData);
    saveSchedules(eventData, date);
}
addForm.addEventListener("submit",addSubmitHandle);