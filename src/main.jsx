import r2wc from "@r2wc/react-to-web-component";
import ScheduleMeetingComponent from './App.jsx'

const scheduleMeeting = r2wc(ScheduleMeetingComponent, {
  shadow: "open",
  props: {
    calendarid: "string",
    summary: "string",
    location: "string",
    description: "string",
    granularity: "number",
    duration: "number",
    startdate: "string",
    enddate: "string",
    starttime: "string",
    endtime: "string",
    eventid: "string",
    fetch_times_lookup_id: "string",
    book_time_lookup_id: "string",
    cancel_time_lookup_id: "string",
    sid: "string"
  }
});

customElements.define("schedule-meeting", scheduleMeeting);