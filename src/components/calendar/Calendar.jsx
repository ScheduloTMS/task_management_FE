import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css"; 

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default CustomCalendar;
