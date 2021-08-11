import { Jwt_token } from '../data/config'

import { verifyToken } from '../api/apiurls';
import axios from 'axios';

export const configureFakeBackend = () => {
    let users = [{ email: 'test@gmail.com', password: 'test123', name: 'Muhammet' }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers['Authorization'] === `Bearer ${"true"}`;
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                // if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                //     const params = opts.body;
                //     const user = users.find(x => x.email === params.email && x.password === params.password);
                //     if (!user) return error('Username or password is incorrect');
                //     return ok(Jwt_token);
                // }

                // get users - secure
                // if (url.endsWith('/users') && opts.method === 'GET') {
                //     if (!isLoggedIn) return unauthorised();
                //     return ok(users);
                // }


                // if (url.endsWith('/users') && opts.method === 'GET') {
                //     if (!isLoggedIn) return unauthorised();
                // }


                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    console.log("unauthorised")
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {

                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}

// function verifyTokenFunc(token){
//     axios.post(verifyToken,{token:token}).then(response=>{
//         console.log(response.data);
//         if(response.data.token===null){
//             return false;
//         }
//     });
//     return true;
// }

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