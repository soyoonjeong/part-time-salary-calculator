document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,listMonth'
      },
      eft: 'prev,next today',
      initialDate: `2021-02-05`,
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2021-02-05'
        }
      ],
      dateClick: function(info) {
        alert('Clicked on: ' + info.dateStr);
        alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
        alert('Current view: ' + info.view.type);
        // change the day's background color just for fun
      },
      
      
    });
    calendar.render();
});
let submitForm = document.querySelector("form");
submitForm.addEventListener("submit",function(event){
    event.preventDefault();
    let addEvent ={
        start: `${submitForm.querySelector("#date").value}`,
        
    }
    let money = submitForm.querySelector("#moneyPerHour");
    let date = submitForm.querySelector("#date");
    let startTime = submitForm

})
