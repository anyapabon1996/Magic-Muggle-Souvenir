
//variables auxiliar para determinar si no tiene nada de dinero. 
let flag = false

//recupero el objeto que fue causante del click.
if (localStorage.getItem('objectClick') != null) {
    var theProduct = JSON.parse(localStorage.getItem('objectClick'));
    $('title').html(theProduct.title);
}

//recupero el dinero que tenga el usuario 
if (localStorage.getItem('myMoney') != null) {
    //recupero el objeto dinero del local 
    let cashAuxiliar = JSON.parse(localStorage.getItem('myMoney'));

    //con este dinero es q trabajará el cliente. 
    var cash = cashAuxiliar.total*182; 
    flag = true; 
}

document.getElementById('object-title').innerHTML = theProduct.title;//modifico el titulo 
document.getElementById('my-price').innerHTML = 'PRECIO: $' + theProduct.price; //MODIFICO EL PRECIO
document.getElementById('miDescripcion').innerHTML = theProduct.description1; //cambio la descripcion


$("#imagen-description").attr("src",`${theProduct.src}`); //método con JQUERY para cambiar la imagen. 
$('#imagen-description').attr("alt", `${theProduct.alt}`); //método con JQUERY para cambiar el alt. 

goBack();  //para regresar a la tienda

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//declaro mi carro. 
let miCarro = new car(); 

//paso todo lo que el usuario ha hecho en nuestra página. 
miCarro.addFromLocal();

//llamo a la función que se encarga de agregar productos al carro
activeAddToCar(); 

//para agregar a favoritos. 
activeToAddToFavorites(); 

//para cuando presiona el botón comprar 
toBuy(theProduct.stock);





