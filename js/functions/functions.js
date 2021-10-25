//función para llamar todos los productos. 
async function callProducts(){
    const answer = await fetch('../products.json');
    const data = await answer.json();
    return data; 
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


/////////////////////////////////////////CAMBIOMONETARIO////////////////////////////////////

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
    
        let cash = ((galeon>=0 && sickle>=0 && knut>0) || (galeon>0 && sickle>=0 && knut>=0) || (galeon>=0 && sickle>0 && knut>=0)) ? converter(galeon, sickle, knut) : alert('Ha ingresado valores incorrectos'); 

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
            
            $('.final-paragraph').css('margin', ' 2rem auto')
                                 .delay(2000)
                                 .hide()
                                 .toggle(3000);      


            $('.results').slideDown(5000);
        
                                 
        }
      
    }); 

    
}



/////////////////////////   BUYPAGE/    //////////////////////////////////////////////////////////////////

//este pedazo de la funcion lo que hace es captar los caambios en las cantidades 
const upDate = () => {
    Array.from(document.getElementsByClassName('my-quantity-input')).forEach(element => {
        element.addEventListener('change', function(event){

            //tomo el id del objeto disparador, que será como un index
            let actualId = event.target.getAttribute('data-id');

            //tomo el nuevo valor en cantidad
            let valor = parseInt(element.value);

            //tomo el precio de ese objeto 
            let valor2 =parseInt(document.getElementsByClassName('precio')[actualId].innerHTML); //  miCarro.carrito[actualId].price;
          
            //imprimimos en pantalla el nuevo valor 
            document.getElementsByClassName('variable')[actualId].innerHTML = valor2*valor; 
        }); 
    });
}

//función para mostrar lo que tiene el carrito, y editar en pantalla algunos cambios. 
function showCarCards(){
    miCarro.carrito.forEach((element,index) => {
        $('#my-products-in-car').append(`<tr>
        <th scope="row" class"btn-delete">X</th>
        <td><img src="${element.src}" width="50px" height="50px"></td>
        <td>${element.title}</td>
        <td class="precio">${element.price}</td>
        <td><input type="number" class="my-quantity-input" data-id="${index}"></td>
        <td><p class="variable">${element.price*element.newQuantity}</p></td>
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
    <td class="total">Total</td>`); 


    
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

//vita declarar esta funciòn de esta manera. Es otra forma de Array.from(document.getelemenbyclassname())[0]
const toBuy = (arrayCarrito) => {

    var goOn =0; 

    // const modal = document.querySelectorAll('.my-modal')[0];
    const modal = document.getElementsByClassName('my-modal')[0];

    $('#btn-comprar').click((event)=> {


        //cantidad seleccionada por el cliente 
        Array.from(document.getElementsByClassName('my-quantity-input')).forEach((element,index) => { 
            goOn += (element.value>0 && element.value<arrayCarrito.carrito[index].stock) ? 1 : 0; 
        
        }); 

        if (goOn == arrayCarrito.carrito.length){

            
                //si es cierto que es falso q no cargo dinero, O que la cantidad cargada es menor al costo del producto
                if(!flag || cash<100) {
                
                    //con esto le digo que active la opacidad y ponga visible el tono oscuro de fondo
                    bgReaction('1','visible');
                    
                    
                    //con esta saco el popup
                    // $('.my-modal-close').show(); → ¿POR QUÉ ESTO ASÍ NO FUNCIONA?
                    modal.classList.toggle('my-modal-close');
                }
                //si todo va bien, entonces solo debe pagar. 
                else {
                    //actualizo el nuevo array de carrito, en caso de que el usuario haya hecho lguna modificacion 
                    Array.from(document.getElementsByClassName('my-quantity-input')).forEach((element,index) => {  
                        let valor = parseInt(element.value); 
                        arrayCarrito.carrito[index].newQuantity=valor; 
                    });

                    let downsStock = JSON.parse(localStorage.getItem('myProducts'));
                    console.log(downsStock);
                }
        }
        else alert ('Ha ingresado una cantidad fuera de Stock, o negativa');
   
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

