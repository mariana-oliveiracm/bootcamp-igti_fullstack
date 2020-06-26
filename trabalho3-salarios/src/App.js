import React, { Component } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Results from './components/Results';
import Barra from './components/Barra';
import { calculateSalaryFrom } from './helpers/salary';
import css from './style.module.css'

const corINSS = '#e67e22';
const corIRPF = '#c0392b';
const corNET = '#16a085';


export default class App extends Component {
  constructor(){
    super();

    this.state = {
      salary: 1000,
    }
  }

  handleSalaryChange = (newSalary) => {
    this.setState({ salary: newSalary })
  }

  render() {

    const { salary } = this.state

    const calculateSalary = calculateSalaryFrom(salary);

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      percentINSS,
      percentIRPF,
      percentNetSalary,
    } = calculateSalary;

    return (
      <div className="container">
        <Header />

        <Search value={salary} onSalaryChange={this.handleSalaryChange}/>


        <div className="row">   
          <Results label="Base INSS:" value={baseINSS} />
          <Results label="Desconto INSS:" value={discountINSS} percentage={percentINSS} color={corINSS}/>
          <Results label="Base IRPF:" value={baseIRPF} />
          <Results label="Desconto IRPF:" value={discountIRPF} percentage={percentIRPF} color={corIRPF} />
          <Results label="Salário Líquido:" value={netSalary} percentage={percentNetSalary} color={corNET} />
        </div>
    

        <div className={css.barra}>
          <Barra color={corINSS} value={percentINSS} />
          <Barra color={corIRPF} value={percentIRPF} />
          <Barra color={corNET} value={percentNetSalary} />
        </div>
      </div>
    )
  }
}
