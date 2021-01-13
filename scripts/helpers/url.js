
function buildEncodedUri(request) {
    const response = [];
    for (let d in request)
        response.push(encodeURIComponent(d) + '=' + encodeURIComponent(request[d]));
    return response.join('&');
}
// unbuilds the URL parameters and returns an object
function unbuildEndodedUri(request) { 
    var urifragment = request.split("&"), data = {}, i, parts;
    //process each par
    for (i = 0; i < urifragment.length; i++) {
        parts = urifragment[i].split("=");
        if (parts.length < 2) {
            parts.push("");
            console.log(parts);
        }
        data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
    
    console.log("Returning from", arguments.callee.name, data);
    
    return data;    
}
//options with map
function encodeData(data) {
    return Object.keys(data).map(function (key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
} 


