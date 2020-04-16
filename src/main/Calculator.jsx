import React, { Component } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentIndex: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory = () => {
    this.setState({ ...initialState });
  };

  setOperation = (event) => {
    const operation = event.target.innerHTML;
    if (this.state.currentIndex === 0) {
      this.setState({
        operation,
        currentIndex: 1,
        clearDisplay: true,
      });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch(e) {
          values[0] = this.state.values[0]
      }
      values[1] = 0;
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        currentIndex: equals ? 0 : 1,
        clearDisplay: true,
        values,
      });
    }
  };

  addDigit = (event) => {
    const digit = event.target.innerHTML;
    const currentValue = this.state.displayValue;
    if (digit === "." && currentValue.includes(".")) {
      return;
    }
    const clearDisplay = currentValue === "0" || this.state.clearDisplay;
    const newValue = clearDisplay ? digit : currentValue + digit;
    this.setState({ displayValue: newValue, clearDisplay: false });
    if (newValue !== ".") {
      const index = this.state.currentIndex;
      const operationValue = parseFloat(newValue);
      const values = [...this.state.values];
      values[index] = operationValue;
      //   if variable has same name as state key, dont need the key name to be updated
      this.setState({ values });
    }
  };

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
