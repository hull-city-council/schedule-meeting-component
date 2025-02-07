import r2wc from "@r2wc/react-to-web-component";
import ScheduleMeetingComponent from './App.jsx'

const scheduleMeeting = r2wc(ScheduleMeetingComponent, {
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
    sid: "string"
  }
});

customElements.define("schedule-meeting", scheduleMeeting);