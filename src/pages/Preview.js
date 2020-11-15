import React, { Component } from 'react'

import Equipment from '../functions/equipment'

class Previwe extends Component {


    state = {
        fetching: (<h3>Ładowanie</h3>),
        error: null,
        equipments: null,
        search: null,
    }

    componentDidMount = () => {
        Equipment.getAll(this.getAllCb)
    }

    getAllCb = (e) => {
        if (Array.isArray(e)) {
            this.setState({ fetching: null, equipments: e })
        } else {
            this.setState({ fetching: null, error: e })
        }
    }


    handleDelete = (id) => {
        let confirm = window.confirm('Napewno chcesz usunąć element ?')
        if (confirm) {
            Equipment.delete(id, (e) => {
                if (!e) {
                    window.location.reload(false)
                } else {
                    this.props.setStateHandler({ error: (<h3>Ups... Coś poszło nie tak!</h3>) })
                }
            })
        }
    }

    render() {
        const equipments = this.state.equipments ? this.state.equipments.filter((data)=>{
            if(this.state.search == null){
                return data
            }
            else if(data.name.toLowerCase().includes(this.state.search.toLowerCase())){
                return data
            }
            return null    
        }).map((e, key) => {
            return (
                <section className='preview__elementContainer' key={key}>
                    <h2 className='previwe__elementName'>
                        {e.name}
                    </h2>
                    {e.fields ? e.fields.map((f, fKey) => {
                        return (<aside className='preview__fieldContainer' key={fKey}>
                            <header className='preview__fieldName'>{f.name}</header>
                            <p className='preview__fieldValue'>{f.value}</p>
                        </aside>)
                    }) : null}
                    <div className='preview__elementButtonsConainer'>
                        <button className='preview__elementDeleteButton' onClick={() => { this.handleDelete(e._id) }}>Usuń</button>
                        <button className='preview__elementEditButton' onClick={() => { this.props.setStateHandler({ edit: e }) }}>Edytuj</button>
                    </div>
                </section>
            )
        }) 
        : 
        null
        return (
            <main className='preview'>
                <section className='preview__searchAndAdd'>
                    <input className='preview__searchInput' onChange={(e)=>{this.setState({search: e.target.value})}} autoComplete='off' placeholder='Wyszukiwarka'/>
                    <button className='preview__addButton' onClick={() => { this.props.setStateHandler({ adding: true }) }}>Dodaj nowy</button>
                </section>
                <section className='preview__content'>
                    {this.state.fetching}
                    {this.state.error}
                    {equipments}
                </section>
            </main>
        )
    }
}

export default Previwe