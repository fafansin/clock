import React, { Component } from 'react';

class Timer extends Component{
    constructor(props){
      super(props);
      // this.state = {
      //   running:0,
      //   play:false
      // }
      this.onPlay = this.onPlay.bind(this);
      this.onReset = this.onReset.bind(this);
    }
    // intvl;
    onPlay(event){
      event.preventDefault();
      this.props.onToggle({
        target:"timer",
        running:!this.props.running
      })
      // console.log('Dito naman')
      // if(this.state.play){
      //   clearInterval(this.intvl);
      //   this.setState(state => ({...state, play:false}))
      // }else{
      //   this.intvl = setInterval(()=>{
      //     this.setState(state => ({...state, running:state.running + 1, play:true}))
      //   },1000)  
      // }
      // console.log("TAENA THIS")
      // this.props.onToggle({
      //   target:"timer",
      //   action:"Kaliwali"
      // })
    }
    onReset(event){
      event.preventDefault();
      console.log("reset on Timer");
      this.props.onReset();
    }
  
    
    formatter(n){
      return n < 10 ? `0${n}` : `${n}`;
    }
    render(){
      // console.log("TIMER", this.props.spent)
      let display = `${this.formatter(this.props.minutes)}:${this.formatter(this.props.seconds)}`;
      
      return(
        <div className="Timer rounded">
          <h3 id="timer-label">Session</h3>
          <h1 id="time-left">{display}</h1>
  
          <button id="start_stop" 
            className="btn btn-secondary" 
            onClick={this.onPlay}>
            Play/Pause
          </button>
          <button id="reset" 
            className="btn btn-secondary m-1"
            onClick={this.onReset}> 
            Reset
          </button>
        </div>
      )
    }
  }

  export default Timer;