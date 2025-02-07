import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { suggestAppointment, createProvisional } from "./lookups";


const ScheduleMeetingComponent = ({ sid }) => {

  const [timeslots, setTimeSlots] = useState([]);
  const [data, setData] = useState(null);
  console.log(sid);

  function processAppointmentDates(){
    console.log(data);
    const newTimeslots = [];
    data.forEach(day => {
      Object.keys(day.appointments).forEach(unixTime => {
        if (day.appointments[unixTime] === "available") {
          const startTime = new Date(unixTime * 1000);
          const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration
          newTimeslots.push({ id: parseInt(unixTime), startTime, endTime });
        }
      });
    });
    setTimeSlots(newTimeslots);
  }

useEffect(() => {
  if (sid) {
    async function fetchSuggestedAppointments() {
      const result = await suggestAppointment(sid);
      setData(result);
      console.log("data", data);
      if (data) {
        processAppointmentDates();
      }
    }
    fetchSuggestedAppointments();
  }
}, [sid])

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

export default ScheduleMeetingComponent
