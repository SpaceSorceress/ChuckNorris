function initiateStorage(){
    if(!localStorage.favourites){
        let favourites=[];
    localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    renderFavs();
}

initiateStorage();

function addToStorage(joke){
    let favourites=JSON.parse(localStorage.getItem("favourites"));
    if(favourites.indexOf(joke)===-1){
        favourites.push(joke);
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
    renderFavs();
}

function removeFromStorage(joke){
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    favourites = favourites.filter(element=>{
        return element.id!==joke.id
    });
localStorage.setItem("favourites", JSON.stringify(favourites));
  renderFavs();
}

function renderFavs(){
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    favourites.forEach( joke=>{
        appendToFavs(renderOneJoke(joke))
    })
}

