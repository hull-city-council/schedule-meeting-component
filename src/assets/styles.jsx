const globalStyles = `

* {
    --text-color-rgb: 34, 34, 34;
    --primary-color-text-shade-rgb: 1.4999999999999947, 84.49999999999994, 122;
    --background-color-rgb: 255, 255, 255;
    --background-color-contrast-rgb: 34, 34, 34;
    --primary-color-rgb: 3, 169, 244;
    --primary-color-contrast-rgb: 34, 34, 34;
    --border-radius: 10px;
    font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"
}

:focus{
    outline: 3px solid rgba(0, 0, 0, 0) !important;
    color: #0b0c0c !important;
    background-color: #e3f6fe !important;
    box-shadow: 0 -2px #e3f6fe, 0 4px #0b0c0c !important;
    opacity: 100 !important;
}

*{box-sizing:border-box;}
h3{color:var(--ifm-heading-color);font-family:var(--ifm-heading-font-family);font-weight:var(--ifm-heading-font-weight);line-height:var(--ifm-heading-line-height);margin:var(--ifm-heading-margin-top) 0 var(--ifm-heading-margin-bottom) 0;}
h3{font-size:var(--ifm-h3-font-size);}
.rsm-date-title{color:#2c3749;}
body:not(.navigation-with-keyboard) :not(input):focus{outline:0;}
.go695645437{display:flex;border-radius:var(--border-radius);background:rgba(var(--background-color-rgb), 1);box-shadow:0 5px 22px rgba(20, 21, 21, 0.22), 0px 1px 4px rgba(20, 21, 21, 0.14);padding:16px;margin:16px;flex-direction:column;}
@media (min-width: 768px){
.go695645437{flex-direction:row;}
}
@media (max-width: 768px){
.go695645437{padding:8px;margin:8px;}
}
.go3073557368{flex:1;}
.go2080639341{width:100%;display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
.go1923315045{outline:none;background:none;border:none;border-radius:var(--border-radius);cursor:pointer;display:flex;justify-content:center;align-items:center;padding:8px;opacity:0.4;margin:0;color:rgba(var(--text-color-rgb), 0.7);}
.go1923315045:hover{opacity:0.7;background:rgba(var(--background-color-contrast-rgb), 0.06);}
.go4114704207{margin:0;padding:0;font-weight:700;font-size:24px;color:rgba(var(--text-color-rgb), 1);}
.go4247048326.react-calendar,.go4247048326.react-calendar *,.go4247048326.react-calendar *:before,.go4247048326.react-calendar *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;}
.go4247048326 button{margin:0;border:0;outline:none;margin-top:2.5px!important;margin-bottom:2.5px!important;}
.go4247048326 button:enabled:hover{cursor:pointer;}
.go4247048326 .react-calendar__month-view__weekdays{text-align:center;text-transform:uppercase;font-weight:bold;font-size:0.75em;}
.go4247048326 .react-calendar__month-view__weekdays__weekday{padding:0.5em;}
.go4247048326 .react-calendar__tile{max-width:100%;text-align:center;padding:0.75em 0.5em;background:none;}
.go4247048326 .day-tile{width:60px;height:60px;padding:5px;position:relative;z-index:1;}
@media (max-width: 768px){
.go4247048326 .day-tile{height:45px;}
}
.go4247048326 .day-tile::after{content:'';position:absolute;left:2px;top:2px;bottom:2px;right:2px;z-index:-1;}
.go4247048326 .day-tile abbr{font-weight:bold;font-size:15.33px;}
.go4247048326 .react-calendar__month-view__days__day--neighboringMonth{color:rgba(var(--text-color-rgb), .6);}
.go4247048326 .active-day-tile{color:rgba(var(--primary-color-text-shade-rgb), 1);}
.go4247048326 .active-day-tile::after{background:rgba(var(--primary-color-rgb), 0.222);border-radius:var(--border-radius);}
.go4247048326 .active-day-tile:hover{opacity:0.5;}
.go4247048326 .react-calendar__tile--now.day-tile{background:rgba(var(--background-color-rgb), 1);}
.go4247048326 .react-calendar__tile--now.day-tile::after{border-radius:var(--border-radius);background:rgba(var(--primary-color-rgb), 0.111);}
.go4247048326 .react-calendar__tile--now:hover.day-tile{background:rgba(var(--background-color-rgb), 1);}
.go4247048326 .react-calendar__tile--now:hover.day-tile::after{border-radius:var(--border-radius);background:rgba(var(--primary-color-rgb), 0.111);}
.go4247048326 .react-calendar__tile:hover.day-tile{background:rgba(var(--background-color-rgb), 1);}
.go4247048326 .react-calendar__tile--active.day-tile{background:rgba(var(--background-color-rgb), 1);color:rgba(var(--primary-color-text-shade-rgb), 1);}
.go4247048326 .react-calendar__tile--active.day-tile::after{border-radius:var(--border-radius);border:solid rgba(var(--primary-color-rgb), 0.111) 1px;}
.go4247048326 .react-calendar__tile--active:enabled.day-tile::after,.go4247048326  .react-calendar__tile--active:enabled:focus.day-tile::after{background:rgba(var(--primary-color-rgb), 0.222);border-radius:var(--border-radius);border:solid rgba(var(--primary-color-rgb), 1) 1px;}
.go4247048326 .react-calendar__tile--active:enabled.day-tile.react-calendar__tile--now::after,.go4247048326  .react-calendar__tile--active:enabled:focus.day-tile.react-calendar__tile--now::after{background:rgba(var(--primary-color-rgb), 0.111);}
.go4247048326 .react-calendar__month-view__weekdays__weekday abbr{text-decoration:none;font-weight:700;color:rgba(var(--text-color-rgb), 1);font-size:14px;}
.go4247048326.react-calendar{font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;border:none!important;width:100%!important;min-height:390px;}
@media (max-width: 768px){
.go4247048326.react-calendar{min-height:302px;}
}
.go135427820{width:1px;background:rgba(0, 0, 0, 0.1);margin:16px;}
@media (max-width: 768px){
.go135427820{width:auto;height:1px;}
}
.go321821519{flex:1;overflow:hidden;position:relative;}
@media (max-width: 768px){
.go321821519{min-height:301px;}
}
.go1716137461{position:absolute;width:100%;height:100%;display:flex;flex-direction:column;}
.go3046353551{position:relative;display:flex;flex-wrap:wrap;overflow-y:scroll;align-items:stretch;justify-content:flex-start;}
.go241900306{padding:12px 16px;margin:4px;border:none;color:rgba(var(--primary-color-contrast-rgb), 1);background-color:rgba(var(--primary-color-rgb), 1);border-radius:var(--border-radius);outline:none;cursor:pointer;font-size:16px;opacity:1;}
@media (max-width: 768px){
.go241900306{padding:7px 12px;}
}

.go618359429{height:100%;flex:1;width:100%;display:flex;justify-content:center;align-items:center;flex-direction:column;}
.go3074214942{margin:0;opacity:0.5;margin-bottom:24px;font-size:18px;color:rgba(var(--text-color-rgb), 1);}
.go4199485258{font-size:90%;font-weight:700;padding:16px 10px;border-radius:var(--border-radius);border:1px solid rgba(var(--background-color-contrast-rgb), 0.5);}

.go2225988090{position:relative;display:flex;flex-direction:column;overflow-y:scroll;padding-bottom:24px;padding-top:16px;}
.go2876234792{display:flex;width:100%;align-items:center;}
.go1318713726{padding:16px;border:none;color:rgba(var(--text-color-rgb), 1);background-color:rgba(0,0,0,0);border-radius:var(--border-radius);outline:none;width:100%;cursor:pointer;font-size:16px;opacity:1;}
.go1318713726:hover{opacity:0.8;background-color:rgba(var(--background-color-contrast-rgb), 0.06);}
.go3749871802{flex-shrink:0;flex:1;padding:0.5px;margin:0px 8px;position:relative;background:rgba(var(--background-color-contrast-rgb), 0.05);}

.go2876234792{display:flex;width:100%;align-items:center;}
.go2556357651{font-weight:bold;padding:16px;border:none;color:rgba(var(--primary-color-contrast-rgb), 1);background-color:rgba(var(--primary-color-rgb), 1);border-radius:var(--border-radius);outline:none;width:100%;cursor:pointer;font-size:16px;opacity:1;}
.go2556357651:hover{opacity:0.8;background-color:rgba(var(--primary-color-rgb), 1);}
.go3964545171{padding:8px 24px;border:none;background-color:rgb(0, 0, 0, 0);border-radius:var(--border-radius);outline:none;margin-left:8px;cursor:pointer;display:flex;justify-content:center;align-items:center;font-size:16px;height:100%;color:rgba(var(--text-color-rgb), 1);}
.go3964545171:hover{background-color:rgba(var(--background-color-contrast-rgb), 0.06);}

`;

export { globalStyles }; 