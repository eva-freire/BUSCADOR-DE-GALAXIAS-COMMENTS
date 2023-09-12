/*
const BASEURL= 'https://images-api.nasa.gov/search?q=';

const contenedor = document.getElementById('contenedor');
const form = document.getElementById('form');

let jsonData;

function setBusqueda() {
    let busqueda = document.getElementById('inputBuscar').value ;
    localStorage.setItem('busqueda', busqueda);
}

form.addEventListener('submit',function(e){
    setBusqueda();
    let searchTerm = localStorage.getItem('busqueda');
    const url = `https://images-api.nasa.gov/search?q=${searchTerm}`;
    
        try {
            const response =  fetch(url);
            if(!response.ok){
                throw new Error('Error fetching')
            }
            jsonData =  response.json();
            const elementos = jsonData.collection.items;
        
            elementos.forEach(elemento=>{
                let content='';
                const metaData = elemento.data[0];
                const imageUrl = elemento.links[0].href;
                content += `
                <div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <img src="${imageUrl}" class="card-img-top" alt="${metaData.title}">
                        <div class="card-body">
                            <h5 class="card-title">${metaData.title}</h5>
                            <p class="card-text">${metaData.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Fecha: ${metaData.date_created}</small>
                    </div>
                    </div>
                </div>
                `
                contenedor.innerHTML = content;
            })
    
            } catch (error) {
            console.error('Error:', error);
        }
})

*/


const contenedor = document.getElementById('contenedor');
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const BASE_URL= 'https://images-api.nasa.gov/search?q=';
let cantidadFotos = 0;

btnBuscar.addEventListener('click',function(e){
    e.preventDefault();
    const url = BASE_URL + inputBuscar.value ;
    fetch(url)
    .then ((response)=>response.json())
    .then ((data)=>{
        const elementos = data.collection.items;
            let content='';
            let value = 0;
            elementos.forEach(elemento=>{
                cantidadFotos++;
                const metaData = elemento.data[0];
                const imageUrl = elemento.links[0].href;
                content += `
                <div>
                    <div class="info-container">
                        <img src="${imageUrl}" alt="${metaData.title}">
                        <div>
                            <h5>${metaData.title}</h5>
                            <p>${metaData.description}</p>
                        <div>
                        <small>Fecha: ${metaData.date_created}</small>
                    </div>
                    </div>
                    <div class="commentArea">
                    <h3>Comentarios:</h3>
                        <div id="comment${value}">
                        </div>
                    </div>
                </div>
                <textarea name="comentario" id="inputText${value}" cols="35" rows="5"></textarea>
                <button id="btnEnviar${value}">Enviar</button>
                `;
                value++;
                contenedor.innerHTML = content;
        })
        
        for (let i = 0; i < cantidadFotos; i++) {
            const btnEnviar = document.getElementById(`btnEnviar${i}`);
            const inputText = document.getElementById(`inputText${i}`);
            const comment = document.getElementById(`comment${i}`);
            
            btnEnviar.addEventListener('click',function(e){
                e.preventDefault();

                //Verifica si el contenido del campo de entrada está vacío o solo contiene espacios en blanco. En ambos casos, se muestra una alerta y no se envía el comentario al JSON
                if(inputText.value.trim()===''){
                    alert('Por favor, ingrese un comentario válido.');
                    return;
                }
                let contentComment = `<p>${inputText.value}</p>`;
                comment.innerHTML += contentComment;

                //llamada a funcion que pasa comentarios al JSON
                enviarComentarioAJSON(inputText.value);
                inputText.value ='';
            })
        }
    })
        .catch(error=> {console.error(error)});
});

function enviarComentarioAJSON(comentario){
    var datos ={
        "user": 'anon',
        "comment": comentario
    };
    
    //Usé esta URL porque es la que me permite usar el metodo POST en el fetch
    const commentURL = 'https://jsonplaceholder.typicode.com/comments';
    fetch(commentURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then ((res)=>{
        if(!res.ok){
            throw new Error ('Error fetching data');
        }
        return res.json();
    })
    .then((data) => {
        console.log('Comment Successful:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    
};




