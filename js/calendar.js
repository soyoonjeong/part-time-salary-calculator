const calendarProps={
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,listMonth'
  },
  initialDate: `2022-02-05`,
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
}
var calendarEl = document.getElementById('calendar');
var calendarId = new FullCalendar.Calendar(calendarEl, calendarProps );
calendarId.render();


