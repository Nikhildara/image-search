const accessKey="XPSDfbyriP5-1Xil0HOuuXz5HCbgaCT0QpEvF7JGe08";

let formEl=document.getElementById("myform");
let inputEl=document.getElementById("inputSearch");
let searchResults=document.querySelector(".search_results");
let showMore=document.getElementById("showMore");
let loader=document.getElementById("loaderId");

let inputData=""
let page=1;

function displayImage(result){
    let searchresult=document.createElement("div");
    searchresult.classList.add("search_result");
    searchResults.appendChild(searchresult);
    let image=document.createElement("img");
    image.src=result.urls.small;
    searchresult.appendChild(image);
    let anchor=document.createElement("a");
    anchor.href=result.links.html;
    anchor.target="_blank";
    anchor.textContent=result.alt_description;
    searchresult.appendChild(anchor);
    
    page++
    if (page>1){
        showMore.style.display="block";
    }
}

async function searchImages(){
    inputData=inputEl.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    let response= await fetch(url);
    let data=await response.json();

    let results=data.results;
    
    loader.style.display="none";
    
    for (let i of results){
        
        displayImage(i);
    }
}

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    if (inputEl.value!==""){
        searchResults.innerHTML="";
        loader.style.display="block";
        searchImages();
    }
   
})
showMore.addEventListener("click",()=>{
    searchImages();
})