import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { subscribe, unsubscribe } from "./events";

function App() {

  const timeslots = [];
  const [meetingData, setMeetingData] = useState();

  useEffect(() => {
    subscribe("appointmentsFound", (e) => setMeetingData(e.detail));
    console.log(meetingData)
    if (meetingData) {
      meetingData?.data?.forEach(day => {
        console.log(day);
        Object.keys(day?.appointments).forEach(unixTime => {
          console.log(unixTime);
          if(day?.appointments[unixTime] === "available") {
            const startTime = new Date(unixTime * 1000);
            const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration
            timeslots.push({ id: unixTime, startTime, endTime });
          }
        })
      })
      console.log(timeslots);
    }
  }, [meetingData]);

  return (
    <>
      {meetingData ? (
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
