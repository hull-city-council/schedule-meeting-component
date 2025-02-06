import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { suggestAppointment, createProvisional } from "./lookups";

function App() {

  const [timeslots, setTimeSlots] = useState([]);
  sid = typeof FS !== "undefined" && FS !== null ? (ref = FS.Auth) != null ? ref.session['auth-session'] : void 0 : void 0;

  useEffect((sid) => {
      const avalableAppointments = suggestAppointment(sid);
      const newTimeslots = [];
      avalableAppointments.data.forEach(day => {
        Object.keys(day?.appointments).forEach(unixTime => {
          if (day?.appointments[unixTime] === "available") {
            const startTime = new Date(unixTime * 1000);
            const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration
            newTimeslots.push({ id: parseInt(unixTime), startTime, endTime });
          }
        });
      });
      setTimeSlots(newTimeslots);

  }, [timeslots]);

  return (
    <>
      {timeslots.length > 0 ? (
        <ScheduleMeeting
          borderRadius={10}
          primaryColor="#03a9f4"
          eventDurationInMinutes={15}
          availableTimeslots={timeslots}
          onStartTimeSelect={createProvisional(startTimeEventEmit, sid)}
          startTimeListStyle="scroll-list"
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App
