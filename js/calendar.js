var today = new Date();
var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);
var dateString = year + '-' + month  + '-' + day;

const calendarProps={
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,listMonth'
  },
  initialDate: dateString,
  navLinks: true, // can click day/week names to navigate views
  editable: true,
  dayMaxEvents: true, // allow "more" link when too many events
  events: [],
  dateClick: function(info) {
    alert('Clicked on: ' + info.dateStr);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('Current view: ' + info.view.type);
    // change the day's background color just for fun
  },
}
var calendarEl = document.getElementById('calendar');
var calendarId = new FullCalendar.Calendar(calendarEl, calendarProps );
calendarId.render();

function paintCalendar(){
  const monthNames = ["January ", "February ", "March ", "April ", "May ", "June ",
  "July ", "August ", "September ", "October ", "November ", "December "
  ];
  const titleDate = document.querySelector("#fc-dom-1").innerText;
  const monthName = titleDate.replace(/[0-9]/g, "");
  const yearString = titleDate.slice(-4);
  const monthString = String(monthNames.indexOf(monthName)+1).padStart(2,'0');
  const ID = `${yearString}-${monthString}`;
  const savedSd = localStorage.getItem(ID);
  if(savedSd!==null){
    parsedSd = JSON.parse(savedSd);
    parsedSd.forEach(element => calendarId.addEvent(element));
    
  }
  

}

paintCalendar();

let button = document.querySelectorAll(".fc-button-group button");
for(i=0; i<2; i++){
  button[i].addEventListener("click",paintCalendar);
}