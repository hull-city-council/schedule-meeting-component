import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { suggestAppointment, createProvisional } from "./lookups";
import Loader from "./Loader";
import { globalStyles } from "./assets/styles";

const ScheduleMeetingComponent = ({ ...props }) => {

  const [timeslots, setTimeSlots] = useState([]);
  const [data, setData] = useState();

  // Fetch data only when sid or calendar id changes
  useEffect(() => {
    if (props.sid && props.calendar_id) {
      async function fetchData() {
        const appointmentData = await suggestAppointment(
          props.sid,
          props.calendar_id,
          props.granularity,
          props.duration,
          props.start_date,
          props.end_date,
          props.start_time,
          props.end_time,
          props.fetch_times_lookup_id,
        );
        setData(appointmentData);
      }
      fetchData();
    }
  }, [props.calendar_id]);

  // Process the fetched data when it updates
  useEffect(() => {
    if (data) {
      const newTimeslots = [];
      data.forEach(day => {
        Object.keys(day.appointments).forEach(unixTime => {
          if (day.appointments[unixTime] === "available") {
            const startTime = new Date(unixTime * 1000);
            const endTime = new Date(startTime.getTime() + props.duration * 60 * 1000);
            newTimeslots.push({ id: parseInt(unixTime), startTime, endTime });
          }
        });
      });
      setTimeSlots(newTimeslots);
    }
  }, [data]);

  return (
    <>
    <style>{globalStyles}</style>
      {timeslots.length === 0 ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "400px"
        }}>
          <Loader />
          <div style={{ marginTop: "8px", fontFamily: "Arial, sans-serif" }}>
            loading...
          </div>
        </div>
      ) : (
        <ScheduleMeeting
          eventDurationInMinutes={props.duration}
          availableTimeslots={timeslots}
          onStartTimeSelect={(e) => createProvisional(
            e,
            props.sid,
            props.calendar_id,
            props.duration,
            props.summary,
            props.location,
            props.description,
            props.event_id,
            props.book_time_lookup_id,
          )}
          startTimeListStyle="scroll-list"
        />
      )}
    </>
  )
}

export default ScheduleMeetingComponent
