import React from 'react'

export default function Input({ dados, onChangeDados }) {
    const { montanteInicial, taxaInicial, periodoMeses } = dados;

    const handleChangeMontante = (event) =>{
        onChangeDados(+event.target.value, null, null);
    }
    const handleChangeTaxa = (event) =>{
        onChangeDados(null, +event.target.value, null);
    }
    const handleChangeMeses = (event) =>{
        onChangeDados(null, null, +event.target.value);
    }


    return (
        <div className="center row" style={{marginBottom:'60px'}}>
            <div className="col input-field s6 m4 l3">
            <label htmlFor="inputMontante" className="active">Montante Inicial:
                <input id="inputMontante" value={montanteInicial} type="number" min="100" onChange={handleChangeMontante}></input>
            </label>
            </div>
            <div className="col input-field s6 m4 l3">
                <label htmlFor="inputTaxa" className="active">Taxa de Juros Mensal:
                    <input id="inputTaxa" value={taxaInicial} type="number" min="-12" max="12" onChange={handleChangeTaxa}></input>
                </label>
            </div>
            <div className="col input-field s6 m4 l3">
                <label htmlFor="inputMeses" className="active">Período (meses):
                    <input id="inputMeses" value={periodoMeses} type="number" min="1" onChange={handleChangeMeses}></input>
                </label>
            </div>
        </div>
    )
}
