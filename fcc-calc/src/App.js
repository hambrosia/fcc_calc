import React, { Component } from 'react';
import './App.css';
//import Calc from './Calc'

class App extends Component {

  //default value for display
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
      prevDisplayValue: '0',
      operator: ''
    };

    //no clue why this is necessary, shouldn't the state be accessible to the render function already?
    this.updateDigits = this.updateDigits.bind(this);
  }

  updateDigits(digit){

    this.setState({
      displayValue: this.state.displayValue + digit
    })
  }

  componentDidUpdate (){
    if(this.state.displayValue.length > 1){
      if(this.state.displayValue.charAt(0) === '0'){
        this.setState({
          displayValue: this.state.displayValue.slice(1, this.state.displayValue.length)
        })
      }
    }
  }

  clearDisplay(){
    this.setState({
      displayValue: '0'
    })
  }

  minusPos(){
    if(this.state.displayValue.charAt(0) !== '-' ){
      this.setState({
        displayValue: '-' + this.state.displayValue
      })
    } else{
      this.setState({
        displayValue: this.state.displayValue.slice(1, this.state.displayValue.length)
      })
    }
  }

  operators(operator){
    this.setState({
      prevDisplayValue: this.state.displayValue,
      operator: operator
    })

    this.clearDisplay()
  }

  equalator(){

    const pDisp = Number(this.state.prevDisplayValue)
    const disp = Number(this.state.displayValue)

    switch(this.state.operator){
      case '+':
      this.setState({
        displayValue: (pDisp + disp).toString()
      })
      break;
      case '-':
      this.setState({
        displayValue: (pDisp - disp).toString()
      })
      break;
      case 'x':
      this.setState({
        displayValue: (pDisp * disp).toString()
      })
      break;
      case '/':
      this.setState({
        displayValue: (pDisp / disp).toString()
      })
      break;
      default: return null
    }
  }

  makeButton(btnText){

    switch(btnText){

      case 'AC':
      return <button key={btnText} onClick={() => this.clearDisplay()}> {btnText} </button>

      case '&#177;':
      return   <button key={btnText} onClick={ () => this.minusPos()}> 	&#177; </button>

      case '%':
      return <button key={btnText} > {btnText} </button>

      case '&#8730;':
      return  <button  key={btnText} > &#8730; </button>

      case '7':
      return  <button  key={btnText} onClick={ () => this.updateDigits(7)}> {btnText} </button>

      case '8':
      return  <button key={btnText} onClick={ () => this.updateDigits(8)}> {btnText} </button>

      case '9':
      return  <button key={btnText} onClick={ () => this.updateDigits(9)}> {btnText} </button>

      case '/':
      return  <button key={btnText} onClick={ () => this.operators('/')}> {btnText} </button>

      case '4':
      return <button key={btnText} onClick={ () => this.updateDigits(4)}> {btnText} </button>

      case '5':
      return <button key={btnText} onClick={ () => this.updateDigits(5)}> {btnText} </button>

      case '6':
      return <button key={btnText} onClick={ () => this.updateDigits(6)}> {btnText} </button>

      case 'x':
      return <button key={btnText} onClick={ () => this.operators('x')}> {btnText} </button>

      case '1':
      return <button key={btnText} onClick={ () => this.updateDigits(1)}> {btnText} </button>

      case '2':
      return <button key={btnText} onClick={ () => this.updateDigits(2)}> {btnText} </button>

      case '3':
      return <button key={btnText} onClick={ () => this.updateDigits(3)}> {btnText} </button>

      case '-':
      return <button key={btnText} onClick={ () => this.operators('-')} > {btnText} </button>

      case '0':
      return <button key={btnText} onClick={ () => this.updateDigits(0)}> {btnText} </button>

      case '.':
      return <button key={btnText} onClick={ () => this.updateDigits('.')}> {btnText} </button>

      case '=':
      return <button key={btnText} onClick={ () => this.equalator()} > {btnText} </button>

      case '+':
      return <button key={btnText} onClick={ () => this.operators('+')} > {btnText} </button>

      default: return null
    }
  }

  changeHandler = (e) => {
    console.log(e.target.value)
    this.setState({
      // .target.value gives you the user's input from the input field
      displayValue: e.target.value
    })
  }

  makeRow(elements) {
    let row = [];

    elements.forEach(element => {
      row.push(this.makeButton(element))
    })
    return (
      <div>
      {row}
      </div>
    )
  }

  render() {
    return (
      <div id="wrapper">
      <div id="calcBody">
      <input id="calcDisplay"  type="text" value={this.state.displayValue} onChange={this.changeHandler} />
      {this.makeRow(['AC', '&#177;', '%', '&#8730;'])}
      {this.makeRow(['7', '8', '9', 'x'])}
      {this.makeRow(['4', '5', '6', '/'])}
      {this.makeRow(['1', '2', '3', '-'])}
      {this.makeRow(['0', '.', '=', '+'])}
      </div>
      </div>
    );
  }
}

export default App;
