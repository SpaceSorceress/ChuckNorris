const randomSeach = document.getElementById("randomSearch");
const categories = document.getElementById("categoriesSearch");
const categoriesVariants = document.querySelector("#categoriesAvailable");
const textSearch = document.getElementById("textSearch");

function renderJokes(joke){
    if(joke instanceof Array){
        console.log("array of jokes");
        joke.forEach(joke=>{
          renderOneJoke(joke);
        })
    }else{
        console.log(joke);
        renderOneJoke(joke);
    }
}

function renderOneJoke(joke){
const outerDiv = document.createElement("div");
outerDiv.className= "card mt-4";
const inneerDiv = document.createElement("div");
inneerDiv.className = "card-body";
const header=document.createElement("h5");
header.className="card-title";
header.innerText=joke.type;
inneerDiv.appendChild(header);
const button= document.createElement("button");
const icon= document.createElement("i");
icon.className = "far fa-heart";
button.appendChild(icon);
button.addEventListener("click", saveToFavs);
inneerDiv.appendChild(button);
const id= document.createElement("h6");
id.className = "card-subtitle mb-2 text-muted";
id.innerText = `id: ${joke.id}`;
inneerDiv.appendChild(id);
const paragraph= document.createElement("p");
paragraph.className="card-text";
paragraph.innerText=joke.text;
paragraph.style.fontWeight=400;
paragraph.style.lineHeight=1.5;
inneerDiv.appendChild(paragraph);
const a=document.createElement("a");
const link = document.createTextNode("Link to joke");
//link.style.fontWeight=400;
a.style.fontWeight=400;
a.appendChild(link);
a.title="Access to Chuck Norris API to view joke";
a.href=joke.url;
a.className = "card-link";
a.setAttribute("target", "_blank");
inneerDiv.appendChild(a);
outerDiv.appendChild(inneerDiv);
outerDiv.style.fontSize="1rem";

appendToResults(outerDiv);
}

function saveToFavs(event){
  event.preventDefault();
  let icon = event.target;
  if (icon.className === "far fa-heart"){
    icon.className = "fas fa-heart";

  } else{
    icon.className = "far fa-heart";
  }
  
}

async function searchJokes() {
  event.preventDefault();
  const pathStart = `https://api.chucknorris.io/jokes/`;
  //first option-random search
  if (randomSeach.checked === true) {
    const pathEnd = `random`;
    const joke = await fetching(pathStart, pathEnd);
    renderJokes(joke);
  }
  //second option - search by category
  else if (categories.checked === true) {
    const selectedCategory = categoriesVariants.value;
    const pathEnd=`random?category=${selectedCategory}`;
    const joke=await fetching(pathStart, pathEnd);
    renderJokes(joke);
  }
  //third option - search by text input
  else if (textSearch.checked === true) {
    let text = textInput.value;
    text = encodeURIComponent(text);
    const pathEnd = `search?query=${text}`;
    let jokes = await fetching(pathStart, pathEnd, text);
    renderJokes(jokes);
  }
}

async function fetching(path1, path2, text){
  try {
    const response = await fetch(`${path1}${path2}`);
    if (response.ok) {
      let jsonResponse = await response.json();
      //console.log(jsonResponse);
      
      if(jsonResponse.categories){
          let type = jsonResponse.categories;
          console.log(type);
          if (type.length === 0) {
            type = "Random";
          } else {
            type = type[0];
            type = type.charAt(0).toUpperCase() + type.slice(1);
          }
          const joke = {
            type: type,
            id: `"${jsonResponse.id}"`,
            url: jsonResponse.url,
            text: `"${jsonResponse.value}"`,
          };
          
          return joke;

          //this option for text search with multiple or no result
      }else if(jsonResponse.total||jsonResponse.total === 0){
        if(jsonResponse.total === 0){
          showAlert();
        }else{
          jsonResponse=jsonResponse.result;
          
          let jokes = jsonResponse.map(joke=>({
            type: text,
            id: `"${joke["id"]}"`,
            url: joke["url"],
            text: `${joke["value"]}`
          }));
          return jokes;
        }
      }
      
    }
  } catch (error) {
    console.log(error);
  }
}

function appendToResults(element){
  const listHeader = document.querySelector("#jokeResults");
  listHeader.insertAdjacentElement("afterend", element);
}

function showAlert(){
  const div = document.createElement("div");
  div.className = "alert alert-warning alert-dismissible fade show";
  div.setAttribute("role", "alert");
  const strong = document.createElement("STRONG");
  const ouch = document.createTextNode("Ouch!");
  strong.appendChild(ouch);
  div.appendChild(strong);
  const info = document.createTextNode(
    `  You should try entering something else in order to find a joke. Try separate words in English first ;)`
  );
  div.appendChild(info);
  const button = document.createElement("button");
  button.className = "close";
  button.setAttribute("type", "button");
  button.setAttribute("data-dismiss", "alert");
  button.setAttribute("aria-label", "Close");
  const span = document.createElement("span");
  span.setAttribute("aria-hidden", "true");
  //const text = document.createTextNode("Dismiss");
  //span.appendChild(text);
  const icon = document.createElement("i");
  icon.className = "fa fa-times-circle";
  span.appendChild(icon);
  button.appendChild(span);
  div.appendChild(button);
  appendToResults(div);
}