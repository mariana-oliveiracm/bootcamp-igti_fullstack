import React from 'react'

const moneyFormatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

function formatMoneySign(value){
    const money = moneyFormatter.format(value);

    if (value >= 0){
        return `+${money}`;
    }
    
    return money
}

function formatMoney(value){
    return moneyFormatter.format(value)
}

function formatPercent(value) {
    return value.toFixed(2).replace('.', ',') + '%';
}

export default function Parcela({ dados }) {
    const { id, value, difference, percentage, profit } = dados;

    const classGoodValue = 'green-text darken-4';
    const classGoodPercent = 'blue-text darken-4';
    const classBadValue = 'red-text darken-4';
    const classBadPercent = 'orange-text darken-4';

    const classValue = profit ? classGoodValue : classBadValue;
    const classPercent = profit ? classGoodPercent : classBadPercent;

    return (
        <div className="col s6 m3 l2">
            <div style={styles.flexRow}>
                <span style={{ marginRight: '10px' }}>
                    <b>{id}</b>
                </span>
                <div>
                    <div className={classValue}>
                        <span>{formatMoney(value)}</span>
                    </div>
                    <div className={classValue}>
                        <span>{formatMoneySign(difference)}</span>
                    </div>
                    <div className={classPercent}>
                        <span>{formatPercent(percentage)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
  
      border: '1px solid lightgray',
      borderRadius: '4px',
      padding: '8px',
      margin: '4px',
    },
  };
