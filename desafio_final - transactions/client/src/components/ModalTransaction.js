import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root');


export default function ModalTransaction({ onClose, isEditMode, currentData, onAdd, onEdit }) {

    //const { thisDescription, thisCategory, thisValue, thisType, thisYMD } = currentData

    const id = isEditMode ? currentData.thisId: ''
    const [description, setDescription] = useState(isEditMode ? currentData.thisDescription: '');
    const [category, setCategory] = useState(isEditMode ? currentData.thisCategory : '');
    const [value, setValue] = useState(isEditMode ? currentData.thisValue : '');
    const [type, setType] = useState(isEditMode ? currentData.thisType : '')
    const [date, setDate] = useState(isEditMode ? currentData.thisYMD : '');

    const handleModalClose = () => {
        onClose(null);
    };

    const title = isEditMode ? 'Edição' : 'Inclusão'    

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }    

    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }    

    const handleValueChange = (event) => {
        setValue(event.target.value)
    }    

    const handleDateChange = (event) => {
        setDate(event.target.value)
    }

    const handleRadioChange = () => {
        if(!isEditMode){
            const checkedValue = document.querySelector('input[name="tipo"]:checked').value
            setType(checkedValue)
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();       
        const dados = {
            id,
            dados: {
                description,
                value:  parseFloat(value),
                category,
                year: parseInt(date.slice(0, 4)),
                month: parseInt(date.slice(5, 7)),
                day: parseInt(date.slice(8)),
                yearMonth: date.slice(0, 7),
                yearMonthDay: date,
                type
            }
        }
        if(!isEditMode){
            if (dados.dados.category == '' || isNaN(dados.dados.day) || dados.dados.description == '' || isNaN(dados.dados.month) || dados.dados.type== '' || isNaN(dados.dados.value) || isNaN (dados.dados.year) || dados.dados.yearMonth == '' || dados.dados.yearMonthDay == ''){
                alert('FAVOR PREENCHER TODOS OS CAMPOS CORRETAMENTE!')
            } else {
                onAdd(dados)
                handleModalClose();
            }           
        }else if (isEditMode){
            if (dados.dados.category == '' || isNaN(dados.dados.day) || dados.dados.description == '' || isNaN(dados.dados.month) || dados.dados.type== '' || isNaN(dados.dados.value) || isNaN (dados.dados.year) || dados.dados.yearMonth == '' || dados.dados.yearMonthDay == ''){
                alert('FAVOR PREENCHER TODOS OS CAMPOS CORRETAMENTE!')
            } else {
            onEdit(dados);
            handleModalClose();
            }
        }

    }
    
    /*const disableSaveButton = () => {
        const isRadioDespesa = document.getElementById('radioDespesa').checked
        const isRadioReceita = document.getElementById('radioReceita').checked
        const isDescription = document.getElementById('descricao').value
        const isCategory = document.getElementById('categoria').value
        const isValue = document.getElementById('valor').value
        const isDate = document.getElementById('data').value

        return ((isRadioDespesa || isRadioReceita) && isDescription !== '' && isCategory !== '' && isValue !== '' && isDate !== '')
        
    }*/
    
             

 
    
    return (
        <div>
            <Modal isOpen={true} style={styles.modal}>
                <div style={styles.topo}>
                    <h4>{title} de lançamento</h4>
                    <a onClick={handleModalClose} className="waves-effect waves-light red btn"><i className="material-icons left">close</i>Fechar</a>
                </div>

                <div style={styles.body}>
                    <form onSubmit={handleFormSubmit}>
                    <div style={styles.radio} onChange={handleRadioChange}>
                        <label>
                            <input checked={isEditMode && type == '-'} disabled={isEditMode} value="-" id="radioDespesa" name="tipo" type="radio" />
                            <span style={styles.spanDespesa}>Despesa</span>
                        </label>
                        <label>
                            <input checked={isEditMode && type == '+'} disabled={isEditMode} value="+" id="radioReceita" name="tipo" type="radio"/>
                            <span style={styles.spanReceita}>Receita</span>
                        </label>
                        {/* <input checked={!isEditMode} disabled value="hidden" name="tipo" type="radio"/> */}
                    </div>
                    
                    <div className="input-field">
                        <label className="active" htmlFor="descricao">
                        Descrição:</label>
                        <input value={description} onChange={handleDescriptionChange} id="descricao" type="text"/>
                    </div>
                    <div className="input-field">
                        <label className="active" htmlFor="categoria">
                        Categoria:</label>
                        <input value={category} onChange={handleCategoryChange} id="categoria" type="text" />
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="input-field">
                                <label className="active" htmlFor="valor">
                                Valor:</label>
                                <input value={value} onChange={handleValueChange} id="valor" type="number" step="0.01"/>
                            </div>
                        </div>
                        <div className="col">
                        <input value={date} onChange={handleDateChange} id="data" type="date" min="2019-01-01" max="2021-12-31"/>
                        </div>
                    </div>
                    
                    <button className="waves-effect waves-light btn"><i className="material-icons left">save</i>Salvar</button>

                    </form>
                </div>                
            </Modal>
        </div>
    )
}

const styles = {
    modal: {
        overlay: {            
            position: 'fixed',
            /* top: '20px',
            bottom: '20px',
            left: '380px',
            right: '380px', */
            zIndex: 1
        },        
    },
    topo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    body: {
        border: '1px solid #26a69a',
        borderRadius: '5px',
        padding: '20px'
    },
    spanDespesa:{
        color: '#e53935',
        fontWeight: 'bold',
        fontSize: '1.5em'
    },
    spanReceita:{
        color: '#8bc34a',
        fontWeight: 'bold',
        fontSize: '1.5em',
        marginLeft: '15px'
    },
    radio: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
}