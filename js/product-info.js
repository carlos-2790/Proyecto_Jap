var product = {};
var coments="";
let arrays=[];
let infoHtml=" ";




function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}



function showRelatedProducts(array){
    let html=" ";

    for(let i =0; i<array.length; i++){
        let realted = array[i];

        html+=`
        <div  >
            <div class="d-block mb-4 h-100">
                <p>`+realted+'/'+`</p>
            </div>
        </div>
        `
       document.getElementById("relatedProducts").innerHTML=html;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("producSoldtCount");
            let productCategoryHTML = document.getElementById("productCategory");
            
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
           

            showRelatedProducts(product.relatedProducts);
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            
        }
    });
});

document.addEventListener("DOMContentLoaded", function(ex){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultado){
        if(resultado.status === "ok"){
            coments=resultado.data;
            for(let i=0; i<coments.length; i++){
           let com=coments[i];
           
            infoHtml +=`
            <strong> Puntuacion:  </strong> `+com.score +`<br>
            <strong> Descripcion: </strong>`+com.description +`<br>
            <strong> Usuario:     </strong> ` + com.user+`<br>
            <strong> Fecha:       </strong> `+ com.dateTime+`<br><br>

               `
               document.getElementById("contenedor-info").innerHTML=infoHtml;
            }
            
        }
        
    })


});

var d= new Date();
var dia=d.getDay();
dia=dia-1;
var mes= d.getMonth();
mes=mes+1;
var anio= d.getUTCFullYear();
var hora= d.getHours();
var min= d.getMinutes();
var seg= d.getSeconds();

 var stringFechas=` ` +dia+`-`+mes+`-`+anio +`  `+hora +`:`+min+`:`+seg+``;
 var fechas =document.getElementById("fechaHoy");
 fechas.innerHTML=stringFechas;
 var puntaje= document.getElementById("puntaje");
 var comentario= document.getElementById("comentario");
 var usuarioC= localStorage.getItem('usuario');

 



 function agregarComentario(){


    if(puntaje.value == null ||puntaje.value == ""){
    
       alert("Debe ingresar un valor en Puntaje...")
    }
   /*else if(puntaje.value !== /^[0-9]$/){
        alert("El valor ingresado en Puntaje debe ser numérico...")
    }*/
    else if( puntaje.value <1 || puntaje.value >5){
        alert("El puntaje debe estar entre 1 y 5 ")
    }
    else if(comentario.value == null || comentario.value == "" ){
        alert("Debe ingresar un comentario...")
    }else{


    
    infoHtml +=`
            <strong> Puntuacion:  </strong> `+puntaje.value +`<br>
            <strong> Descripcion: </strong>`+comentario.value +`<br>
            <strong> Usuario:     </strong> ` +usuarioC+`<br>
            <strong> Fecha:       </strong> `+stringFechas+`<br><br>

               `
               document.getElementById("contenedor-info").innerHTML=infoHtml;
               puntaje.value="";
               comentario.value="";
               
            }


 }
