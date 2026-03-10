import React, { Component } from 'react';
import './index.css';

// ============================================
// PART A: Controlled vs Uncontrolled Components
// ============================================
class ControlledComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    return (
      <div className="method-card">
        <h4>Controlled Component</h4>
        <div className="input-group">
          <label>Enter your name (Controlled):</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Type here..."
          />
        </div>
        <div className="display-box">
          <h3>Live Display (State-driven):</h3>
          <p>{this.state.name || 'No name entered'}</p>
        </div>
      </div>
    );
  }
}

class UncontrolledComponent extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.inputRef.current.value);
  };

  render() {
    return (
      <div className="method-card uncontrolled">
        <h4>Uncontrolled Component</h4>
        <div className="input-group">
          <label>Enter your name (Uncontrolled):</label>
          <input
            type="text"
            ref={this.inputRef}
            placeholder="Type here..."
          />
        </div>
        <button 
          className="calculate-btn" 
          onClick={this.handleSubmit}
        >
          Get Value (via Ref)
        </button>
        <div className="display-box">
          <h3>Display (Ref-driven):</h3>
          <p>{this.props.displayValue || 'Click button to get value'}</p>
        </div>
      </div>
    );
  }
}

class ControlledVsUncontrolled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uncontrolledValue: ''
    };
  }

  handleUncontrolledSubmit = (value) => {
    this.setState({ uncontrolledValue: value });
  };

  render() {
    return (
      <div className="demo-section">
        <h2>A. Controlled vs Uncontrolled Components</h2>
        <div className="method-comparison">
          <ControlledComponent />
          <UncontrolledComponent 
            onSubmit={this.handleUncontrolledSubmit}
            displayValue={this.state.uncontrolledValue}
          />
        </div>
      </div>
    );
  }
}

// ============================================
// PART B: Button Click Counter (Class Component)
// ============================================
class CounterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      animate: false
    };
  }

  increment = () => {
    this.setState({ 
      count: this.state.count + 1,
      animate: true
    });
    setTimeout(() => this.setState({ animate: false }), 200);
  };

  decrement = () => {
    this.setState({ 
      count: this.state.count - 1,
      animate: true
    });
    setTimeout(() => this.setState({ animate: false }), 200);
  };

  reset = () => {
    this.setState({ 
      count: 0,
      animate: true
    });
    setTimeout(() => this.setState({ animate: false }), 200);
  };

  render() {
    return (
      <div className="demo-section">
        <h2>B. Button Click Counter</h2>
        <div className="counter-display">
          <div className={`counter-value ${this.state.animate ? 'animate' : ''}`}>
            {this.state.count}
          </div>
        </div>
        <div className="counter-buttons">
          <button className="counter-btn increment" onClick={this.increment}>
            Increment (+)
          </button>
          <button className="counter-btn decrement" onClick={this.decrement}>
            Decrement (-)
          </button>
          <button className="counter-btn reset" onClick={this.reset}>
            Reset (0)
          </button>
        </div>
      </div>
    );
  }
}

// ============================================
// PART C: Addition of 2 Textbox Values
// ============================================
class AdditionApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: '',
      num2: '',
      result: null
    };
  }

  handleNum1Change = (e) => {
    this.setState({ num1: e.target.value });
  };

  handleNum2Change = (e) => {
    this.setState({ num2: e.target.value });
  };

  calculate = () => {
    const num1 = parseFloat(this.state.num1);
    const num2 = parseFloat(this.state.num2);

    if (isNaN(num1) || isNaN(num2)) {
      this.setState({ result: 'Please enter valid numbers' });
    } else {
      this.setState({ result: num1 + num2 });
    }
  };

  render() {
    return (
      <div className="demo-section">
        <h2>C. Addition of 2 Textbox Values</h2>
        <div className="addition-inputs">
          <div className="input-group">
            <label>First Number:</label>
            <input
              type="number"
              value={this.state.num1}
              onChange={this.handleNum1Change}
              placeholder="Enter first number"
            />
          </div>
          <span className="operator">+</span>
          <div className="input-group">
            <label>Second Number:</label>
            <input
              type="number"
              value={this.state.num2}
              onChange={this.handleNum2Change}
              placeholder="Enter second number"
            />
          </div>
        </div>
        <button className="calculate-btn" onClick={this.calculate}>
          Calculate Sum
        </button>
        <div className="result-display">
          <h3>Result:</h3>
          <div className="result-value">
            {this.state.result !== null ? this.state.result : '?'}
          </div>
        </div>
      </div>
    );
  }
}

// ============================================
// Main App Component
// ============================================
function App() {
  return (
    <div className="app-container">
      <h1>ReactJS Demo Applications</h1>
      <ControlledVsUncontrolled />
      <CounterApp />
      <AdditionApp />
    </div>
  );
}

export default App;

