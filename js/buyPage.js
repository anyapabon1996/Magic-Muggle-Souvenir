//variables auxiliar para determinar si no tiene nada de dinero. 
let flag = false

let miCarro = new car(); 

//METODO DE ENVIO POR DEFAULT 
var sendMethod = 'Mago';

//TOTAL A PAGAR POR DEFAULT 
var totalToPay = 0; 

//agarro lo que hay en el local
miCarro.addFromLocal(); 


//ordeno mi array de carrito por categoria 
miCarro.carrito.sort(function(a,b){
    if (a.category < b.category) {
        return 1;
    }
    else if (a.category > b.category){
        return -1;
    }
    else return 0; 
});

//muestro lo que el usuario ha agregado al carrito comprar
showCarCards();

//recupero el dinero que tenga el usuario 
if (localStorage.getItem('myMoney') != null) {
    //recupero el objeto dinero del local 
    let cashAuxiliar = JSON.parse(localStorage.getItem('myMoney'));

    //con este dinero es q trabajará el cliente. 
    var cash = cashAuxiliar.total*182; 
    flag = true; 
}

botones();

// //para cuando presiona el botón comprar 
toBuy(miCarro);








