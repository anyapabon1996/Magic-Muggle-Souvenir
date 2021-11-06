//funcion de alerta de fuera de stock o negativa 
const alertStock = () => {
    Swal.fire({
        title: '<h3 class="alert-title">Error!</h3>',
        html: '<span class="alert-text"> Ha ingresado una cantidad menor que uno o fuera de stock </span>',
        icon: 'error',
        backdrop: true,
        showConfirmButton: true,
        // confirmButtonColor: 'rgba(202, 62, 28, 0.795)',//le dice el color de fondo del boton
        buttonsStyling: false,
        confirmButtonText: '<span class="alert-text style-button">Corregir</span>',
    }); 
}

//funcion para añadir o modificar cammbios al carrito
const alertAddorModifyStock = (titulo, tipo) => {
    Swal.fire({
        title: `<h3 class="alert-title">${titulo}</h3>`, //titulo de la alerta
        html: `<span class="alert-text">${tipo}</span>`, // cuerpo o descripcion, podriamos usar text en vez de html, pero no la podríamos editar
        icon: 'success', //tipo de icono 
        backdrop: true, //que el fondo se oscurezca al salir     
        timer: 2000, // tiempo de duracion de la alerta   
        showConfirmButton: false, //para que no me muestre el botón  
    }); 
}

//////////////////////////////////DESCRIPTION/////////////////////////////////

//Funcion Para agregar al carrito
function quantityFromForm(event){
    event.preventDefault(); 

    let formulario = event.target;

    let myQuantity = (parseInt(formulario.children[0].value));

    miCarro.addCar(theProduct.id, myQuantity);

    //reseteo el fomrulario. 
    document.getElementById('formulario1').reset(); 
}

//Función que agarra el dato a agregar al carrito. 
const activeAddToCar = () => {
    document.getElementById('formulario1').addEventListener('submit', quantityFromForm);
}




//Función para agregar a favoritos.
const activeToAddToFavorites = () => {
    $('#btn-favoritos').click(() => {
    
        miCarro.addFavorites(theProduct.id);
    
    });
}

//Función para regresa a la tienda
const goBack = () => {
    document.getElementById('btn-regrear').onclick = () => {
        location.href = "regalos.html";
    }
} 


/////////////////////////////////////////CAMBIO MONETARIO////////////////////////////////////

//valores equivalentes 
const galeonDolarValue = 25;
const sickleDolarValue = 1.5; 
const knutDolarValue = 0.05; 
const pesosValue = 182;
const euroValue = 0.83;

//esta función me convierte los valores a dólares. 
function converter(gold, silver, bronze){
    let goldGaleon =  gold*galeonDolarValue;
    let silverSickle = silver*sickleDolarValue;
    let bronzeKnut = bronze*knutDolarValue;

    //Decido guardar cada valor y no el total, por una cuestión de seguridad y preveer inconvenientes. 
    let myMoney = {galeonEquivalente: goldGaleon, sickleEquivalente: silverSickle, knutEquivalente: bronzeKnut, total: goldGaleon+silverSickle+bronzeKnut};
    return myMoney; 
}

const activeToConvert = () => {
    $('#money-form').submit((event) => {
        event.preventDefault(); 
        let galeon = ($('#sending-galeon').val() > 0) ? $('#sending-galeon').val() : 0; 
        let sickle = ($('#sending-sickle').val()) > 0 ? $('#sending-sickle').val() : 0;
        let knut = ($('#sending-knut').val() > 0) ? $('#sending-knut').val() : 0; 
        let cash = 0; 

        (knut==0 || sickle==0 || knut==0) ? console.log('todo valor negativo o 0 será tomado como 0') : console.log('todo ok');
    
        if ((galeon>=0 && sickle>=0 && knut>0) || (galeon>0 && sickle>=0 && knut>=0) || (galeon>=0 && sickle>0 && knut>=0)) {
            cash = converter(galeon, sickle, knut) 
        }
        else {
            Swal.fire({
                title: '<h3 class="alert-title">Error!</h3>',
                html: '<span class="alert-text"> Ha ingresado valores incorrectos </span>',
                icon: 'error',
                backdrop: true,
                showConfirmButton: true,
                buttonsStyling: false,
                confirmButtonText: '<span class="alert-text style-button">Corregir</span>',
            }); 
        }

        //guardo esta cantidad en el local
        localStorage.myMoney = JSON.stringify(cash);  

        if (cash.total>0) {

            document.getElementById('value-galeones1').innerHTML = ('$'+(cash.galeonEquivalente * pesosValue));
            document.getElementById('value-galeones2').innerHTML = 'US$'+cash.galeonEquivalente; 
            document.getElementById('value-galeones3').innerHTML = ('€'+parseInt(cash.galeonEquivalente * euroValue));

            document.getElementById('value-sickle1').innerHTML = '$'+cash.sickleEquivalente * pesosValue; 
            document.getElementById('value-sickle2').innerHTML = ('US$'+ cash.sickleEquivalente); 
            $('#value-sickle3').html('€'+parseInt(`${cash.sickleEquivalente}` * euroValue)); //forma de hacerlo con JQUERY 

            document.getElementById('value-knut1').innerHTML = ('$'+(cash.knutEquivalente * pesosValue).toFixed(2));
            document.getElementById('value-knut2').innerHTML = ('US$'+(cash.knutEquivalente).toFixed(2));
            document.getElementById('value-knut3').innerHTML = ('€'+(cash.knutEquivalente * euroValue).toFixed(2)); 
            
            $('.final-paragraph').html('$'+((cash.sickleEquivalente * pesosValue) + (cash.galeonEquivalente * pesosValue) + (cash.knutEquivalente * pesosValue)).toFixed(2));

            /*edito la forma de estas p*/ 
            $('.result-paragraph').css('width', '13rem')
                                  .css('border', 'double')
                                  .css('text-align', 'center')
                                  .css('height', '5vh')
                                  .css('display', 'flex')
                                  .css('justify-content', 'center')
                                  .css('align-items', 'center')
                                  .css('font-size', '1.5rem');

            
            $('.sickle-paragraph').css('border-color', 'rgba(192, 192, 192, 0.74)'); 
            $('.knut-paragraph').css('border-color', 'rgba(185, 105, 105, 0.836)');
            $('.galeon-paragraph').css('border-color', 'rgba(255, 217, 0, 0.39)');
            
            $('#subtitle-results').css('text-align', 'center')
                                  .css('margin-top', '4rem')
                                  .show(5000);

            $('.fondo').show(5000);
            
            $('.final-paragraph').css('margin', ' 2rem auto')
                                 .delay(2000)
                                 .hide()
                                 .toggle(3000);      


            $('.results').slideDown(5000);
        
                                 
        }
      
    }); 

    
}

