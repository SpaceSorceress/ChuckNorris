//forms actions 
//const categories=document.getElementById('categoriesSearch');
categories.addEventListener('click', openCategories);

function openCategories(){
    const categoriesArea=document.getElementById("categories");
    if(categories.checked===true){
        categoriesArea.style.display="block";
        textArea.style.display = "none";
    }else{
        categoriesArea.style.display = "none";
    }
}

//const textSearch=document.getElementById('textSearch');
textSearch.addEventListener('click',openTextInput);

function openTextInput() {
  //const textArea= document.getElementById("textArea");
  if (textSearch.checked === true) {
    textArea.style.display = "block";
    const categoriesArea = document.getElementById("categories");
    categoriesArea.style.display = "none";
  } else {
    textInput.style.display = "none";
  }
}

//const randomSeach=document.getElementById("randomSearch");
randomSeach.addEventListener('click',hideOptions);

function hideOptions(){
    if(randomSeach.checked === true){
         const categoriesArea = document.getElementById("categories");
         categoriesArea.style.display = "none";
         //const textArea = document.getElementById("textArea");
         textArea.style.display = "none";
    }
}

const searchButton=document.querySelector('#searchButton');
searchButton.addEventListener('click', searchJokes);

