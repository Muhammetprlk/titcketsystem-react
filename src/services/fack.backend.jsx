
import { verifyToken } from '../api/apiurls';
import axios from 'axios';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                localStorage.removeItem('token')
                localStorage.removeItem('profileURL');
            }
        }
        return data;
    });
}

export function Auth() {
    const currentUser = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
        if (currentUser) {
            axios.post(verifyToken, { token: currentUser }).then(response => {
                resolve(true);
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        localStorage.removeItem('token')
                        localStorage.removeItem('profileURL');
                        resolve(false);
                    }
                }
            });
        } else {
            resolve(false);
        }
    });
}