/////////////////////////   BUYPAGE/    //////////////////////////////////////////////////////////////////
const sumador = () =>{
    let total1 = 0; 
        miCarro.carrito.forEach(element => {
            total1 += element.newQuantity*element.price; 
        });
    return total1; 
}

//funcion para agarrar el click de eliminar del carrito 
const deleteElement = (event) =>{
    console.log(event.target);
    let id = event.target.getAttribute('data-index');
   
    miCarro.deleteFromCar(id); 
    // console.log(miCarro.carrito);

    showCarCards(); 
}


//este pedazo de la funcion lo que hace es captar los caambios en las cantidades 
const upDate = () => {
    Array.from(document.getElementsByClassName('my-quantity-input')).forEach(element => {
        element.addEventListener('change', function(event){

            //tomo el id del objeto disparador, que será como un index
            let actualId = event.target.getAttribute('data-id');

            //tomo el nuevo valor en cantidad
            let valor = parseInt(element.value);

            //tomo el precio de ese objeto 
            let valor2 =parseInt(document.getElementsByClassName('precio')[actualId].getAttribute('data-price')); //  miCarro.carrito[actualId].price;

            if (valor>miCarro.carrito[actualId].stock){
                
                alertStock();
                
                console.log(document.getElementsByClassName('my-quantity-input')[actualId]);

                //le agrego este valor como por default 
                element.value = 1;

            }
            else if (valor<=0){
                alertStock();

                //le agrego este valor como por default 
                element.value = 1;
            }
            else {
                //actualizo mi carrito. 
                miCarro.carrito[actualId].newQuantity = valor; 
                            
                localStorage.clientCar = JSON.stringify(miCarro.carrito); 

                //imprimimos en pantalla el nuevo valor del precio 
                document.getElementsByClassName('variable')[actualId].innerHTML = valor2*valor;

                let total = sumador(); 
                
                //imrpimo en pantalla el total 
                document.getElementById('total').innerHTML = '$'+total;
            }
           
        }); 
    });
}

//función para mostrar lo que tiene el carrito, y editar en pantalla algunos cambios. 
function showCarCards(){
    //esto lo hago como para setear en caso de que elimine productos, y no me agregue uno encima de otros
    $('#my-products-in-car').html('');

    miCarro.carrito.forEach((element,index) => {
        $('#my-products-in-car').append(`<tr>
        <th scope="row"> <button data-index='${element.id}'onclick="deleteElement(event)">X</button></th>
        <td><img src="${element.src}" width="50px" height="50px"></td>
        <td class="cantidad">${element.title}</td>
        <td class="precio" data-price="${element.price}">$${element.price}</td>
        <td><input type="number" class="my-quantity-input" data-id="${index}"></td>
        <td><p class="variable">$${element.price*element.newQuantity}</p></td>
        </tr>`
        );
        
        //le pasamos de manera dinámica la cantidad 
        document.getElementsByClassName('my-quantity-input')[index].value = element.newQuantity; 
    });


    //aqui va el total 
    $('#my-products-in-car').append(`<tr>
    <th scope="row"></th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td id="total">Total</td>`); 

    let totalInicial = sumador(); 

    //imprimo en pantalla el total 
    document.getElementById('total').innerHTML = '$'+totalInicial; 
    
    //actualiza si cambia la cantidad 
    upDate(); 

}


//FUNCION AL OPRIMIR EL BOTON COMPRAR
//funcion que controla el fondo 
const bgReaction = (valueOpacity, valueVisibility) => {
    $('.my-modal-container').css('opacity', `${valueOpacity}`)
                            .css('visibility', `${valueVisibility}`);
}

