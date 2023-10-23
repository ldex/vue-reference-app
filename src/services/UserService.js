import router from '@/router/'

const baseURL = import.meta.env.VITE_AUTH_SERVER_URL

export default {

  login(credentials) {
    const url = baseURL
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(credentials)
    };

    return fetch(url, options)
            .then(response => response.json())
            .catch(error => {
                console.error('API Error for login, ' + error)
                return Promise.reject(error)
            })
  },

  logout() {
    this.clearLocalStorage()
    router.push({ name: "home" })
  },

  isInLocalStorage() {
    return localStorage.getItem('auth_token') != null && localStorage.getItem('username') != null
  },

  saveToLocalStorage(auth_token, username) {
    localStorage.setItem('auth_token', JSON.stringify(auth_token))
    localStorage.setItem('username', JSON.stringify(username))
  },

  getFromLocalStorage() {
    let auth_token = JSON. parse(localStorage.getItem('auth_token'))
    let username = JSON. parse(localStorage.getItem('username'))

    return {
      auth_token,
      username
    }
  },

  clearLocalStorage() {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("username")
  }

}