import React, { Component } from 'react';
import Control from './Control';
import Timer from './Timer';

class Clock extends Component{
    static defaultProps = {
      delay:700,
      breaker:2,
      session:1
    }

    constructor(props){
      super(props);
      this.state = {
        breaker:this.props.breaker,
        session:this.props.session,
        isRunning:false,
        spent:0,
        isSession:true
      }

      this.handleControl = this.handleControl.bind(this);
      this.handlePlayPause = this.handlePlayPause.bind(this);
      this.handleReset = this.handleReset.bind(this);
      this.onAlarm = this.onAlarm.bind(this);
      this.onTick = this.onTick.bind(this);
    }

    handlePlayPause(event){
      event.preventDefault();

      if(this.state.isRunning){
        clearInterval(this.intvl);
        this.setState(state => ({...state, isRunning:false}))
      }else{
        this.intvl = setInterval(this.onTick,this.props.delay)  
      }
    }

    onTick(){
      if(this.state.isSession){
        if(this.state.spent === this.state.session*60){
          this.onAlarm();
        }else{
          console.log("Kee on Ticking")
          this.setState(state => ({...state, spent:state.spent + 1, isRunning:true}))
        }
      }else{
        if(this.state.spent === this.state.breaker*60){
          this.onAlarm();
        }else{
          this.setState(state => ({...state, spent:state.spent + 1, isRunning:true}))
        }
      }
    }

    handleControl(o){
      if(!this.state.isRunning){
        if(o.target === 'session'){
          this.setState(state => ({...state, session:o.value, spent:0}))
        }else{
          this.setState(state => ({...state, breaker:o.value, spent:0}))
        }
      }
    }

    onAlarm(){
      clearInterval(this.intvl);
      console.log("SOUND THE ALARM", this.state)
      this.setState(state => ({...state, isSession:!state.isSession, spent:0}));
      this.intvl = setInterval(this.onTick,this.props.delay)
    }

    handleReset(){
      console.log("nandito na ka na")
      clearInterval(this.intvl)
      this.setState(state => ({...state, 
        isRunning:false, 
        spent:0, 
        session:this.props.session, 
        breaker:this.props.breaker, 
        isSession:true}))
    }

    render(){
      
      return(
        <div className="Clock rounded text-center">
          <h1 className="title">25 + 5 Clock</h1>
          <div className="control-wrap d-flex justify-content-around">
            <Control 
              id="break" 
              running={this.state.running}
              value={this.state.breaker}
              onClick={this.handleControl}
              />
            <Control 
              id="session" 
              running={this.state.running}
              value={this.state.session}
              onClick={this.handleControl}
              />
          </div>
          <div className="timer-wrap">
            <Timer 
              spent={this.state.spent}
              session={this.state.session} 
              breaker={this.state.breaker}
              isSession={this.state.isSession}
              onPlayPause={this.handlePlayPause}
              onReset={this.handleReset}
              />
          </div>
          <button onClick={this.onAlarm}>Toggle Display</button>
        </div>
      )
    }
  }

  export default Clock;