// const body = `username=${username}&password=${password}`
// await fetch(`${apiClient}/auth/signin`, {
//   header: {
//     "Accept": "application/json, text/plain, */*",
//     "Content-Type": "application/x-www-form-urlencoded",
//     // "Access-Control-Allow-Origin": "*",
//     // "mode": "cors",
//     // "Access-Control-Allow-Credentials": "true",
//     // "Access-Control-Allow-Methods": "*",
//     // "Acces-Control-Request-Headers": "*",
//     // "Acces-Control-Request-Method": "*",
//   }, method: "POST"
//   , body: body
//   // }, method: "GET"
// }).then(response => {
//   let result = response;
//   console.log("response.jsonresponse.json", response)
// })
const axios = require("axios");

const apiClient = "http://176.58.105.174:3000";


const instance = axios.create({
    baseURL: "http://176.58.105.174:3000",
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials": "true",
    //   "Access-Control-Allow-Methods": "*",
    // },
    // withCredentials: true,
});

const data = instance
    .post(
        `${apiClient}/auth/signin`, {
        username: 'yoyoyoyo',
        password: 'Yoyoyoyo1'
    }
    )
    .then(function (response) {
        // handle success
        console.log(response);
        return response;
    }).catch(e => console.log);