const randomSeach = document.getElementById("randomSearch");
const categories = document.getElementById("categoriesSearch");
const categoriesVariants = document.querySelector("#categoriesAvailable");
const textSearch = document.getElementById("textSearch");

function renderJokes(joke){
    if(joke instanceof Object){
        console.log(joke);
        renderOneJoke(joke);
    }else{
        console.log("array of jokes");
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

const listHeader = document.querySelector("#jokeResults");
listHeader.insertAdjacentElement("afterend",outerDiv);
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
    console.log(text);
  }
}

async function fetching(path1, path2){
  try {
    const response = await fetch(`${path1}${path2}`);
    if (response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      let type=jsonResponse.categories;
      console.log(type);
      if(type.length===0){
        type = "Random";
      }else{
        type = type[0];
        type = type.charAt(0).toUpperCase() + type.slice(1);
      }
      const joke = {
        type: type,
        id: `"${jsonResponse.id}"`,
        url: jsonResponse.url,
        text: `"${jsonResponse.value}"`,
      };
      //console.log(joke);
      return joke;
    }
  } catch (error) {
    console.log(error);
  }
}