const pagewrap = document.querySelector(".hero__page-wrap");
// const temp = document.querySelector(".hero__template").content;
const nodeList = document.querySelector(".hero__user-list");
const fragment = document.createDocumentFragment();
const pagelist = document.querySelector(".hero__page-list");
const modalList = document.querySelector(".modal-body");




let page = 1
async function getUser(page) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
        const data = await response.json();
        console.log(data);
        const array = data.results;
        render(array,nodeList);
        renderPage(data?.info?.pages,pagelist);
        
        nodeList.addEventListener("click",evt => {
            if (evt.target.matches(".hero__btn")) {
                const findeitem = array.find(item => item.id == evt.target.dataset.id);
                
                document.querySelector(".modal__user-name").textContent = findeitem.name;
                document.querySelector(".modal__user-gender").textContent = findeitem.gender;
                document.querySelector(".modal__user-spacies").textContent = findeitem.species;
                document.querySelector(".modal__user-location").textContent = findeitem?.location?.name;
                document.querySelector(".modal__user-cerateday").textContent = findeitem.created.slice(0,10);
                document.querySelector(".modal__user-ceratetime").textContent = findeitem.created.slice(11,19);
                document.querySelector(".modal__user-live").textContent = findeitem.status;

            }
        })
    } catch (error) {
        console.log(error);
    }
}
getUser(page)
function render(arr,node) {
    node.innerHTML = "";
    arr.forEach(item => {
        const liElement = document.createElement("li");
        liElement.classList.add("hero__user-item");
        
        const spanElement = document.createElement("span");
        spanElement.classList.add(".hero__user-id");
        spanElement.textContent = item.id;
        
        const imgElement = document.createElement("img");
        imgElement.classList.add("hero__user-img");
        imgElement.src = item.image;
        imgElement.alt = item.name;
        
        const titleElement = document.createElement("h3");
        titleElement.classList.add("hero__user-name");
        titleElement.textContent = item.name;
        
        const btnWrap = document.createElement("div");
        btnWrap.classList.add("hero__user-innerdiv","d-flex","align-items-center","justify-content-center")
        const btnElement = document.createElement("button");
        btnElement.classList.add("btn","btn-success","hero__btn","align-self-center")
        btnElement.textContent = "more";
        btnElement.dataset.id = item.id;
        btnElement.setAttribute("data-bs-toggle","modal");
        btnElement.setAttribute("data-bs-target","#exampleModal");

        const locationElement = document.createElement("a");
        locationElement.textContent ="location";
        locationElement.classList.add("hero__user-location");

        locationElement.href = item.location.url;   
        locationElement.setAttribute("target","blank");   
        
        btnWrap.append(btnElement,locationElement)
        liElement.append(spanElement,imgElement,titleElement,btnWrap)
        
        fragment.appendChild(liElement) 
    });
    node.appendChild(fragment)
}



pagewrap.addEventListener("click",evt => {
    if (evt.target.matches(".hero__page-btn--prev")) {
        console.log("prev");
        if (page > 1) {
            --page;
            getUser(page);
        }
    }
    if (evt.target.matches(".hero__page-btn--next")) {
        console.log("next");
        ++page;
        getUser(page);
    }
    if (evt.target.matches(".hero__page-item")) {
        page = evt.target.textContent;
        console.log(page);
        getUser(page);
    }
})

function renderPage(count,node) {
    for (let index = 1; index < count+1; index++) {
        const liElement = document.createElement("li");
        liElement.classList.add("hero__page-item")
        liElement.textContent = index;
        fragment.appendChild(liElement)
    }
    node.appendChild(fragment)
}