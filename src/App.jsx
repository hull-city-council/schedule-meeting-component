import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScheduleMeeting } from "react-schedule-meeting";
import { suggestAppointment, createProvisional } from "./lookups";

const ScheduleMeetingComponent = ({ sid }) => {

  const [timeslots, setTimeSlots] = useState([]);
  console.log(sid);


  if (sid) {
    const getAvailibility = () => {
      return useQuery({ queryKey: ['availability'], queryfn: suggestAppointment });
    }
    const { data, error, isLoading } = getAvailibility();
    if (data) {
      console.log(data);
      const newTimeslots = [];
      data.integration.transformed.rows_data[0].response.data.forEach(day => {
        Object.keys(day?.appointments).forEach(unixTime => {
          if (day?.appointments[unixTime] === "available") {
            const startTime = new Date(unixTime * 1000);
            const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration
            newTimeslots.push({ id: parseInt(unixTime), startTime, endTime });
          }
        });
      });
      setTimeSlots(newTimeslots);
    }
  }

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
