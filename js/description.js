
//recupero el objeto que fue causante del click.
if (localStorage.getItem('objectClick') != null) {
    var theProduct = JSON.parse(localStorage.getItem('objectClick'));
    $('title').html(theProduct.title);
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

//para ver el carrito 
document.getElementById('btn-comprar').addEventListener('click', function() {
    location.href='buyPage.html'
})






