import React, { Component } from 'react'


export default class Barra extends Component {
    render() {

        const { color, value } = this.props;

        return (
            <div style={{backgroundColor: color, width: value + '%', height: '30px'}}>                
            </div>
        )
    }
}
