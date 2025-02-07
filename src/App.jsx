import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { suggestAppointment, createProvisional } from "./lookups";


const ScheduleMeetingComponent = ({ sid }) => {

  const [timeslots, setTimeSlots] = useState([]);
  const [data, setData] = useState();

  // Fetch data only when sid changes
  useEffect(() => {
    if (sid) {
      async function fetchData() {
        const appointmentData = await suggestAppointment(sid);
        console.log(appointmentData);
        setData(appointmentData);
      }
      fetchData();
    }
  }, [sid]);

  // Process the fetched data when it updates
  useEffect(() => {
    if (data) {
      const newTimeslots = [];
      data.forEach(day => {
        Object.keys(day.appointments).forEach(unixTime => {
          if (day.appointments[unixTime] === "available") {
            const startTime = new Date(unixTime * 1000);
            const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 minutes duration
            newTimeslots.push({ id: parseInt(unixTime), startTime, endTime });
          }
        });
      });
      setTimeSlots(newTimeslots);
    }
  }, [data]);

  return (
    <>
      {timeslots.length > 0 ? (
        <ScheduleMeeting
          borderRadius={10}
          primaryColor="#03a9f4"
          eventDurationInMinutes={15}
          availableTimeslots={timeslots}
          onStartTimeSelect={createProvisional(sid)}
          startTimeListStyle="scroll-list"
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default ScheduleMeetingComponent
