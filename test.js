let string="banana mama";
if(string.length>2 && string.length<121){
    let encoded=encodeURIComponent(string);
    console.log(encoded)
}else{
    console.log("wrong format");
}

let url = "https://api.chucknorris.io/jokes/w0rMhCuXR7GJO7Sn_Tsw1w";
console.log(url.slice(7));