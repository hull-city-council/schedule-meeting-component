import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { suggestAppointment, createProvisional } from "./lookups";
// import rawStyles from 'react-schedule-meeting/dist/index.esm.js?raw';



const ScheduleMeetingComponent = ({ ...props }) => {

  const [timeslots, setTimeSlots] = useState([]);
  const [data, setData] = useState();

  // Fetch data only when sid changes
  useEffect(() => {
    if (props.sid && props.calendarid) {
      console.log(          props.sid,
        props.calendarid,
        props.granularity,
        props.duration,
        props.startdate,
        props.enddate,
        props.starttime,
        props.endtime);
      async function fetchData() {
        const appointmentData = await suggestAppointment(
          props.sid,
          props.calendarid,
          props.granularity,
          props.duration,
          props.startdate,
          props.enddate,
          props.starttime,
          props.endtime
        );
        setData(appointmentData);
      }
      fetchData();
    }
  }, [props.calendarid]);

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
      {/* <style>{rawStyles}</style> */}
      {timeslots.length > 0 ? (
        <ScheduleMeeting
          style="font-family: Arial, sans-serif;"
          borderRadius={10}
          primaryColor="#03a9f4"
          eventDurationInMinutes={15}
          availableTimeslots={timeslots}
          onStartTimeSelect={(e) => createProvisional(
            e, 
            props.sid,
            props.calendarid,
            props.summary,
            props.location,
            props.description,
            props.eventid
          )}
          startTimeListStyle="scroll-list"
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default ScheduleMeetingComponent
