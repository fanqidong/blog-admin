import fetch from '../plugins/fetch'
export const adminLogin = (username, password) => fetch('/admin/login', {
    username,
    password
}, 'POST');