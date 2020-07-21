let string="Oh, shit, it's your";
if(string.length>2 && string.length<121){
    let encoded=encodeURIComponent(string);
    console.log(encoded)
}else{
    console.log("wrong format");
}