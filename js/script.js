const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const heroContainer = document.querySelector("#hero-details");
const favBtn = document.querySelector("#favourite-btn");


console.log(heroContainer);
let allData;
inputBox.onkeyup=(e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    let data;
    const fetchAllSuperHero = async ()=>{
        let url=`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${userData}&ts=1&apikey=11f8ee92ab2afb940b96d6e367edd1c9&hash=3d7babb2a01911a1eea3657cdd3cc6f5`; //---> It is for particular name is search
        try{
            const res=await fetch(url);
            allData= await res.json();
            // console.log(allData.data.results);
            if(userData){
                emptyArray = allData.data.results.filter((data)=>{
                    // filtering the array value and user char to lowercase and return only those word/sentence which are starts with user entered word
                    return data.name.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                })
                emptyArray = emptyArray.map((data)=>{
                    return data = `<div class="list" value = "${data.id}">
                    <img src="${data.thumbnail.path}.${data.thumbnail.extension}" alt="${data.name}" width="100px" height="100px">
                    <h3>${data.name}</h3>
                </div>`;
                })
                // console.log(emptyArray);
                searchWrapper.classList.add("active");
                showSuggestion(emptyArray);
                let allList = suggBox.querySelectorAll(".list");
                for(let i of allList){
                    // console.log(i);
                    i.setAttribute("onclick","select(this)");
                }
            }else{
                searchWrapper.classList.remove("active");
            }
        }catch(err){
            console.log(err);
        }
    }
    fetchAllSuperHero();
    // console.log(suggestion);
}

function select(element){
    searchWrapper.classList.remove("active");
    inputBox.value=null;
    let data = element.getAttribute("value");
    heroContainer.classList.remove("display");
    // console.log(data);
    // console.log(allData.data.results);
    for(let i of allData.data.results){
        if(i.id==data){
            // console.log(i);
                heroContainer.innerHTML=`<div class="info">
                <img src="${i.thumbnail.path}.${i.thumbnail.extension}" alt="${i.name}">
                <div class="description">
                    <h1>${i.name}</h1>
                    <p>${i.description}</p>
                    
                    <button id="favourite-btn" onclick="favSave(this)" url="${i.thumbnail.path}.${i.thumbnail.extension}" hero="${i.name}" heroId="${i.id}" type="submit">Favourite <i class='fas fa-heart'></i></button>
                </div>
            </div>`
        }
    }
}

function showSuggestion(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = userValue;
    }
    else{
        listData = list.join("");
    }
    suggBox.innerHTML = listData;
}

function favSave(element){
    let img_url = element.getAttribute("url");
    let heroName = element.getAttribute("hero");
    let heroId=element.getAttribute("heroId");
    
    let obj = JSON.stringify({
        heroId:heroId,
        heroName:heroName,
        heroImg : img_url
    });
    localStorage.setItem(heroName,obj);
    alert(`${heroName} is added to your favourites !`);
};

