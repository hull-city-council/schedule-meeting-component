import r2wc from "@r2wc/react-to-web-component";
import ScheduleMeetingComponent from './App.jsx'

const scheduleMeeting = r2wc(ScheduleMeetingComponent, {
  props: {
    calendarid: "string",
    sid: "string"
  }
});

customElements.define("schedule-meeting", scheduleMeeting);