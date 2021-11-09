//const cards = document.getElementById('cards-dinamicas');
//const templateCard = document.getElementById('template-card').content;

document.addEventListener("DOMContentLoaded", () =>{
    fetchData();
});
const fetchData = async (url = "https://rickandmortyapi.com/api/character") => {
   // console.log('obteniendo datos...');
   try{
    loadingData(true);

    const res = await fetch(url);
    const data = await res.json(); 
    //console.log(data);
    pintarCard(data) 
   } catch(error){

   }finally{
        loadingData(false);
   }
};

const pintarCard = (data) =>{ 
    const cards = document.getElementById('cards-dinamicas');
    cards.textContent = "";
    const templateCard = document.getElementById('template-card').content;
    const fragment = document.createDocumentFragment();

    //console.log(data);
    data.results.forEach((item) => {
        //console.log(item);
    const clone =  templateCard.cloneNode(true);
    clone.querySelector("h5").textContent = item.name;  
    clone.querySelector("p").textContent = item.species;  
    clone.querySelector(".card-img-top").setAttribute("src", item.image);  
    //guardamos en el fragment para evitar el reflow
    fragment.appendChild(clone)
    });

    cards.appendChild(fragment);

    pintarPaginacion(data.info);

};



const pintarPaginacion = (data) => {
    console.log(data);
    const paginacion = document.getElementById('paginacion');
    paginacion.textContent = "";
    const templatePaginacion = document.getElementById('template-paginacion').content;
    const clone = templatePaginacion.cloneNode(true);

   

    if (data.prev) {
        clone.querySelector(".btn-outline-secondary").disabled = false;
    } else{
        clone.querySelector(".btn-outline-secondary").disabled = true;
    }

    if (data.next) {
        clone.querySelector(".btn-outline-primary").disabled = false;
    } else{
        clone.querySelector(".btn-outline-primary").disabled = true;
    }

    paginacion.appendChild(clone);

    paginacion.addEventListener('click', e =>{
        if(e.target.matches(".btn-outline-primary")){
            console.log("click");
            fetchData(data.next);
        }
        if(e.target.matches(".btn-outline-secondary")){
            console.log("click");
            fetchData(data.prev);
        }
    })


};




//para k se vea al  spinner cargando de la pagina
const loadingData = (estado) =>{
    const loading = document.getElementById('loading');
    if(estado){
        loading.classList.remove('d-none');
    }else{
        loading.classList.add('d-none');
    }
    
    

};
