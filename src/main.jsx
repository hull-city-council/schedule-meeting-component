import r2wc from "@r2wc/react-to-web-component";
import ScheduleMeetingComponent from './App.jsx'

const scheduleMeeting = r2wc(ScheduleMeetingComponent, {
  shadow: "open",
  props: {
    calendar_id: "string",
    summary: "string",
    location: "string",
    description: "string",
    granularity: "number",
    duration: "number",
    start_date: "string",
    end_date: "string",
    start_time: "string",
    end_time: "string",
    event_id: "string",
    fetch_times_lookup_id: "string",
    book_time_lookup_id: "string",
    cancel_time_lookup_id: "string",
    sid: "string"
  }
});

customElements.define("schedule-meeting", scheduleMeeting);