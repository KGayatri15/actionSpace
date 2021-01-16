//https://developers.google.com/drive/api/v2/reference#Files

//var YOUR_CLIENT_ID = '385607167966-u90ri3n5qkapcuq8gmhheg781qr7jbkp.apps.googleusercontent.com';
//var YOUR_REDIRECT_URI = 'https://bronzwikgk.github.io/ehh_Wip/';
//Auth Response
//https://oauth2.example.com/callback#access_token=4/P7q7W91&token_type=Bearer&expires_in=3600
//Auth error response -
//https://oauth2.example.com/callback#error=access_denied
//https://www.oauth.com/oauth2-servers/single-page-apps/
//https://developer.byu.edu/docs/consume-api/use-api/oauth-20/oauth-20-javascript-sample-code
//https://advancedweb.hu/how-to-use-async-functions-with-gapi-the-google-drive-client-and-the-file-picker/
// https://bronzwikgk.github.io/ehh_Wip/
// #state = try_sample_request
//     & access_token=ya29.a0AfH6SMBGDaLCAc7Gee0rcPnuKweeUThNzAQyz7bq - A0gM141jOION9aXPo89PIDb7le1olhTUlff3bO2fiVJaHJn5iq3cfN - aj1WU3xC3Zzv8ZPnNNu6hPOzQDqRB0UyxJ5KqlTVDtb139fd2023kWrkPXQfedyUoCN9
//     & token_type=Bearer
//     & expires_in=3599
//         & scope=https://www.googleapis.com/auth/drive.metadata.readonly
//a

function testOAuth2() { 
    var params = {
        'client_id': '385607167966-u90ri3n5qkapcuq8gmhheg781qr7jbkp.apps.googleusercontent.com',
        'redirect_uri': 'https://bronzwikgk.github.io/ehh_Wip/',
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'state': 'accessTokenRecived',
        'include_granted_scopes': 'true',
        'response_type': 'token'
    };
    var uri = buildEncodedUri(params);
    //var url = 'https://accounts.google.com/o/oauth2/v2/auth?'; 
    var url = 'http://127.0.0.1:5500/index.html#'; 
    var service = url + uri;
    gotoService(service)   
}



var gServices = {

    'auth': {
        'url' :'https://accounts.google.com/o/oauth2/v2/auth?',
        'params':{
            'method':'get',
            'client_id': '385607167966-u90ri3n5qkapcuq8gmhheg781qr7jbkp.apps.googleusercontent.com',
            'redirect_uri': 'https://bronzwikgk.github.io/ehh_Wip/',
            'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
            'state': 'accessTokenRecived',
            'include_granted_scopes': 'true',
            'response_type': 'token'
        }
    },
    'sheets': {
        'baseUrl' :'https://sheets.googleapis.com/v4/spreadsheets',
        'params':{
            'method':'get', //create//batchUpdate
            'sheet_id': '385607167966-u90ri3n5qkapcuq8gmhheg781qr7jbkp.apps.googleusercontent.com',
            'access_token':'access_token'
        }
    },
}


function testOAuth() { 
    var params = {
        'client_id': '385607167966-u90ri3n5qkapcuq8gmhheg781qr7jbkp.apps.googleusercontent.com',
        'redirect_uri': 'https://bronzwikgk.github.io/ehh_Wip/',
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'state': 'accessTokenRecived',
        'include_granted_scopes': 'true',
        'response_type': 'token'
    };
    var uri = buildEncodedUri(params);
    var url = 'https://accounts.google.com/o/oauth2/v2/auth?'; 
    //var url = 'http://127.0.0.1:5500/index.html'; 
    var service = url + uri;
    gotoService(service)   
}


/*
       * Create form to request access token from Google's OAuth 2.0 server.
       */
function oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var url = 'https://accounts.google.com/o/oauth2/v2/auth'; //oauth2Endpoint
    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    //form.setAttribute('method', 'GET'); 
    form.setAttribute('action', url);
    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': '385607167966-u90ri3n5qkapcuq8gmhheg781qr7jbkp.apps.googleusercontent.com',
        'redirect_uri': 'https://bronzwikgk.github.io/ehh_Wip/',
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'state': 'accessTokenRecived',
        'include_granted_scopes': 'true',
        'response_type': 'token'
    };
    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}
