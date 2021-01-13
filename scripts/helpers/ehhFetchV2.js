//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
data = {};
url = '';
request = {
     // Default options are marked with *
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
}

var gAuthRequestparams = {
    'client_id': '385607167966-u90ri3n5qkapcuq8gmhheg781qr7jbkp.apps.googleusercontent.com',
    'redirect_uri': 'https://bronzwikgk.github.io/ehh_Wip/',
    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
    'state': 'accessTokenRecived',
    'include_granted_scopes': 'true',
    'response_type': 'token'
};


function fetchHttpRequest(url, request) {
    fetch(url,request)
        .then(status)
        .then(json)
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            return data;
        }).catch(function (error) {
            console.log('Request failed', error);
        });
}

function status(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log(response.statusText);
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json()
}


