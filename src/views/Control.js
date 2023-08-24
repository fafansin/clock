import React, { Component } from 'react';

class Control extends Component{
    constructor(props){
      super(props);
      
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
      event.preventDefault();
      if(!this.props.running){
        this.props.onClick({
          target:this.props.id, 
          action:event.target.id.indexOf('increment') > -1 ? 'up' : 'down'})
      }
    }

    render(){
      const { id, value } = this.props;
      const title = id.charAt(0).toUpperCase() + id.slice(1);
      return(
        <div className="Control rounded">
          <h3 id={`${id}-label`}>{title} Length</h3>
          <div className="btn-wrap d-flex justify-content-between align-items-center">
            <button 
              id={`${id}-increment`} 
              className="btn btn-success"
              onClick={this.handleClick}>
              &#8593;
            </button>
            <h4 id={`${id}-length`} className="value">{value}</h4>
            <button id={`${id}-decrement`} 
              className="btn btn-danger"
              onClick={this.handleClick}>
              &#8595;
            </button>
          </div>
        </div>
      )
    }
  }

export default Control;