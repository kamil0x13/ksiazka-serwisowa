import React, { Component } from 'react'

import Auth from '../functions/auth'

class Login extends Component {

    state = {
        email: null,
        password: null,
        name: null,
        lastName: null,
        error: null,
        registratrion: false,
        loading: null,
    }

    handlerLogin = (e) => {
        e.preventDefault()
        Auth.login(this.state.email, this.state.password, this.loginCb)
        this.setState({ loading: <h3>Przetwarzanie...</h3> })
    }

    loginCb = (e) => {
        if (!e) {
            this.props.setStateHandler({ logged: true })
        } else if (e === 400) {
            this.setState({ error: <h3>Złe dane!</h3>, loading: null })
        } else {
            this.setState({ error: <h3>Problem z serwerem, zgłoś do admina.</h3>, loading: null })
        }
    }

    handlerRegister = (e) => {
        e.preventDefault()
        Auth.register(this.state.name, this.state.lastName, this.state.email, this.state.password, this.registerCb)
        this.setState({ loading: <h3>Przetwarzanie...</h3> })
    }

    registerCb = (e) => {
        if (!e) {
            this.props.setStateHandler({ logged: true })
        } else if (e === 11000) {
            this.setState({ error: <h3>Istnieje już konto na podanym emailu.</h3>, loading: null })
        } else if (e === 400) {
            this.setState({ error: <h3>Złe dane!</h3>, loading: null })
        } else {
            this.setState({ error: <h3>Problem z serwerem, zgłoś do admina.</h3>, loading: null })
        }
    }

    render() {
        if (this.state.registratrion) {
            return (
                <div className='page'>
                    <form className='regForm' onSubmit={(e) => { this.handlerRegister(e) }}>
                        <h2 className='regForm__title'>Rejestracja</h2>
                        <label className='regForm__label' htmlFor='nameInput'>Imię</label>
                        <input className='regForm__input' id='nameInput' type='text' onChange={(e) => { this.setState({ name: e.target.value }) }} autoComplete='given-name' required />
                        <label className='regForm__label' htmlFor='lastNameInput'>Nazwisko</label>
                        <input className='regForm__input' id='lastNameInput' type='text' onChange={(e) => { this.setState({ lastName: e.target.value }) }} autoComplete='family-name' required />
                        <label className='regForm__label' htmlFor='emailInput'>Email</label>
                        <input className='regForm__input' id='emailInput' type='text' onChange={(e) => { this.setState({ email: e.target.value }) }} autoComplete='email' required />
                        <label className='regForm__label' htmlFor='passwordInput'>Hasło</label>
                        <input className='regForm__input' id='passwordInput' type='password' onChange={(e) => { this.setState({ password: e.target.value }) }} autoComplete='new-password' required />
                        {this.state.loading}
                        {this.state.error}
                        <input className='regForm__submit' type='submit' value='Zarejestruj' />
                        <p className='regForm__p'>Masz już konto ?</p>
                        <button className='regForm__button' onClick={() => this.setState({ registratrion: false })} >Logowanie</button>
                    </form>
                    <footer className='footer'>
                        Kontakt: ksiazka-serwisowa@gmail.com | ©2020
                    </footer>
                </div>
            )
        }
        return (
            <div className='page'>
                <form className='loginForm' onSubmit={(e) => { this.handlerLogin(e) }}>
                    <h2 className='loginForm__title'>Logowanie</h2>
                    <label className='loginForm__label' htmlFor='emailInput'>Email</label>
                    <input className='loginForm__input' id='emailInput' type='text' onChange={(e) => { this.setState({ email: e.target.value }) }} autoComplete='email' required />
                    <label className='loginForm__label' htmlFor='passwordInput'>Hasło</label>
                    <input className='loginForm__input' id='passwordInput' type='password' onChange={(e) => { this.setState({ password: e.target.value }) }} autoComplete='current-password' required />
                    {this.state.loading}
                    {this.state.error}
                    <input className='loginForm__submit' type='submit' value='Zaloguj' />
                    <p className='loginForm__p'>Zarejestruj się za darmo.</p>
                    <button className='loginForm__button' onClick={() => this.setState({ registratrion: true })} >Rejestracja</button>
                </form>
                <footer className='footer'>
                    Kontakt: ksiazka-serwisowa@gmail.com | ©2020
                </footer>
            </div>
        )
    }

}

export default Login