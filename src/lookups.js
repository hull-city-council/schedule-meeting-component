import { formatISO, format  } from "date-fns";

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

function getTimeZoneOffsetMinutes(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date).reduce((values, part) => {
    if (part.type !== 'literal') values[part.type] = part.value;
    return values;
  }, {});

  const timeZoneDate = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );

  return (timeZoneDate - date.getTime()) / 60000;
}

function isBritishSummerTime(date) {
  return getTimeZoneOffsetMinutes(date, 'Europe/London') > 0;
}

async function createProvisional(e, sid, calendarid, duration, summary, location, description, event_id, book_time_lookup_id, adjustForBst) {
  try {
    const appointmentTime = adjustForBst && isBritishSummerTime(e.startTime)
      ? new Date(e.startTime.getTime() - 60 * 60 * 1000)
      : e.startTime;

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
          start:  formatISO(appointmentTime).replace("T", " ").substring(0, 19),
          start_time: appointmentTime.toLocaleTimeString(),
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
          $("input#selectedDate").val(formatISO(e.startTime)).trigger("input");
        }
        if ($("input#returnedEventId")) {
          $("input#returnedEventId").val(responsePayload.id).trigger("input");
        }
        if ($("input#friendlyAppointmentDate")) {
          $("input#friendlyAppointmentDate").val(format(e.startTime, "EEEE dd MMMM yyyy 'at' hh:mmaaa")).trigger("input");
        }
        return responsePayload.data;
      });


  } catch (error) {
    alert("Unable to create appointment, try selecting another time.");
    console.log(e);
    console.error("Error:", error);
  }
}

export { suggestAppointment, createProvisional };