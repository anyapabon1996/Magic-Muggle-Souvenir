
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


let close = document.getElementsByClassName('my-close')[0]; 
let modal = document.querySelectorAll('.my-modal')[0];
let modalContainer = document.getElementsByClassName('my-modal-container')[0]; 

$('#btn-comprar').click((event)=> {
    //cantidad seleccionada por el cliente 
    let quantityToBuy = parseInt($('#the-quantity').val()); 
    
    if (quantityToBuy>0){

        //si es cierto que es falso q no cargo dinero, O que la cantidad cargada es menor al costo del producto
        if(!flag || cash<theProduct.price) {
            
            //con esto le digo que active la opacidad y ponga visible el tono oscuro de fondo
            $('.my-modal-container').css('opacity', '1')
                                    .css('visibility', 'visible');
            
            modal.classList.toggle('my-modal-close');
        }
    }
    else alert('Ingrese cantidad a comprar');
});

$('.my-close').click(()=> {
    //le dice que ejecuta la acción contraria de la que se encuentre. o sea, de show a hide y viceversa
    modal.classList.toggle('my-modal-close');

    //Esta de acá, es una función de JS que controla el tiempo en el que algo se va a ir de la pantalla 
    setTimeout(function(){
        //como regresamos a la la pagina sin el cartel, le quitamos la oscuridad de fondo 
        $('.my-modal-container').css('opacity', '0')
        .css('visibility', 'hidden');
    },850);
});

//METODO ESTRATEGICO PARA SABER A Q PARTE DEL HTML SE LE DA CLICK,
window.addEventListener('click', function(event){
    console.log(event.target);

    //si le da click fuera de la ventana modal, que se salga
    if(event.target == document.getElementsByClassName('my-modal-container')[0]) {

        //le dice que ejecuta la acción contraria de la que se encuentre. o sea, de show a hide y viceversa
        modal.classList.toggle('my-modal-close');

        //Esta de acá, es una función de JS que controla el tiempo en el que algo se va a ir de la pantalla 
        setTimeout(function(){

            //como regresamos a la la pagina sin el cartel, le quitamos la oscuridad de fondo 
            $('.my-modal-container').css('opacity', '0')
                                    .css('visibility', 'hidden');
        },850);
    }
})



