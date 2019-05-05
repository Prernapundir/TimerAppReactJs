import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import logo from '../src/image.png';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
class App extends Component {

  state = {
    date: new Date(),
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    edit: false,

  };

  dateChangeHandler = (date) => {
    this.setState({
      date: date,
      edit: false
    })
  };

  timer = () => {
    var selectDate = new Date(this.state.date).getTime();
    var nowdate = new Date().getTime();
    var distance = selectDate - nowdate;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.setState({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    })

    if(distance<0)
    {
      clearInterval(this.x);
      this.setState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
      })
        
    }

  };

  startTimer = () => {
    this.x=setInterval(this.timer, 1000);
  };
  stopTimer = () => {
    clearInterval(this.x);
    this.setState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    })
    clearInterval(this.x);
  }
  onEditHandler = () => {
    this.setState({
      edit: true,
      Edit: ''
    })
  };

  render() {
    let showPicker = null;
    let showbutton;

    if (this.state.edit) {
      showPicker = (
        <DateTimePicker
          onChange={this.dateChangeHandler}
          value={this.state.date}
        />
      );
    };

    if (!this.state.edit) {
      showbutton = (
        <i className="fa fa-pencil icon" aria-hidden="true" onClick={this.onEditHandler} style={{ fontSize: '40px' }} ></i>
      )
    };

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Countdown Timer</h2>
        </div>
        <div className="container card">
          <h1>{this.state.days}:{this.state.hours}:{this.state.minutes}:{this.state.seconds}</h1>
          <div className="container picker">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-4 col">
                  {showbutton}
                  {showPicker}
                </div>
                <div className="col-sm-4 col">
                  <i className="fa fa-play" aria-hidden="true" style={{ fontSize: '40px' }} onClick={this.startTimer}></i>
                </div>
                <div className="col-sm-4">
                  <i className="fa fa-pause" aria-hidden="true" style={{ fontSize: '40px' }} onClick={this.stopTimer}></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
