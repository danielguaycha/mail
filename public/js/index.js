let categ=[];
if(!localStorage.getItem("user")){
    location.href ="index.html"
}

$("#avatar").html(`<b class="text-white mr-3">${localStorage.getItem("user")}</b>&nbsp;<img class="rounded-circle" src="files/${localStorage.getItem("user")}.jpg" alt="" width="40px" height="40px"/>`)

function logout(){
    localStorage.removeItem("user");
    location.href = "index.html"
}

function eliminar(id){
    if(!confirm("Realmente desea eliminar PERMANENTEMENTE el mensaje?"))
        return;
    axios.put(`/api/mail/destroy/${id}`).then( resp => {        
        location.reload();
    })
}

function noleido(id){
    axios.put(`/api/mail/readed/${id}`).then( resp => {
        
        location.reload();
    })
   
}

function papelera(id){
    axios.put(`/api/mail/delete/${id}/-1`).then( resp => {
        location.reload();
    })
}

function addCategory(){

    let category = window.prompt('Ingrese Categoría');
    if(!category)
        alert('Ingrese un nombre para categoria');
    axios.post('/api/mail/category', { name: category }).then( resp => {

        
        $('#categorias').append(`<li class="list-group-item"><a href="#">${category}</a></li>`);
        //let data = resp.data.categories;
        //if(!data) return;

        /*for(let i=0; i<data.length; i++){            
            $('#categorias').append(`<li class="list-group-item"><a href="#">${data[i].nombre}</a></li>`);
        }*/
    }).catch(err => {
        console.log(err);
    })

    

}


function listCategories(){
    axios.get('/api/mail/category').then( resp => {      
        let data = resp.data.categories;
        categ = resp.data.categories;
        if(!data) return;

        for(let i=0; i<data.length; i++){  
            if(data[i].nombre.trim().toLowerCase() === 'docentes')
                $('#categorias').append(`<li class="list-group-item"><a style="color: red;" href="categoria.html?c=${data[i].nombre}&id=${data[i].value}">${data[i].nombre}</a></li>`);
            else if(data[i].nombre.trim().toLowerCase() === 'estudiantes')
                $('#categorias').append(`<li class="list-group-item"><a style="color: blue;" href="categoria.html?c=${data[i].nombre}&id=${data[i].value}">${data[i].nombre}</a></li>`);
            else          
                $('#categorias').append(`<li class="list-group-item"><a href="categoria.html?c=${data[i].nombre}&id=${data[i].value}">${data[i].nombre}</a></li>`);
        }
    }).catch(err => {
        console.log(err);
    })
}

function move(id, estado){
    axios.put(`/api/mail/delete/${id}/${estado}`).then( resp => {
        //alert(id, estado);
        location.reload();  
    })
}


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
listCategories();