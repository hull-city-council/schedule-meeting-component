async function suggestAppointment(sid, calendarid, granularity, duration, startdate, enddate, starttime, endtime, fetch_times_lookup_id) {
  try {
    return await fetch("/apibroker/?api=RunLookup&app_name=AchieveForms&sid=" + sid + "&id=" + fetch_times_lookup_id, {
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
          granularity: granularity,
          timezone: "Europe/London",
          from: Date.parseExact(startdate, 'dd/MM/yyyy').toString('yyyy-MM-dd'),
          to: Date.parseExact(enddate, 'dd/MM/yyyy').toString('yyyy-MM-dd'),
          start_time: starttime,
          end_time: endtime,
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

async function createProvisional(e, sid, calendarid, duration, summary, location, description, event_id, book_time_lookup_id) {
  try {
    return await fetch("/apibroker/?api=RunLookup&app_name=AchieveForms&sid=" + sid + "&id=" + book_time_lookup_id, {
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
          summary: summary,
          description: description,
          start: e.startTime.toISOString().replace("T", " ").substring(0, 19),
          start_time: e.startTime.toLocaleTimeString(),
          event_location: location,
          event_ID: event_id,
          timezone: "Europe/London",
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        let responsePayload = data.integration.transformed.rows_data[0].response;
        if (typeof responsePayload === "string") {
          responsePayload = JSON.parse(responsePayload);
        }
        if ($("input#selectedDate")) {
          $("input#selectedDate").val(e.startTime.toISOString()).trigger("input");
        }
        if ($("input#returnedEventId")) {
          $("input#returnedEventId").val(responsePayload.id).trigger("input");
        }
        return responsePayload.data;
      });


  } catch (error) {
    alert("Unable to create appointment, try selecting another time.");
    console.log(e);
    console.error('Error:', error);
  }
}

export { suggestAppointment, createProvisional };