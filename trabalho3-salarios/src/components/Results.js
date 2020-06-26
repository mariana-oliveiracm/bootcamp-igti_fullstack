import React, { Component } from 'react'
import { formatPercentage, formatMoney } from '../helpers/formatters';

export default class Results extends Component {
    render() {
        const { label, value, color = 'darkblue', percentage } = this.props
        
        const id = 'input' + Math.floor(Math.random() * 10);
        
        const porcentagem = percentage > 0 ? `(${formatPercentage(percentage)})` : ''
        const numeroFormatado = `${formatMoney(value)} ${porcentagem}`
        
        return (
            <div className="input-field col s12 m6 l3">
                <input readOnly value={numeroFormatado} style={{/*color: cor*/ color, fontWeight: 'bold'}} />
                <label className="active" id={id}> {label}
                </label>
            </div>
        )
    }
}
