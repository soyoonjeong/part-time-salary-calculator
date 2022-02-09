const calForm = document.querySelector("form:nth-child(2)");
const calbutton = calForm.querySelector("button");
function sliceDate(date){
    return date.substr(0,7);
}
function searchLocalStorage(ID, start, end){
    const savedSd = localStorage.getItem(ID);
    console.log(ID);
    if(savedSd!==null){
        parsedSd = JSON.parse(savedSd);
        parsedSd.forEach((element)=>{
            const date = new Date(element.start.substr(0,10));
            const startDate = new Date(start);
            const endDate = new Date(end);
            console.log(date);
            if(startDate<=date && date<=endDate){
                console.log('OHYEAH');
                const totalMoney = parseInt(localStorage.getItem("totalMoney"));
                localStorage.setItem("totalMoney",totalMoney+element.money);
            }
        });
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
    totalMoney.classList.remove("hidden");
    totalMoney.innerText = `${localStorage.getItem("totalMoney")}원`;
}
calForm.addEventListener("submit",calculate);
