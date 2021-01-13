//This function will generate the Token by using arguments(Array Type) - SheetId,GmailId
function encryptToken(arguments) {
  // Initialize the message with blank
  var message="";
  //this loop concat all the arguments 
  arguments.forEach(function(value,index){
    message += value+",";
  })
  
  // creating token using 64Encoding technique 
  const token = Utilities.base64Encode(message, Utilities.Charset.UTF_8);
  return token
}

//This function will decode the Token
function decryptToken(token) {
 // decode token using 64 decoder 
  const decoded = Utilities.base64Decode(token, Utilities.Charset.UTF_8);
  // convert that decode into string 
  const value = Utilities.newBlob(decoded).getDataAsString();
  // split that string and convert into an array 
  var values = value.split(",");
  
  return values;
}

// this funtion is for comparing the tokens
function compareTokens(arguments,token){
  //create new token using encrypt function
   var newToken = encryptToken(arguments)
    let flag = false;
  // compare new and old token 
   if(newToken === token)
     flag = true;
  // return the result in form of true and false
     return flag;
}

