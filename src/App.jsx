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
    if (props.sid && props.calendarid) {
      async function fetchData() {
        const appointmentData = await suggestAppointment(
          props.sid,
          props.calendarid,
          props.granularity,
          props.duration,
          props.startdate,
          props.enddate,
          props.starttime,
          props.endtime,
          props.fetch_times_lookup_id,
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
            props.eventid,
            props.book_time_lookup_id,
          )}
          startTimeListStyle="scroll-list"
        />
      )}
    </>
  )
}

export default ScheduleMeetingComponent
