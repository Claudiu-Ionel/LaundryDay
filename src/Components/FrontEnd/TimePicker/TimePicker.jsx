import { useState, useEffect } from "react";
import { CgArrowLongRight } from "react-icons/cg";
import "./timepicker.css";

function TimePicker() {
  const [bookingStatus, setBookingStatus] = useState("ledig");

  // changing slot styles when booked:
  useEffect(() => {
    setBookingStatus("bokad");
  }, []);

  return (
    <div className="timePickerContainer">
      <h1>Du har valt datumet choosenDate. </h1>
      <h2>Ange den lediga tid som passar dig och tryck FORTSÄTT</h2>
      <article>
        <section>
          <div className={bookingStatus}>
            <p className="pickedTimeSlot">6:00 - 9:00</p>
            <p className="timeSlotStatus">{bookingStatus}</p>
          </div>
          <div className={bookingStatus}>
            <p className="pickedTimeSlot">9:00 - 12:00</p>
            <p className="timeSlotStatus">{bookingStatus}</p>
          </div>
          <div className={bookingStatus}>
            <p className="pickedTimeSlot">12:00 - 15:00</p>
            <p className="timeSlotStatus">{bookingStatus}</p>
          </div>
          <div className={bookingStatus}>
            <p className="pickedTimeSlot">15:00 - 18:00</p>
            <p className="timeSlotStatus">{bookingStatus}</p>
          </div>
        </section>
        <button class="finishBookingBtn">
          FORTSÄTT <br></br> <CgArrowLongRight />{" "}
        </button>
      </article>
    </div>
  );
}

export default TimePicker;
