import React, { Component } from 'react';
import Control from './Control';
import Timer from './Timer';

class Clock extends Component{
    constructor(props){
      super(props);
      this.state = {
        break:5,
        session:25,
        running:false,
        spent:0
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
    }
    intvl;
    handleToggle(event){
      if(this.state.running){
        clearInterval(this.intvl);
        this.setState(state => ({...state, running:false}))
      }else{
        this.intvl = setInterval(()=>{
          console.log("BEFORE", this.state.spent)
          this.setState(state => ({...state, spent:state.spent + 1, running:true}))
          console.log("ON TOGGLE", this.state)
        },1000)  
      }
    }
    handleClick(o){
      this.setState(state => {
        console.log('pasok dine', o.target);
        console.log(this.state.spent);
        if(o.target == "break"){
          const bb = o.action === 'up' ? state.break + 1 : state.break - 1
          return {session:state.session, 
                  break:bb > 0 ? bb : 1}
        }else{
            const ss = o.action === 'up' ? state.session + 1 : state.session - 1;
            return {break:state.break, 
                    session:ss > 0 ? ss : 1}
        }
        
      })
    }
    render(){
      let time = (this.state.session * 60) - this.state.spent;
      let minutes = Math.floor(time/60)
      let seconds = time - minutes * 60;
      return(
        <div className="Clock rounded">
          <h1 className="title">25 + 5 Clock</h1>
          <div className="control-wrap d-flex justify-content-between">
            <Control 
              id="break" 
              running={this.state.running}
              value={this.state.break}
              onClick={this.handleClick}
              />
            <Control 
              id="session" 
              running={this.state.running}
              value={this.state.session}
              onClick={this.handleClick}
              />
          </div>
          <div className="timer-wrap">
            <Timer 
              minutes={minutes}
              seconds={seconds}
              // session={this.state.session} 
              // break={this.state.break}
              running={this.state.running}
              // spent={this.state.spent}
              onToggle={this.handleToggle}
              />
          </div>
        </div>
      )
    }
  }

  export default Clock;