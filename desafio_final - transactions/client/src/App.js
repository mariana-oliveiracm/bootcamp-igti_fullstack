import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import transactionService from './services/transactionService'

import AddAndFilter from './components/AddAndFilter';
import DatePeriod from './components/DatePeriod';
import DataInfo from './components/DataInfo';
import Transactions from './components/Transactions';


export default function App() {

  const [transactions, setTransactions] = useState([]);
  const [period, setPeriod] = useState([])

    /* useEffect(() => {
        retrieveTransactions(period);
    }, [])*/

    const retrieveTransactions = async (period) => {
        const result = await transactionService.getPeriod(period)
        setTransactions(result.data.sort((a,b) => a.day - b.day))
      }

    const handleInputChange = async (inputContent) =>{
        const result = await transactionService.getPeriod(period)
        const filtered = result.data.filter(transaction => {
          return transaction.description.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, "").includes(inputContent.toLowerCase().normalize("NFD").replace(/[^a-zA-Zs]/g, ""))
      })
      setTransactions(filtered.sort((a,b) => a.day - b.day))     
    }
    
    const handleChangePeriod = async (period) => {
      retrieveTransactions(period)
      setPeriod(period)
    }

    const handleDeleteTransaction = async (id) => {
      await transactionService.deleteOne(id)
      retrieveTransactions(period)
    }

    const handleAddTransaction = async (dadosTransaction) => {
      const { dados } = dadosTransaction
      await transactionService.insert(dados)
      retrieveTransactions(period)
    }

    const handleEditTransaction = async (dadosTransaction) => {
      const { id, dados } = dadosTransaction
      await transactionService.modify(id, dados)
      retrieveTransactions(period)
    }

      
      return (
        <Router>
        <div className="container">
        <h1>Desafio Final do Bootcamp Full Stack</h1>
        <h3>Controle Financeiro Pessoal</h3>
        
        <DatePeriod onChangePeriod={handleChangePeriod}/>
        <DataInfo dataTransactions={transactions}/>
        <AddAndFilter onChangeInput={handleInputChange} addTransaction={handleAddTransaction}/>
        <Transactions dataTransactions={transactions} deleteTransaction={handleDeleteTransaction} editTransaction={handleEditTransaction}/>
        

      </div>
    </Router>
  
  );
}
