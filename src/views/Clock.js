import React, { Component } from 'react';
import Control from './Control';
import Timer from './Timer';

class Clock extends Component{
    static defaultProps = {
      delay:250
    }

    constructor(props){
      super(props);
      this.state = {
        break:5,
        session:25,
        isRunning:false,
        spent:0
      }

      this.handleClick = this.handleClick.bind(this);
      this.handlePlayPause = this.handlePlayPause.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    handlePlayPause(event){
      event.preventDefault();
      
      if(this.state.isRunning){
        clearInterval(this.intvl);
        this.setState(state => ({...state, isRunning:false}))
      }else{
        this.intvl = setInterval(()=>{
          this.setState(state => ({...state, spent:state.spent + 1, isRunning:true}))
        },this.props.delay)  
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

    handleReset(){
      this.setState(state => {
        return {...state, running:false, spent:0, session:25, breaker:5}
      })
    }
    render(){
      
      return(
        <div className="Clock rounded text-center">
          <h1 className="title">25 + 5 Clock</h1>
          <div className="control-wrap d-flex justify-content-around">
            <Control 
              id="break" 
              running={this.state.running}
              value={this.state.break}
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
              break={this.state.break}
              onPlayPause={this.handlePlayPause}
              onReset={this.handleReset}
              />
          </div>
        </div>
      )
    }
  }

  export default Clock;