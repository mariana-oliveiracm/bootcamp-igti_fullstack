import React from 'react'
import Parcela from './Parcela'

export default function Parcelas({ dados }) {
    return (
        <div className="row">
            {dados.map((item) => {
                const { id } = item;
                return <Parcela key={id} dados={item} />
            })}
        </div>
    )
}
