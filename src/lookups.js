async function suggestAppointment(sid, calendarid, granularity, duration, startdate, enddate, starttime, endtime) {
  try {
    return await fetch("/apibroker/?api=RunLookup&app_name=AchieveForms&sid=" + sid + "&id=63e50558b8a6f", {
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
          calendar_id: calendarid,
          duration: duration,
          start_time: starttime,
          end_time: endtime,
          granularity: granularity,
          timezone: "Europe/London",
          from: startdate,
          to: enddate
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        let responsePayload = data.integration.transformed.rows_data[0].response;
        if (typeof responsePayload === "string") {
          responsePayload = JSON.parse(responsePayload);
        }
        return responsePayload.data;
      });
  } catch (error) {
    console.error(error);
    alert("Unable to fetch availbility");
  }
}

async function createProvisional(e, sid, calendarid) {
  try {
    return await fetch("/apibroker/?api=RunLookup&app_name=AchieveForms&sid=" + sid + "&id=63e50580cdaf4", {
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
          calendar_id: calendarid,
          duration: 30,
          start: e.startTime.toISOString().replace("T", " ").substring(0, 19),
          start_time: e.startTime.toLocaleTimeString(),
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
    alert("Unable to create appointment");
    console.log(e);
    console.error('Error:', error);
  }
  console.log(e);
}


export { suggestAppointment, createProvisional };