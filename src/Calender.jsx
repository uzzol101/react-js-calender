import React, { Component } from "react";
import "./calender.scss";
export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.todaysDate = new Date().getDate()
    this.today = new Date()
    this.selectedDaysMap = new Map().set(`${this.today.getFullYear()}/${this.today.getMonth()}`, new Map().set(this.todaysDate,this.todaysDate))
    this.state = {
      selectedDays: [this.todaysDate],
      currentMonthYear: new Date(),
      
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
    let  {currentMonthYear} = this.state
    console.log('keys ', this.selectedDaysMap.keys())
    let dateString = `${currentMonthYear.getFullYear()}/${currentMonthYear.getMonth()}`
    // find current months list
    if (this.selectedDaysMap.has(dateString)){
      let currentMonthsMap = this.selectedDaysMap.get(dateString)
      if  (currentMonthsMap.has(day)) {
        currentMonthsMap.delete(day)
      }else {
        currentMonthsMap.set(day, day)
      }
    } else  {
      this.selectedDaysMap.set(dateString, new  Map().set(day, day))
    }
    
    let presentMonthsMap = this.selectedDaysMap.get(dateString)
    let days = [...presentMonthsMap.values()]
    this.setState({
      selectedDays: days
    })
    
  }
  onChangeMonth (value)  {
    let {currentMonthYear} = this.state
    if (value  ==  'next') {
      let currentMonth = currentMonthYear.getMonth()
      currentMonth++
      currentMonthYear.setMonth(currentMonth)
      this.setState({
        currentMonthYear
      })
    }
    if (value == 'prev') {
      let currentMonth = currentMonthYear.getMonth()
      currentMonth--
      currentMonthYear.setMonth(currentMonth)
      this.setState({
        currentMonthYear
      })
    }

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
  prepareCalenderClassList (day, index) {
    let {currentMonthYear} = this.state
    let runningMonth = new Date().getMonth(), runningYear = new Date().getFullYear();
    let {selectedDays} = this.state
    let classList = ['day'] // default class

    // highlighting todya's date
    if (selectedDays.includes(day) && currentMonthYear.getMonth() == runningMonth && currentMonthYear.getFullYear() == runningYear) {
      classList.push('selected')
    }

    // disable past day's for running month
    if (this.todaysDate > day && index  <=30 && currentMonthYear.getMonth() == runningMonth && currentMonthYear.getFullYear() == runningYear) {
      classList.push('disabled')
    }
    // disable all  past  day's
    if (currentMonthYear.getMonth() <  runningMonth && currentMonthYear.getFullYear() <= runningYear) {
      classList.push('disabled')
    }

    // highlight  first day of months
    if (day == 1 && index < 30 ) {
      classList.push('disabled')
    }
    return classList.join(' ')

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
            className={this.prepareCalenderClassList(day, index)}
            onClick={() => this.onDaySelect(day)}
          >
            {day}
          </div>
        ))}
      </div>
    );
  }


  render() {
    let {currentMonthYear} = this.state
    let currentMonth = currentMonthYear.getMonth()
    let currentYear = currentMonthYear.getUTCFullYear()
    return (
      <>
        <div className="calender">
          <div className="header">
            <div className="select-months">
              <div onClick={() => this.onChangeMonth('prev')} className="button-left">Prev</div>
              <div className="show-months">
                {this.months[currentMonth]} { currentYear}
              </div>
              <div onClick={() => this.onChangeMonth('next')} className="button-left">Next</div>

            </div>
            <div className="weekdays">
            {this.days.map((day, idx) => (
              <span key={idx}>{day}</span>
            ))}
            </div>
          </div>
          <div className="body">{this.showCalender(currentMonth, currentYear)}</div>
        </div>
      </>
    );
  }
}
