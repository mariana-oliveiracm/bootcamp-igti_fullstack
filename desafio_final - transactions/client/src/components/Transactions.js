/* import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';
import { Link } from 'react-router-dom';
import AddAndFilter from './AddAndFilter';
import Transaction from './Transaction';

export default function Transactions({ dados }) {
    
    console.log('transactions')
    console.log(transactions)

      /* const handleInputChange = async (inputContent) =>{
        let ano = '2020'
        let mes = '06'
        const result = await transactionService.getPeriod(ano, mes)
        const filtered = result.data.filter(transaction => {
            return transaction.description.toLowerCase().includes(inputContent.toLowerCase())
        })
        setTransactions(filtered)        
      }


    
    )
} */


import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';
import { Link } from 'react-router-dom';
import Transaction from './Transaction';

export default function Transactions({ dataTransactions, deleteTransaction, editTransaction }) {

    const sendOnDelete = (id) => {
        deleteTransaction(id)
    }

    const sendOnEdit = (dadosTransaction) => {
        editTransaction(dadosTransaction)
    }

    return (
        <div>
        {dataTransactions.map((transaction, index) => {
            return <Transaction key={index} dados={transaction} onDelete={sendOnDelete} onEditData={sendOnEdit}/>     
        })}
        </div>
    )
}
