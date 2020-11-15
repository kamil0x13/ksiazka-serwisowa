import React, { Component } from 'react'

import Preview from './Preview'
import Adding from './Adding'
import Edit from './Edit'

import Auth from '../functions/auth'

class Logged extends Component {
    state = {
        edit: false,
        adding: false,
        fetching: true,
        equipment: null,
        error: null,
        deleting: null,
    }

    setStateHandler = (value) => {
        this.setState(value)
    }

    logoutCb = (e) => {
        if (!e) {
            this.props.setStateHandler({ logged: false })
        }
    }

    render() {
        let mainElement = null
        if (this.state.adding) {
            mainElement = <Adding setStateHandler={this.setStateHandler} />
        } else if (this.state.edit) {
            mainElement = <Edit setStateHandler={this.setStateHandler} equipment={this.state.edit} />
        } else {
            mainElement = <Preview setStateHandler={this.setStateHandler} />
        }
        return (
            <div>
                <header className='topBar'><h2 className='topBar__h2'>Książka Serwisowa</h2><button className='topBar__button' onClick={() => { Auth.logout(this.logoutCb) }}>Wyloguj</button></header>
                {mainElement}
                <footer className='footer'>
                    Kontakt: email@ex.com | © 2020
                </footer>
            </div>
        )
    }
}

export default Logged