import r2wc from "@r2wc/react-to-web-component";
import App from './App.jsx'

const scheduleMeeting = r2wc(App);

customElements.define("schedule-meeting", scheduleMeeting, {
  props: {
    sid: "string"
  }
});
