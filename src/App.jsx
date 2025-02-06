import React, { useState, useEffect } from "react";
import { ScheduleMeeting } from "react-schedule-meeting";
import { subscribe, unsubscribe } from "./events";

function App() {

  const [timeslots, setTimeSlots] = useState([]);
  sid = typeof FS !== "undefined" && FS !== null ? (ref = FS.Auth) != null ? ref.session['auth-session'] : void 0 : void 0;

  useEffect(() => {
    const handleAppointmentsFound = (e) => {
      console.log("Event received:", e.detail);

      const newTimeslots = [];
      e.detail.data.forEach(day => {
        Object.keys(day?.appointments).forEach(unixTime => {
          if (day?.appointments[unixTime] === "available") {
            const startTime = new Date(unixTime * 1000);
            const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Assuming 30 minutes duration
            newTimeslots.push({ id: parseInt(unixTime), startTime, endTime });
          }
        });
      });
      setTimeSlots(newTimeslots);
    };

    subscribe("appointmentsFound", handleAppointmentsFound);

    return () => {
      unsubscribe("appointmentsFound", handleAppointmentsFound);
    };
  }, [timeslots]);

  async function createProvisional(startTimeEventEmit) {
    try {
      await fetch("/apibroker/?api=RunLookup&app_name=AchieveForms&sid=" + sid + "&id=63e50580cdaf4", {
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
            start: startTimeEventEmit.startTime.toISOString().replace("T", " ").substring(0, 19),
            start_time: startTimeEventEmit.startTime.toLocaleTimeString(),
            event_location: "Telephone appointment",
            event_ID: "FS684941349",
            timezone: "Europe/London",
          }
        })
      })
        .then(function (response) {
          return response.json();
        });

    } catch (error) {
      console.error('Error:', error);
    }
    console.log(startTimeEventEmit.startTime);
  }

  return (
    <>
      {timeslots.length > 0 ? (
        <ScheduleMeeting
          borderRadius={10}
          primaryColor="#03a9f4"
          eventDurationInMinutes={15}
          availableTimeslots={timeslots}
          onStartTimeSelect={createProvisional}
          startTimeListStyle="scroll-list"
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default App
