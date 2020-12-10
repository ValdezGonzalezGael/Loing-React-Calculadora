import React, { Component } from "react";
import "./App.css";
import { Button } from "./Button";
import { Input } from "./Input";
import { ClearButton } from "./ClearButton";
import * as math from "mathjs";
import "bootstrap/dist/css/bootstrap-grid.min.css";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      results: []
    };
  }

  addToInput = val => {
    this.setState({ input: this.state.input + val });
  };

  feedHistory = async () => {
    fetch('http://localhost:7000/history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    })
      .then(data => data.json())
      .then(data => {
        this.setState({
          results:  data,
        });
        console.log(this.state.results);
      })
      .catch(err => {
        alert("Algo salio mal");
      })
  }

  handleEqual = () => {
    fetch('http://localhost:7000/history', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ operation: this.state.input, result: math.eval(this.state.input) }),
            })
                .then(data => data.json())
                .then(data => {

                    this.setState({ input: math.eval(this.state.input) });
                })
                .catch(err => {
                    alert("Algo salio mal");
                })
  };

  render() {
    const history = this.state.results;

    return (
      <div className="app">
        <div className="calc-wrapper">
          <Input input={this.state.input} />
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>X</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={() => this.handleEqual()}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={() => this.setState({ input: "" })}>
              Clear
            </ClearButton>
          </div>
        </div>
        <div className="calc-wrapper">
          <div className="row">
            <div className="col">
    <div className="row">
      <Button handleClick={this.feedHistory}>Mostrar Historial</Button>
    </div>
    <table className='Tabla de Calculadora'>
                <thead className='table-active'>
                  <tr>
                    <th>Id</th>
                    <th>Operacón</th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, i) => (
                    <tr key={i}>
                      <td>{item.id}</td>
                      <td>{item.operation}</td>
                      <td>{item.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
