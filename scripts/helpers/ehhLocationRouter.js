//https://dev.to/pixari/build-a-very-basic-spa-javascript-router-2k4p
//https://willtaylor.blog/client-side-routing-in-vanilla-js/

function gotoService(service){
    window.location.href = service;
}

function onLocationChange(e) {

    ///  console.log("detetced location Change", document.location);
      if (document.location.hash) {
          //console.log("it's a hash Change", document.location.hash.substring(1));
          response = document.location.hash.substring(1);
      } else if (document.location.search) {
          //console.log("it's a search Change", document.location.search.substring(1));
          response = document.location.search.substring(1);
      } else { 
          console.log("no idea");
      }
      //console.log(response);
    if (response) { 
        var route = unbuildEndodedUri(response);
        conductRoute(route);
    }
      
      //console.log("token",route);

  
}

function conductRoute(route){
    console.log("route",route);
    
    if(route.state && route.expires_in && route.token_type){
      //  console.log("route",route.state,route.token_type);
            var url='https://www.googleapis.com/drive/v3/about?fields=user&';
        fetchHttpRequest(url,route);
    }


    var routeHref = window.location.href;
    
    const pathNameSplit = window.location.pathname.split('/');
    
   // console.log(pathNameSplit);
    
    const pathSegments = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    
  //  console.log(pathSegments);



}


