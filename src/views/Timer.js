import React, { Component } from 'react';

class Timer extends Component{
    
    formatter(n){
      return n < 10 ? `0${n}` : `${n}`;
    }

    render(){
      const { session, breaker, spent, isSession, onPlayPause, onReset } = this.props;
      
      let time = ((isSession ? session : breaker) * 60) - spent;
      let minutes = Math.floor(time/60)
      let seconds = time - minutes * 60;
      //
      let display = `${this.formatter(minutes)}:${this.formatter(seconds)}`;
      
      return(
        <div className="Timer rounded">
          <h3 id="timer-label">{isSession ? 'Session' : 'Break'}</h3>
          <h1 id="time-left">{display}</h1>
  
          <button id="start_stop" 
            className="btn btn-secondary" 
            onClick={onPlayPause}>
            Play/Pause
          </button>
          <button id="reset" 
            className="btn btn-secondary m-1"
            onClick={onReset}> 
            Reset
          </button>
        </div>
      )
    }
  }

  export default Timer;