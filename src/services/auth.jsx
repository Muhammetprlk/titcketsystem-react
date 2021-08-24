import { verifyToken } from '../api/apiurls';
import axios from 'axios';

export function VerifyToken() {
    const currentUser = JSON.parse(localStorage.getItem('authenticatedUser'))
    return new Promise((resolve, reject) => {
        if (currentUser) {
            // axios.post(verifyToken, { token: currentUser.token }).then(response => {
            //     resolve(true);
            // }).catch(function (error) {
            //     if (error.response) {
            //         if (error.response.status === 400) {
            //             localStorage.removeItem('token')
            //             localStorage.removeItem('profileURL');
            //             resolve(false);
            //         }
            //     }
            // });
            resolve(true);

        } else {
            resolve(false);
        }
    });
}
