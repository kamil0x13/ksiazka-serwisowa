import React, { Component } from 'react'

import Equipment from '../functions/equipment'

class Adding extends Component {
    state = {
        name: null,
        fields: [],
        loading: false,
        error: null,
    }

    handlerAdding = (e) => {
        e.preventDefault()
    Equipment.create(this.state.name, this.state.fields, this.createCb)
        this.setState({ loading: <h3>Przetwarzanie...</h3> })
    }

    createCb = (e) => {
        if (!e) {
            this.props.setStateHandler({ adding: false })
        } else {
            this.setState({ loading: null, error: 'Ups... coś poszło nie tak!' })
        }
    }

    render() {
        console.log(this.state)
        return (
            <main className='adding'>
                <header className='adding__title'>
                    <h3 className='adding__titleText'>Dodawanie nowego sprzętu</h3>
                </header>
                <button className='adding__canelButton' onClick={() => { this.props.setStateHandler({ adding: false }) }}>Anuluj</button>
                <form className='adding__form' onSubmit={(e) => { this.handlerAdding(e) }}>
                    <label className='adding__label' >Nazwa</label>
                    <input className='adding__input' type='text' onChange={(e) => { this.setState({ name: e.target.value }) }} required />
                    <h4 className='adding__fieldsTitle' >Rubryki na dane: </h4>
                    {this.state.fields ? this.state.fields.map((e, key) => {
                        return (<div className='adding__fieldsContainer' key={key}>
                            <label className='adding__label'>Nazwa rubruki: </label>
                            <input className='adding__input' type='text' onChange={(e) => { let fields = [...this.state.fields]; fields[key].name = e.target.value; this.setState({ fields }) }} required />
                            <label className='adding__label' >Dane: </label>
                            <textarea className='adding__textarea' placeholder='Wprowadź zawartość pola (opcjonalne)...' type='text' onChange={(e) => { let fields = [...this.state.fields]; fields[key].value = e.target.value; this.setState({ fields }) }} />
                            <button className='adding__deleteFieldButton' type="button" onClick={() => { let array = [...this.state.fields]; array.splice(key, 1); this.setState({ fields: array }) }}>Usuń rubrykę</button>
                        </div>)
                    }) : null}
                    <button className='adding__addFieldButton' type="button" onClick={() => { this.setState((prevState) => ({ fields: [...prevState.fields, { name: null, value: null }] })) }}>Dodaj rubrykę</button>
                    {this.state.loading}
                    {this.state.error}
                    <input className='adding__submit' type='submit' value='Utwórz' />
                </form>
            </main >
        )
    }
}

export default Adding