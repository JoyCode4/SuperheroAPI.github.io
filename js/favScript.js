const favContainer = document.querySelector(".all-fav");
const clearAll = document.querySelector("#clear-all-link");

// console.log(localStorage.getItem(0));

for(let i=0;i<localStorage.length;i++){
    // console.log(localStorage.getItem(i));
    let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
    // console.log(data);

    let div=document.createElement("div");
    div.setAttribute("class","favourite-container");
    div.innerHTML=`
        <img src="${data.heroImg}" alt="${data.heroName}">
        <div class="data">
            <h2>${data.heroName}</h2>
            <a href="./favourites.html" class="deletion" value="${data.heroName}"><i class="fas fa-trash"></i></a>
        </div>`

    favContainer.appendChild(div);

}

let allFav = document.querySelectorAll(".deletion");
for(let i of allFav){
    i.setAttribute("onclick","destroy(this)");
}

function destroy(element){
    let key = element.getAttribute("value");
    localStorage.removeItem(key);
    alert(`${key} is removed from your favourites !`);
}

clearAll.addEventListener("click",clear);
function clear(){
    localStorage.clear();
    alert("All the favourites are clear and removed !")
}

