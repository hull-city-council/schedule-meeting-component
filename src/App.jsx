import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { subscribe, unsubscribe } from "./events";

function App() {

  const [timeslots, setTimeSlots] = useState([]);

  useEffect(() => {
    const handleAppointmentsFound = (e) => {
      console.log("Event received:", e.detail);

      const newTimeslots = [];
      e.detail.data.forEach(day => {
        console.log("day", day);
        Object.keys(day?.appointments).forEach(unixTime => {
          if (day?.appointments[unixTime] === "available") {
            const startTime = new Date(unixTime * 1000);
            const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration
            newTimeslots.push({ id: parseInt(unixTime), startTime, endTime });
            console.log({ id: parseInt(unixTime), startTime, endTime });
          }
        });
      });
      setTimeSlots(newTimeslots);
    };

    subscribe("appointmentsFound", handleAppointmentsFound);

    return () => {
      unsubscribe("appointmentsFound", handleAppointmentsFound);
    };
  }, [timeslots]);

  return (
    <>
      {timeslots ? (
        <ScheduleMeeting
          borderRadius={10}
          primaryColor="#03a9f4"
          eventDurationInMinutes={15}
          availableTimeslots={timeslots}
          onStartTimeSelect={console.log}
          startTimeListStyle="scroll-list"
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App
