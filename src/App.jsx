import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { createProvisional } from "./lookups";


const ScheduleMeetingComponent = ({ sid }) => {

  const [timeslots, setTimeSlots] = useState([]);
  const [data, setData] = useState();

  async function suggestAppointment(sid) {
    try {
      await fetch("/apibroker/?api=RunLookup&app_name=AchieveForms&sid=" + sid + "&id=63e50558b8a6f", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          formValues: {
            Section1: {}
          },
          tokens: {
            calendar_id: "cal_ZBLBiMdhsAC-SWx@_0fGt7JIj9-gZFyXKf7Lcnw",
            duration: 30,
            start_time: "09:00",
            end_time: "17:30",
            granularity: 15,
            event_location: "Telephone appointment",
            event_ID: "FS684941349",
            event_ID2: "FS684941349",
            timezone: "Europe/London",
            from: "2025-02-14",
            to: "2025-02-24"
          }
        })
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          setData(data);
        });

    } catch (error) {
      console.error(error);
      alert("Unable to fetch availbility");
    }
  }

  function processAppointmentDates() {
    console.log("process stage:", data.integration.transformed.rows_data[0].response);
    const availability = data.integration.transformed.rows_data[0].response.data;
    const newTimeslots = [];
    JSON.parse(availability).data.forEach(day => {
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
  if (sid) {
    suggestAppointment(sid);
  }

  useEffect(() => {
    console.log("Updated data:", data);
    if (data) {
      processAppointmentDates();
    }
  }, [data])

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
