import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import "./cal.css";

function Cal() {
  const [date, setDate] = useState(new Date());

  function onChange(date) {
    setDate(date);
  }

  return (
    <div className="calendar-container">
      <Calendar showWeekNumbers onChange={onChange} value={date} />
    </div>
  );
}

export default Cal;
