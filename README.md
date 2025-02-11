# Cronofy React UI for scheduling meetings

Designed for Granicus, this is a direct replacement for their solution. Credit to [react-schedule-meeting](https://github.com/TylerAHolden/react-schedule-meeting) and [react-to-web-component](https://github.com/bitovi/react-to-web-component) for their amazing work. Go and give them a ⭐. 

Welcoming PRs and suggestions. If you do want to use it, you may wish to fork this repo.

## How to use this component
It is designed to be a drop-in replacement for the Granicus solution. However, you can go a step further and remove the now redundant fields (detailed below) from your process:

- Add the script to your form as a html field
```html
<script>
sid = typeof FS !== "undefined" && FS !== null ? (ref = FS.Auth) != null ? ref.session['auth-session'] : void 0 : void 0;
document.querySelector("schedule-meeting").setAttribute("sid", sid);
</script>
<script src="https://hull-city-council.github.io/schedule-meeting-component/dist/assets/main.js" defer>
</script>

<schedule-meeting 
sid="" 
calendar_id="{calendar_id}"
summary="{summary}"
location="{event_location}"
description="{description}"
granularity="{granularity}"
duration="{duration}"
start_date="{start_day}"
end_date="{end_day}"
event_id="{case_ref}"
start_time="{start_time}"
end_time="{end_time}"
fetch_times_lookup_id="YOUR LOOKUP ID"
book_time_lookup_id="YOUR LOOKUP ID"
cancel_time_lookup_id="YOUR LOOKUP ID"
></schedule-meeting>
```
- add your lookup ids to fetch_times_lookup_id and book_time_lookup_id. cancel_time_lookup_id is not current used

### Optionally remove form fields
If your values are not dynamic you could tidy up your process by removing the now redundant fields and replace them with static values. You can replace all fields apart from event_id which needs to be unique so keep this as {case_ref}.
