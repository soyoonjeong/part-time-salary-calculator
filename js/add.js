const addForm = document.querySelector("form");

function changeTime(time){
    return parseInt(time.substr(0,2))*60+parseInt(time.substr(3,2))
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
}
addForm.addEventListener("submit",addSubmitHandle);