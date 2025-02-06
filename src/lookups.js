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
        return JSON.parse(data).integration.transformed.rows_data[0].response;
      });

  } catch (error) {
    console.error(error);
    alert("Unable to fetch availbility");
  }
}

async function createProvisional(startTimeEventEmit, sid) {
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


export { suggestAppointment, createProvisional };