import React from 'react'
import { formatMoney } from '../helpers/formatters'

export default function DataInfo({ dataTransactions }) {

    //const {category, day, description, id, month, type, value, year, yearMonth, yearMonthDay } = dataTransactions

    const lancamentos = dataTransactions.length

    const receitas = dataTransactions.reduce((acc, curr) => {
        if (curr.type == '+'){
            acc += curr.value
        }
        return acc
    }, 0)

    const despesas = dataTransactions.reduce((acc, curr) => {
        if (curr.type == '-'){
            acc += curr.value
        }
        return acc
    }, 0)

    const saldo = receitas - despesas

    return (
        <div style={styles.flexRow}>
            <span>Lançamentos: {lancamentos}</span>
            <span style={styles.spanReceita}>Receitas: {formatMoney(receitas)}</span>
            <span style={styles.spanDespesa}>Despesas: {formatMoney(despesas)}</span>
            <span>Saldo: {formatMoney(saldo)}</span>
        </div>
    )
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        border: '1px solid #26a69a',
        borderRadius: '5px',
        padding: '3px',
        margin: '20px 0px 20px 0px',
        fontWeight: 'bold',
        color: '#26a69a'
    },
    spanDespesa:{
        color: '#e53935',
    },
    spanReceita:{
        color: '#8bc34a',

    },
}
