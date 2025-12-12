import React from "react";
import "./calander.css";

const Calander = () => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear()
  );
  const daysOfWeak = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay();
  return (
    <div className="calander">
      <div className="nav-date">
        <h2 className="month">{monthNames[currentMonth]}</h2>
        <h2 className="year">{currentYear}</h2>
        <button className="buttons">
          <i
            className="fa-solid fa-angle-left"
            onClick={() => {
              setCurrentMonth((prevMon) => (prevMon === 0 ? 11 : prevMon - 1));
              setCurrentYear((prevYear) =>
                currentMonth === 0 ? prevYear - 1 : prevYear
              );
            }}
          ></i>
          <i
            className="fa-solid fa-angle-right"
            onClick={() => {
              setCurrentMonth((prevMon) => (prevMon === 11 ? 1 : prevMon + 1));
              setCurrentYear((prevYear) =>
                currentMonth === 11 ? prevYear + 1 : prevYear
              );
            }}
          ></i>
        </button>
      </div>

      <div className="weakDays">
        {daysOfWeak.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>

      <div className="days">
        {[...Array(firstDayInMonth).keys()].map((_, index) => (
          <span key={`empty ${index}`}></span>
        ))}

        {[...Array(daysInMonth).keys()].map((_, index) => (
          <span
            key={index + 1}
            className={
              index + 1 === new Date().getDate() &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear()
                ? "current-day"
                : ""
            }
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calander;
