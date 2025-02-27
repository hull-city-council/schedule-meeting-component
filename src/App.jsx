import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { suggestAppointment, createProvisional } from "./lookups";
import Loader from "./Loader";
import { globalStyles } from "./assets/styles";

const ScheduleMeetingComponent = ({ ...props }) => {

  const [timeslots, setTimeSlots] = useState([]);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const sid = typeof FS !== "undefined" && FS !== null ? (ref = FS.Auth) != null ? ref.session['auth-session'] : void 0 : void 0;

  const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
    return {
      id,
      startTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(9, 0, 0, 0)),
      endTime: new Date(new Date(new Date().setDate(new Date().getDate() + id)).setHours(17, 0, 0, 0)),
    };
  }).slice(0);

  const createProvisionalWrapper = async (e) => {
    setIsLoading(true);
    try {
      await createProvisional(
        e,
        sid,
        props.calendar_id,
        props.duration,
        props.summary,
        props.location,
        props.description,
        props.event_id,
        props.book_time_lookup_id,
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data only when sid or calendar id changes
  useEffect(() => {
    if (sid && props.calendar_id) {
      async function fetchData() {
        const appointmentData = await suggestAppointment(
          sid,
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
      {timeslots.length > 0 ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "400px"
        }}>
          <Loader />
          <div style={{ marginTop: "8px" }}>
            Loading...
          </div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          {isLoading && (
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}>
              <Loader />
              <div style={{ marginTop: "8px" }}>
              Confirming appointment, please wait...
              </div>
            </div>
          )}
          <ScheduleMeeting
            eventDurationInMinutes={props.duration}
            availableTimeslots={availableTimeslots}
            format_startTimeFormatString="a"
            onStartTimeSelect={createProvisionalWrapper}
            startTimeListStyle="scroll-list"
          />
        </div>
      )}
    </>
  )
}

export default ScheduleMeetingComponent