import React, { Component } from 'react'

export default class Search extends Component {

    handleInputChange = (event) => {
        const newSalary = event.target.value;
        this.props.onSalaryChange(newSalary);
        
    };

    render() {
        return (
            <div>
                <label> Salário Bruto
                <input autoFocus id="salarioBruto" type="number" placeholder="digite o salário bruto" min="1000"
                    value={this.props.value}
                    onChange={this.handleInputChange}/>
                </label>
            </div>
        )
    }
}
