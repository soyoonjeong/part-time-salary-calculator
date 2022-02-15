const calForm = document.querySelector("#calculateForm");

function searchLocalStorage(ID){
    const savedSd = localStorage.getItem(ID);
    let totalMoney = 0;
    if(savedSd!==null){
        parsedSd = JSON.parse(savedSd);
        parsedSd.forEach((element)=>{
            totalMoney += element.money;
        });
    }
    localStorage.setItem("totalMoney",totalMoney);
}
function weekNumberByMonth(dateFormat) {
    const inputDate = new Date(dateFormat);
    
    // 인풋의 년, 월 
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;
    
    // 목요일 기준 주차 구하기 
    const weekNumberByThurFnc = (paramDate) => {
      const year = paramDate.getFullYear();
      const month = paramDate.getMonth();
      const date = paramDate.getDate();
      
      // 인풋한 달의 첫 날과 마지막 날의 요일 
      const firstDate = new Date(year, month, 1);
      const lastDate = new Date(year, month+1, 0);
      const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
      const lastDayOfWeek = lastDate.getDay();
      
      // 인풋한 달의 마지막 일 
      const lastDay = lastDate.getDate();
      
      // 첫 날의 요일이 금, 토, 일이라면 true
      const firstWeekCheck = firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek ==7;
      const lastWeekCheck = lastDayOfWeek === 1 || lastDayOfWeek === 2 || lastDayOfWeek === 3;
      
      // 해당 달이 총 몇주까지 있는지 
      const lastWeekNo = Math.ceil(firstDayOfWeek -1 + lastDay / 7);
                                   
      // 날짜 기준으로 몇 주차 인지
      let weekNo = Math.ceil((firstDayOfWeek -1 + date) / 7);
      // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
      if (weekNo === 1 && firstWeekCheck) weekNo = 'prev';
      // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
      else if(weekNo === lastWeekNo && lastWeekCheck) weekNo = 'next'
      // 인풋한 날짜의 첫 주는 아니지만 첫 날이 월, 화, 수로 시작하면 -1;
      else if (firstWeekCheck) weekNo = weekNo -1 ;
      
      return weekNo;
    };
    
    // 목요일 기준의 주차 
    weekNo = weekNumberByThurFnc(inputDate);
    
    // 이전달의 마지막 주차일때 
    const afterDate = new Date(year, month, 0);
    year = month === 1 ? year -1 : year;
    month = month === 1 ? 12 : month - 1;
    weekNo = weekNumberByThurFnc(afterDate);

  // 다음달의 첫 주차일 때 
  if(weekNo === 'next') {
    year = month === 12 ? year+1 : year;
    month = month === 12 ? 1 : month + 1;
    weekNo = 1;
  }
    return {
      year, month, weekNo
    }
}
//리스트 탐색식으로 고쳐보기
function weekBreakCalculate(PREV_ID, ID){
    const prev = localStorage.getItem(PREV_ID);
    let monthArray = [];
    if(prev!==null){
        monthArray = JSON.parse(prev) //지난달 이번달 리스트
    }
    newArray = monthArray.concat(JSON.parse(localStorage.getItem(ID)));
    let wbYear=0, wbMonth=0, wbWeekNo=0;
    let year, month, weekNo;
    let time = 0;
    for(let i =0; i<newArray.length; i++){
        const element = newArray[i];
        const dateString = element.start.substr(0,10);
        result = weekNumberByMonth(dateString);
        console.log(wbYear, wbMonth, wbWeekNo);
        console.log(year, month, weekNo);
        if(wbYear!==result[0] ||wbMonth!==month || wbWeekNo!==weekNo){
            if(time>=15){
                const sunDate = new Date(newArray[i-1]);
                while(sunDate.getDay()==0){
                    sunDate.setDate(sunDate.getDate()+1);
                }
                const sunDateStr = `${sunDate.getFullYear()}-${sunDate.getMonth()}-${sunDate.getDate()}`;
                const eventData = {
                    time : time/5,
                    title:`주휴수당 ${round(time*money)}원`,
                    start: sunDateStr,
                    end:sunDateStr ,
                    money: time * money,
                    instead:false
                }
                calendarId.addEvent(eventData);
                saveSchedules(eventData, date);
            }
            time = 0;
            wbYear,wbMonth,wbWeekNo = year,month,weekNo;
        }else{
            if(!element.instead){
                time+=element.time;
            }
        }
    }
    

}

function calculate(event){
    event.preventDefault();
    localStorage.setItem("totalMoney",0);
    const year = calForm.querySelector("#selectYear").value;
    const monthSelect = calForm.querySelector("select");
    const month = calForm.querySelector("select").options[monthSelect.selectedIndex].value.padStart(2,'0');
    const ID = `${year}-${month}`;
    searchLocalStorage(ID);
    const weekBreak = document.querySelector("#weekBreak").value;
    if(weekBreak){
        let PREV_ID = `${year}-${String(parseInt(month)-1).padStart(2,'0')}`;
        if(month==1){
            PREV_ID = `${year-1}-12`;
        }
        weekBreakCalculate(PREV_ID, ID);
    }
    const totalMoney = document.querySelector("#totalMoney");
    totalMoney.innerText = `${localStorage.getItem("totalMoney")}원`;
}
calForm.addEventListener("submit",calculate);
