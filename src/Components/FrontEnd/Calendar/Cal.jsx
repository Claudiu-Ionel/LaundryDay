import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import "./cal.css";

function Cal() {
  return (
    <div className="calendar-container">
      <Calendar />
    </div>
  );
}

export default Calendar;
