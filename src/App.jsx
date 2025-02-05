import React, {useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { subscribe, unsubscribe } from "./events";

function App() {

  const [ meetingData, setMeetingData ] = useState([]);

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

  if(meetingData) {
    console.log("data received:", meetingData);
  }

  return (
    <>
      <ScheduleMeeting
        borderRadius={10}
        primaryColor="#03a9f4"
        eventDurationInMinutes={30}
        availableTimeslots={availableTimeslots}
        onStartTimeSelect={console.log}
        startTimeListStyle="scroll-list"
      />
    </>
  )
}

export default App
