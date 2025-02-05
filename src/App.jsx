import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { subscribe, unsubscribe } from "./events";

function App() {
  
  const timeslots = [];
  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    subscribe("appointmentsFound", (e) => setMeetingData(e.detail));
  }, [meetingData]);

  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
  });

  if (meetingData.length > 0) {
    meetingData.data.forEach(day => {
      Object.keys(day.appointments).forEach(unixTime => {
        if(day.appointments[unixTime] === "available") {
          const startTime = new Date(unixTime * 1000);
          const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration
          timeslots.push({ id: unixTime, startTime, endTime });
        }
      })
    })
  }

  return (
    <>
      {meetingData.length > 0 ? (
        <ScheduleMeeting
          borderRadius={10}
          primaryColor="#03a9f4"
          eventDurationInMinutes={30}
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
