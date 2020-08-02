import React, { useState, useEffect } from 'react'
import ModalTransaction from './ModalTransaction';
import { formatMoney } from '../helpers/formatters'
import transactionService from '../services/transactionService'


export default function Transaction({ dados, onDelete, onEditData }) {
    const {category, day, description, id, month, type, value, year, yearMonth, yearMonthDay } = dados;

    const data = {
        thisId: id,
        thisDescription: description, 
        thisCategory: category, 
        thisValue: value, 
        thisType: type,
        thisYMD: yearMonthDay
    }

    const monthsName = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = () =>{
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    
    const handleDelete = () => { 
        onDelete(id)
    }
    
    const sendEditData = (dadosTransaction) => {
        onEditData(dadosTransaction)
    }

    /* const sendOnSave = (dadosTransaction) =>{
        doSomethingTransaction(dadosTransaction)
    } */

    const isEntrada = (type) => {
        if (type == '+') {
            return true
        } else {
            return false
        }
    }
    const classEntrada = 'card-panel light-green'
    const classSaida = 'card-panel red darken-1'

    const classValue = isEntrada(type) ? classEntrada : classSaida

    return (
        <div style={styles.flexRow} className={classValue}>
            <div style={styles.flexRow}>
                <div style={styles.flexColumnData}>
                    <span style={styles.dia}>{day}</span>
                    <span>{monthsName[month-1]}/{year}</span>
                </div>
                <div style={styles.flexColumn}>
                    <span style={styles.categoria}>{category}</span>
                    {description}
                </div>
            </div>
            <div>
                <span style={styles.valor}>{formatMoney(value)}</span>
                <i onClick={handleEdit} style={styles.botao} className="material-icons">create</i>
                <i onClick={handleDelete} style={styles.botao} className="material-icons">delete</i>
            </div>

            {isModalOpen && (
                <ModalTransaction onClose={closeModal} isEditMode={true} currentData={data} onEdit={sendEditData}/>
            )}
        </div>
    )
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px',
        padding: '5px'
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    flexColumnData: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: '20px',
        border: '1px solid #fafafa  ',
        borderRadius: '5px',
        padding: '10px',

    },    
    dia: {
        fontWeight: 'bold',
        fontFamily: 'Courier New',
        fontSize: '2em',
    },
    categoria: {
        fontWeight: 'bold',
        fontSize: '1.2em'
    },
    valor: {
        fontWeight: 'bold',
        fontFamily: 'Courier New',
        fontSize: '2.2em',
        marginRight: '15px'
    },
    botao: {
        cursor: 'pointer'
    }
    
}