//función que saca del modal. 
const outModal = () => {
    const modal = document.getElementsByClassName('my-modal')[0];
    //le dice que ejecuta la acción contraria de la que se encuentre. o sea, de show a hide y viceversa
    modal.classList.toggle('my-modal-close');
  
    //Esta de acá, es una función de JS que controla el tiempo en el que algo se va a ir de la pantalla 
    setTimeout(function(){
        //como regresamos a la la pagina sin el cartel, le quitamos la oscuridad de fondo 
        bgReaction('0','hidden');
  
    },850);
}

//FUNCION QUE TOMA EL MODO DE ENVÍO
function botones(){ 
    Array.from(document.getElementsByClassName('form-check-input')).forEach(element => {
        element.addEventListener('click', (event) => {
            sendMethod = (element.value == 'option1') ? 'Buho' : (element.value == 'option2') ? 'Red Flu' : 'Mago'; 
        }); 
    }); 
   
}


//vital declarar esta funciòn de esta manera. Es otra forma de Array.from(document.getelemenbyclassname())[0]
const toBuy = (arrayCarrito) => {

    var goOn =0; 

    // const modal = document.querySelectorAll('.my-modal')[0];
    const modal = document.getElementsByClassName('my-modal')[0];

    $('#btn-comprar').click((event)=> {

        //total final a pagar 
        totalToPay = sumador();

         goOn =0; 
        //cantidad seleccionada por el cliente 
        Array.from(document.getElementsByClassName('my-quantity-input')).forEach((element,index) => { 
            goOn += (element.value>0 && element.value<arrayCarrito.carrito[index].stock) ? 1 : 0; 
        
        }); 

        console.log(goOn);
        // console.log( arrayCarrito.carrito.length);

        if (goOn == arrayCarrito.carrito.length){

            
                //si es cierto que es falso q no cargo dinero, O que la cantidad cargada es menor al costo del producto
                if(!flag || cash<totalToPay) {
                
                    //con esto le digo que active la opacidad y ponga visible el tono oscuro de fondo
                    bgReaction('1','visible');
                    
                    //con esta saco el popup
                    // $('.my-modal-close').show(); → ¿POR QUÉ ESTO ASÍ NO FUNCIONA?
                    modal.classList.toggle('my-modal-close');
                }

                else if (totalToPay<=0) {
                    Swal.fire({
                        title: '<h3 class="alert-title">No tiene nada!</h3>', //titulo de la alerta
                        html: '<span class="alert-text">Seleccione algún producto para comprar en la tienda</span>', // cuerpo o descripcion, podriamos usar text en vez de html, pero no la podríamos editar
                        icon: 'warning', //tipo de icono 
                        backdrop: true, //que el fondo se oscurezca al salir     
                        timer: 2000, // tiempo de duracion de la alerta   
                        showConfirmButton: false, //para que no me muestre el botón  
                    });               
                }

                //si todo va bien, entonces solo debe pagar. 
                else {
                    //actualizo el nuevo array de carrito, en caso de que el usuario haya hecho lguna modificacion 
                    Array.from(document.getElementsByClassName('my-quantity-input')).forEach((element,index) => {  
                        let valor = parseInt(element.value); 
                        arrayCarrito.carrito[index].newQuantity=valor; 
                    });

                    //recupero todos los productos cargados en el storage 
                    let downsStock = JSON.parse(localStorage.getItem('myProducts'));

                    //me re-creo la tienda 
                    let magicMuggleSouvenir = new potterProducts(); 

                    //le paso todos los productos actuales en el storage
                    magicMuggleSouvenir.addProducts(downsStock); 

                    //bajo de stock todo lo que el cliente ha comprado 
                    arrayCarrito.carrito.forEach(element => {
                        magicMuggleSouvenir.controlStock(element.id, element.newQuantity); 
                    }); 

                    //recupero el valor del cupon que ha ingresado, quitando los espacios en blanco laterales 
                    let myCoupon = (document.getElementById('cupon').value).trim(); 

                    //tomo el metodo de envio 
                    botones();
                    
                    magicMuggleSouvenir.toPay(myCoupon, sendMethod, totalToPay, cash); 


                    //borro todo de mi carrito. Me parece que pude haber usado miCarro en vez de arrayCarrito 
                    miCarro.emptyCar(); 

                    //hago esto para vaciar la ventana. Probé con la función de showcards, y aunque funciona, tendría que recargar la página yo. 
                    $('#my-products-in-car').html('');

                    alertAddorModifyStock('Compra Éxitosa', 'Hemos Registrado su Compra! Gracias por preferirnos'); 

                }
        }   
    });

    $('.my-close').click(()=> {
        outModal(); 
    });


    //METODO ESTRATEGICO PARA SABER A Q PARTE DEL HTML SE LE DA CLICK,
    window.addEventListener('click', function(event){

        //si le da click fuera de la ventana modal, que se salga
        if(event.target == document.getElementsByClassName('my-modal-container')[0]) {
            outModal(); 
        }
    })

}

