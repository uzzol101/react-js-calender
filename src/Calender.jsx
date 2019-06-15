import React, { Component } from "react";
import "./calender.css";
export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
    this.months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "jun",
      "july",
      "august",
      "september",
      "octobor",
      "november",
      "december"
    ];
  }

  daysOfMonth(month, year) {
    let numOfDays = new Date(year, month, 0).getDate();
    let  firstDayofMonth = new Date(new Date(year, month,1).getFullYear(), new Date(year, month, 1).getMonth(), 1).getDay()
    let days = [...Array.from(Array(firstDayofMonth).values())];
    for (let i = 0; i < numOfDays; i++) {
      let day = new Date(year, month, i + 1).getDate();
      days.push(day)
    }
    return days;
  }

  showCalender(month, year) {
    let days = this.daysOfMonth(month, year);
    let firstDayofMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()
    let highLigtedDays = [new Date().getDate()];
    return (
      <div className="calender-months">
          
        {days.map((day, index) => (
          <div
            key={index}
            className={highLigtedDays.includes(day) ? "day selected " : " day"}
          >
            {day}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <>
        <div className="calender">
          <div className="header">
            {this.days.map((day, idx) => (
              <span key={idx}>{day}</span>
            ))}
          </div>
          <div className="body">{this.showCalender(6, 2019)}</div>
        </div>
      </>
    );
  }
}
