import React, { useState, useEffect } from 'react'
import ModalTransaction from './ModalTransaction';

export default function AddAndFilter({ onChangeInput, addTransaction }) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleFilterChange = (event) =>{
        onChangeInput(event.target.value)
    }

    const sendOnAdd = (dadosTransaction) =>{
        addTransaction(dadosTransaction)
    }

    return (
        <div style={styles.flexRow}>
            {!isModalOpen &&
                <a onClick={handleModalOpen} className="waves-effect waves-light amber darken-4 btn" ><i className="material-icons right">add</i>Novo Lançamento</a>}
            
            <i style={styles.icon} className="material-icons prefix">search</i>
            <input onChange={handleFilterChange} placeholder="BUSCAR" type="text" id="icon_prefix" ></input>

            {isModalOpen && (
                <ModalTransaction onClose={closeModal} onAdd={sendOnAdd}/>
            )}
        </div>
    )
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: '40px'
    },
    icon: {
        marginLeft: '300px',
        marginRight: '10px'
    }
}