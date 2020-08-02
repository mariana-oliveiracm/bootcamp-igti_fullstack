import React, { useState } from 'react'

export default function DatePeriod({ onChangePeriod }) {

    const current_year = new Date().getFullYear();
    const years = [current_year - 1, current_year, current_year + 1];
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const periods = [];

    years.forEach((year) => {
        months.forEach((month) => {
            const period = `${year}-${month.toString().padStart(2, '0')}`
            periods.push(period);
        })
    })

    const [disableLeftButton, setDisableLeftButton] = useState(false)
    const [disableRightButton, setDisableRightButton] = useState(false)


        
    const handleChangeOption = () =>{
        const selected = document.getElementById('select')
        const selectedValue = selected.options[selected.selectedIndex].value
        if (selected.selectedIndex == 1){
            setDisableLeftButton(true)
        } else if (selected.selectedIndex !== 1) {
            setDisableLeftButton(false)
        } 
        if (selected.selectedIndex == 36){
            setDisableRightButton(true)
        } else if (selected.selectedIndex !== 36) {
            setDisableRightButton(false)
        } 
        onChangePeriod(selectedValue)
    }

    const handleLeftClick = () => {
        const selected = document.getElementById('select')
        selected.selectedIndex--        
        handleChangeOption()
        /* const selectedValue = selected.options[selected.selectedIndex - 1].value
        console.log(selectedValue) */        
    }

    const handleRightClick = () => {
        const selected = document.getElementById('select')
        selected.selectedIndex++
        handleChangeOption()
    }

    

    return (
        <div style={styles.flexRow}>
            <a onClick={handleLeftClick} disabled={disableLeftButton} style={styles.buttonLeft} className="waves-effect waves-light btn" ><i className="material-icons">chevron_left</i></a>
            <select onChange={handleChangeOption} id="select" style={styles.select} className="browser-default" >
                <option value="" disabled selected>escolha um período (ano-mês)</option>
                {periods.map((period)=> {
                    return <option key={period} value={period}>{period}</option>
                })}
            </select>
            <a onClick={handleRightClick} disabled={disableRightButton} style={styles.buttonRight} className="waves-effect waves-light btn" ><i className="material-icons">chevron_right</i></a>
        </div>
    )
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLeft: {
        marginRight: '10px',
        height: 'auto'
    },
    buttonRight: {
        marginLeft: '10px',
        height: 'auto'
    },
    select: {
        width: '500px'
    }

}
