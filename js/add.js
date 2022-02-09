const addForm = document.querySelector("form");
let schedules = [];

function changeTime(time){
    return parseInt(time.substr(0,2))*60+parseInt(time.substr(3,2))
}
function saveSchedules(date){
    const MONTH_ID = date.substr(0,7);
    saveSd = schedules.filter((item)=>item.start.substr(0,7)===MONTH_ID);
    console.log(saveSd);
    localStorage.setItem(MONTH_ID, JSON.stringify(saveSd))
}
function addSubmitHandle(event){
    event.preventDefault();
    const money = addForm.querySelector("#moneyPerHour").value;
    const date = addForm.querySelector("#date").value;
    const startTime = addForm.querySelector("#startTime").value;
    const endTime = addForm.querySelector("#endTime").value;
    const restTime = addForm.querySelector("#restTime").value;
    let workTime = changeTime(endTime)-changeTime(startTime)-restTime;
    if(workTime<0){
        workTime = 1440+workTime;
    }
    const eventData={
        title:`${workTime/60}시간`,
        start: `${date}T${startTime}`,
        end:`${date}T${endTime}`
    }
    calendarId.addEvent(eventData);
    schedules.push(eventData);
    saveSchedules(date);
}
addForm.addEventListener("submit",addSubmitHandle);