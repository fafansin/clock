import React, { Component } from 'react';

class Control extends Component{
    static defaultProps = {
      min:1,
      max:60
    }
    constructor(props){
      super(props);
      
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event){
      event.preventDefault();

      const { id, value, min, max, onClick } = this.props;
      const ref = event.target.id.indexOf('increment') > -1 ? value + 1 : value - 1;
      
      if(ref >= min && ref <= max){
        onClick({target:id, value:ref});
      }
    }

    render(){
      const { id, value } = this.props;
      const title = id.charAt(0).toUpperCase() + id.slice(1);
      return(
        <div className="Control rounded">
          <h3 id={`${id}-label`}>{title} Length</h3>
          <div className="btn-wrap d-flex justify-content-between align-items-center">
            <button id={`${id}-decrement`} 
              className="btn btn-danger"
              onClick={this.handleClick}>
              &#8595;
            </button>
            <h4 id={`${id}-length`} className="value">{value}</h4>
            <button 
              id={`${id}-increment`} 
              className="btn btn-success"
              onClick={this.handleClick}>
              &#8593;
            </button>
          </div>
        </div>
      )
    }
  }

export default Control;