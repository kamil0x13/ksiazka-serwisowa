import React, { Component } from 'react'

import Equipment from '../functions/equipment'


class Edit extends Component {

    state = {
        equipmentName: this.props.equipment.name,
        equipmentFields: this.props.equipment.fields,
        error: null,
    }

    handlerEdit = (e) => {
        e.preventDefault()
        Equipment.update({ equipmentId: this.props.equipment._id, name: this.state.equipmentName, fields: this.state.equipmentFields }, this.saveCb)
        this.setState({ loading: <h3>Przetwarzanie...</h3> })
    }

    saveCb = (e) => {
        if (!e) {
            this.props.setStateHandler({ edit: false })
        } else {
            this.setState({ loading: null, error: 'Ups... coś poszło nie tak!' })
        }
    }

    render() {
        const fields = this.state.equipmentFields ? this.state.equipmentFields.map((f, fKey) => {
            return (<span className='edit__fieldsContainer' key={fKey}>
                <label className='edit__label'>Nazwa rubryki</label>
                <input className='edit__input' type='text' value={f.name} onChange={(e) => { let fields = [...this.state.equipmentFields]; fields[fKey].name = e.target.value; this.setState({ equipmentFields: fields }) }} required />
                <label className='edit__label' >Dane rubryki</label>
                <textarea className='edit__textarea' value={f.value} onChange={(e) => { let fields = [...this.state.equipmentFields]; fields[fKey].value = e.target.value; this.setState({ equipmentFields: fields }) }} />
                <button className='adding__deleteFieldButton' type="button" onClick={() => { let fields = [...this.state.equipmentFields]; fields.splice(fKey, 1); this.setState({ equipmentFields: fields }) }}>Usuń rubrykę</button>
            </span>)
        }) : null
        return (
            <main className='edit'>
                <header className='edit__titleContainer'>
                    <h3 className='edit__titleText'>
                        Edytowanie: {this.state.equipmentName}
                        <button className='edit__canelButton' onClick={() => { this.props.setStateHandler({ edit: false }) }}>Anuluj</button>
                    </h3>
                </header>
                <form className='edit__form' onSubmit={(e) => { this.handlerEdit(e) }} >
                    <label className='edit__label'>Nazwa</label>
                    <input className='edit__input' type='text' value={this.state.equipmentName} onChange={(e) => { this.setState({ equipmentName: e.target.value }) }} />
                    {fields}
                    <button className='edit__addFieldButton' type="button" onClick={() => { this.setState((prevState) => ({ equipmentFields: [...prevState.equipmentFields, { name: '', value: '' }] })) }}>Dodaj rubrykę</button>
                    <input className='edit__submit' type='submit' value='Zapisz' />
                </form>
            </main>
        )
    }

}

export default Edit