import React, { Component } from "react";
import "./calender.scss";
export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().getDate();
    this.today = new Date();
    this.selectedDaysMap = new Map();
    this.disabledDaysMap = new Map();
    this.selectedDaysList = []
    this.disabledDaysList = []
    this.state = {
      selectedDays: [this.todaysDate],
      currentMonthYear: new Date()
    };
    this.days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
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

  componentDidMount() {
    let { currentMonthYear } = this.state;
    let dateString = new Date(
      currentMonthYear.getFullYear(),
      currentMonthYear.getMonth(),
      0
    ).toLocaleDateString();
    // for testing
    this.dateRange(new  Date(2019,5,20), new Date(2019,5,22))
    this.dateRange(new  Date(2019,5,25), new Date(2019,5,26))
    this.setState({
      selectedDays: this.todaysDate
    });
  }

  calculateTimeIntervalInDay(fromdate, todate) {
    // miliseconds in a day
    let ms_per_day = 1000 * 60 * 60 * 24;
    let diffTime = new Date(todate) - new Date(fromdate);
    let diffTimeInDay = Math.floor(diffTime / ms_per_day);
    return diffTimeInDay;
  }

  dateRange(fromdate, todate) {
    let fromDay = new Date(fromdate).getDate();
    let dayDiff = this.calculateTimeIntervalInDay(fromdate, todate);
    for (let i = 0; i <= dayDiff; i++) {
      let finalDate = new Date(new Date(fromdate).setDate(fromDay + i));
      let day = finalDate.getDate();
      let dateString = new Date(new Date(finalDate.getFullYear(), finalDate.getMonth(), 0)).toLocaleDateString();
      if (this.disabledDaysMap.has(dateString)) {
        let currentMonthsMap = this.disabledDaysMap.get(dateString);
        if (currentMonthsMap.has(day)) {
          currentMonthsMap.delete(day);
        } else {
          currentMonthsMap.set(day, day);
        }
      } else {
        this.disabledDaysMap.set(dateString, new Map().set(day, day));
      }
      
    }
  }

  onDaySelect(day) {
    let { currentMonthYear } = this.state;
    let dateString = new Date(
      currentMonthYear.getFullYear(),
      currentMonthYear.getMonth(),
      0
    ).toLocaleDateString();

    // find current months list
    if (this.selectedDaysMap.has(dateString)) {
      let currentMonthsMap = this.selectedDaysMap.get(dateString);
      if (currentMonthsMap.has(day)) {
        currentMonthsMap.delete(day);
      } else {
        currentMonthsMap.set(day, day);
      }
    } else {
      this.selectedDaysMap.set(dateString, new Map().set(day, day));
    }

    let presentMonthsMap = this.selectedDaysMap.get(dateString);
    let days = [...presentMonthsMap.values()];

    this.setState({
      selectedDays: days
    });
  }

  onChangeMonth(value) {
    let { currentMonthYear } = this.state;
    if (value == "next") {
      let currentMonth = currentMonthYear.getMonth();
      currentMonth++;
      currentMonthYear.setMonth(currentMonth);
      this.setState({
        currentMonthYear
      });
    }
    if (value == "prev") {
      let currentMonth = currentMonthYear.getMonth();
      currentMonth--;
      currentMonthYear.setMonth(currentMonth);
      this.setState({
        currentMonthYear
      });
    }
  }

  daysOfMonth(month, year) {
    let numOfDays = new Date(year, month + 1, 0).getDate();
    let firstDayofMonth = new Date(
      new Date(year, month, 1).getFullYear(),
      new Date(year, month, 1).getMonth(),
      1
    ).getDay();
    let days = [...Array.from(Array(firstDayofMonth).values())];
    for (let i = 0; i < numOfDays; i++) {
      let day = new Date(year, month, i + 1).getDate();
      days.push(day);
    }
    return days;
  }

  prepareCalenderClassList(day) {
    let { currentMonthYear } = this.state;
    let runningMonth = new Date().getMonth(),
      runningYear = new Date().getFullYear();
    let dateString = new Date(
      currentMonthYear.getFullYear(),
      currentMonthYear.getMonth(),
      0
    ).toLocaleDateString();
    let daysOfSelectedMonth = this.selectedDaysMap.get(dateString);
    let disabledDaysOfMonth = this.disabledDaysMap.get(dateString);
    this.selectedDaysList = daysOfSelectedMonth
      ? [...daysOfSelectedMonth.values()]
      : [];
    this.disabledDaysList = disabledDaysOfMonth
      ? [...disabledDaysOfMonth.values()]
      : [];
    let classList = ["day"]; // default class

    // highlighting todya's date
    if (
      day == this.todaysDate &&
      currentMonthYear.getMonth() == runningMonth &&
      currentMonthYear.getFullYear() == runningYear
    ) {
      classList.push("today");
    }

    // highlight selected days
    if (this.selectedDaysList.includes(day)) {
      classList.push("selected");
    }
    // highlight disabled days
    if (this.disabledDaysList.includes(day)) {
      classList.push("invalid");
    }
    // disable past day's for running month
    if (
      this.todaysDate > day &&
      currentMonthYear.getMonth() == runningMonth &&
      currentMonthYear.getFullYear() == runningYear
    ) {
      classList.push("disabled");
    }
    // disable all  past  day's
    if (
      currentMonthYear.getMonth() < runningMonth &&
      currentMonthYear.getFullYear() <= runningYear
    ) {
      classList.push("disabled");
    }

    // highlight  first day of months
    if (day == 1) {
      classList.push("firstday");
    }
    return classList.join(" ");
  }
  showCalender(month, year) {
    let days = this.daysOfMonth(month, year);
    return (
      <div className="calender-months">
        {days.map((day, index) => (
          <div
            key={index}
            className={this.prepareCalenderClassList(day)}
            onClick={() => this.onDaySelect(day)}
          >
            {day}{this.disabledDaysList.includes(day)? <div>D</div>:  ""}
            {this.selectedDaysList.includes(day)? <div>A</div>:  ""}
          </div>
        ))}
      </div>
    );
  }

  render() {
    let { currentMonthYear } = this.state;
    let currentMonth = currentMonthYear.getMonth();
    let currentYear = currentMonthYear.getUTCFullYear();
    return (
      <>
        <div className="calender">
          <div className="header">
            <div className="select-months">
              <div
                onClick={() => this.onChangeMonth("prev")}
                className="button-left"
              >
                Prev
              </div>
              <div className="show-months">
                <div className="months">{this.months[currentMonth]} </div> <div className="year">{currentYear}</div>
              </div>
              <div
                onClick={() => this.onChangeMonth("next")}
                className="button-left"
              >
                Next
              </div>
            </div>
            <div className="weekdays">
              {this.days.map((day, idx) => (
                <span key={idx}>{day}</span>
              ))}
            </div>
          </div>
          <div className="body">
            {this.showCalender(currentMonth, currentYear)}
          </div>
        </div>
      </>
    );
  }
}
