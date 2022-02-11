const calForm = document.querySelector("#calculateForm");
function sliceDate(date){
    return date.substr(0,7); //년도, 월까지만 슬라이스 => ID
}
function searchLocalStorage(ID, start, end){
    const savedSd = localStorage.getItem(ID);
    if(savedSd!==null){
        parsedSd = JSON.parse(savedSd);
        parsedSd.forEach((element)=>{
            const date = new Date(element.start.substr(0,10));
            const startDate = new Date(start);
            const endDate = new Date(end);
            console.log(date);
            if(startDate<=date && date<=endDate){
                const totalMoney = parseInt(localStorage.getItem("totalMoney"));
                localStorage.setItem("totalMoney",totalMoney+element.money);
            }
        });
    }
}
let weekMoney = 0;
function weekBreakCalculate(ID){
    for(const i = 1; i<=31; i++){
        i = String(i).padStart(2,'0');
        const date = `${ID}-${i}`;
        const day = new Date(date).getDay();
        if(day==6){
            weekMoney =0;
        }
    }
}
function calculate(event){
    event.preventDefault();
    localStorage.setItem("totalMoney",0);
    const startDate = calForm.querySelector("#startDate").value;
    const endDate = calForm.querySelector("#endDate").value;
    searchLocalStorage(sliceDate(startDate), startDate, endDate);
    if(sliceDate(startDate)!==sliceDate(endDate)){
        searchLocalStorage(sliceDate(endDate), startDate, endDate);
    }
    const totalMoney = document.querySelector("#totalMoney");
    totalMoney.innerText = `${localStorage.getItem("totalMoney")}원`;
}
calForm.addEventListener("submit",calculate);
