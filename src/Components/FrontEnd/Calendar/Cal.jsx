import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import "./cal.css";

function Cal() {
  let test = document.querySelector(".react-calendar__month-view__days__day");

  console.log(test);

  const [weekNumber, setWeekNumber] = useState(new Date());
  return (
    <div className="calendar-container">
      <Calendar />
    </div>
  );
}

export default Calendar;
