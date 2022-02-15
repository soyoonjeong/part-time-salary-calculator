const addForm = document.querySelector("form");
let schedules = [];

function changeTime(time){
    return parseInt(time.substr(0,2))*60+parseInt(time.substr(3,2))
}
function extractDate(event){
    return parseInt(event.start.substr(8,2));
}
function saveSchedules(eventData, date){
    const MONTH_ID = date.substr(0,7);
    schedules = JSON.parse(localStorage.getItem(MONTH_ID)); //updateSchedules
    if(schedules==null){
        schedules = [];
    }
    /* // 방법 1 : 삽입정렬
    schedules.push(eventData);
    if(schedules.length>1){ 
        let i = schedules.length-2; 
        while(i>=0 && extractDate(schedules[i])>extractDate(eventData)){
            schedules[i+1] = schedules[i];
            i = i-1;
        }
        schedules[i+1] = eventData;
    }*/
    /* // 방법 2 : pop 여러번 -> push 두번 -> push 여러번
    const remains = [];
    while(schedules.length>0){
        const pop = schedules.pop();
        if(extractDate(pop)>extractDate(eventData)){
            remains.push(pop);
        }else{
            schedules.push(pop);
            break;
        }
    }
    schedules.push(eventData);
    while(remains.length>0){
        schedules.push(remains.pop());
    }*/
    // 방법 3 : sort 사용
    schedules.push(eventData);
    schedules.sort(function(a,b){
        return extractDate(a)-extractDate(b);
    });
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
        time : workTime/60,
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