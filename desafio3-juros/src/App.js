import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import Parcelas from './components/Parcelas';


export default function App() {

  const [montanteInicial, setMontanteInicial] = useState(1000);
  const [taxaJuros, setTaxaJuros] = useState(1);
  const [periodoMeses, setPeriodoMeses] = useState(1);
  const [parcelas, setParcelas] = useState([]);

  useEffect(() => {
    calculoJuros(montanteInicial, taxaJuros, periodoMeses);
  }, [montanteInicial, taxaJuros, periodoMeses])

  const calculoJuros = (montanteInicial, taxaJuros, periodoMeses) => {
    const novasParcelas = [];

    let currentId = 1;
    let currentValue = montanteInicial;
    let percentage = 0;

    for (let i = 1; i <= periodoMeses; i++){
      const percentageValue = (currentValue * Math.abs(taxaJuros))/100;
      
      currentValue = taxaJuros >= 0 ? currentValue + percentageValue : currentValue - percentageValue;
      

      percentage = (currentValue/montanteInicial - 1) * 100;

      novasParcelas.push({
        id: currentId++,
        value: currentValue,
        difference: currentValue - montanteInicial,
        percentage,
        profit: taxaJuros > 0,
      });
    };

    setParcelas(novasParcelas);

  };


  const handleChangeDados = (novoMontante, novaTaxa, novoPeríodo) => {
    if (novoMontante !== null){
      setMontanteInicial(novoMontante);
      return;
    }
    if (novaTaxa !== null){
      setTaxaJuros(novaTaxa);
      return;
    }
      setPeriodoMeses(novoPeríodo);    
    }


    return (
      
      <div className="container">
        <h2>React-Juros Compostos</h2>

        <Input dados={{ montanteInicial, taxaJuros, periodoMeses }} onChangeDados={handleChangeDados}/>

        <Parcelas dados={parcelas}/>
      </div>
    );
  
}
