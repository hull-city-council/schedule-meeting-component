import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { suggestAppointment, createProvisional } from "./lookups";

const ScheduleMeetingComponent = ({ sid }) => {

  const [timeslots, setTimeSlots] = useState([]);

  console.log(sid);

  useEffect(() => {
    if (sid) {
      async function fetchAndProcessAppointments() {
        const avalableAppointments = await suggestAppointment(sid);
        async function processAppointments(appointments) {
          await Promise.all(appointments.map(async (appointment) => {
            await suggestAppointment(appointment);
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
          }));
        }
        await processAppointments(avalableAppointments.data);
      }
      fetchAndProcessAppointments();
    }
  }, [timeslots, sid]);

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
