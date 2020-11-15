import { API_URL } from '../config/SerwisAPI'

class Equipment {
    create = async (name, fields, cb) => {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ name, fields })
        }
        try {
            const res = await fetch(`${API_URL}/equipment`, options)
            if (res.status === 201) {
                cb()
            } else {
                cb('Błąd serwera')
            }
        } catch (e) {
            cb('Błąd serwera')
        }
    }
    getAll = async (cb) => {
        const options = {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }
        try {
            const res = await fetch(`${API_URL}/equipment`, options)
            if (res.status === 200) {
                const result = await res.json()
                cb(result)
            } else {
                cb('Błąd serwera')
            }
        } catch (e) {
            cb('Błąd serwera')
        }

    }

    update = async (equipment, cb) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(equipment),
        }
        try {
            const res = await fetch(`${API_URL}/equipment`, options)
            if (res.status === 200) {
                cb()
            }
            else {
                cb('Błąd serwera')
            }
        } catch (e) {
            cb('Błąd serwera')
        }
    }

    delete = async (equipmentId, cb) => {
        const options = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ equipmentId }),
        }
        try {
            const res = await fetch(`${API_URL}/equipment`, options)
            if (res.status === 200) {
                cb()
            } else if (res.status === 404) {
                cb(404)
            } else {
                cb('Błąd serwera')
            }
        } catch (e) {
            cb('Błąd serwera')
        }
    }
}

export default new Equipment()