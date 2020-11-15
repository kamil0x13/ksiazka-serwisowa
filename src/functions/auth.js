import { API_URL } from '../config/SerwisAPI'

class Auth {

    login = async (email, password, cb) => {
        const options = {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }

        try {
            let res = await fetch(`${API_URL}/user/login`, options)

            if (res.status === 200) {
                res = await res.json()
                localStorage.setItem('authenticated', true)
                localStorage.setItem('userName', res.user.name)
                localStorage.setItem('userLastName', res.user.lastName)
                localStorage.setItem('token', res.token)
                cb()
            } else {
                cb(400)
            }
        } catch (e) {
            console.log(e)
            cb('Błąd serwera')
        }
    }

    register = async (name, lastName, email, password, cb) => {
        try {
            const res = await fetch(`${API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, lastName, email, password })
            })
            const result = await res.json()
            if (result.code && result.code === 11000) {
                cb(11000)
            } else if (res.status === 201) {
                localStorage.setItem('authenticated', true)
                localStorage.setItem('userName', result.user.name)
                localStorage.setItem('userLastName', result.user.lastName)
                localStorage.setItem('token', result.token)
                cb()
            } else {
                cb(400)
            }
        } catch {
            cb('Błąd serwera')
        }
    }

    logout = async (cb) => {
        try {
            await fetch(`${API_URL}/user/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            localStorage.removeItem('authenticated')
            localStorage.removeItem('userName')
            localStorage.removeItem('userLastName')
            localStorage.removeItem('token')
            cb()
        } catch {
            cb('Błąd serwera')
        }
    }

    isAuthenticated() {
        return localStorage.getItem('authenticated')
    }
}

export default new Auth()