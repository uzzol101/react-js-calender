import React, { Component } from "react";
import "./calender.css";
export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.selectedDaysMap = new Map().set(new Date().getDate(), new Date().getDate())
    this.state = {
      selectedDays: [new Date().getDate()]
    };
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

  onDaySelect (day) {
    let {selectedDays} = this.state
    if(this.selectedDaysMap.get(day)){
      this.selectedDaysMap.delete(day)
    } else  {
      this.selectedDaysMap.set(day, day)
    }
    let days = [...this.selectedDaysMap.values()]
    this.setState({
      selectedDays: days
    })
    
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
    let  {selectedDays} = this.state
    let days = this.daysOfMonth(month, year);
    let firstDayofMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay()
    
    return (
      <div className="calender-months">
          
        {days.map((day, index) => (
          <div
            key={index}
            className={selectedDays.includes(day) ? "day selected " : " day"}
            onClick={() => this.onDaySelect(day)}
          >
            {day}
          </div>
        ))}
      </div>
    );
  }

  componentDidMount () {
    this.selectedDaysMap.set(new Date().getDate(), new Date().getDate())
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
