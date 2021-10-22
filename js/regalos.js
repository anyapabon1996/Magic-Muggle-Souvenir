let myStore = new potterProducts();

//agarro todos los productos de la tienda. 
myStore.addProducts(JSON.parse(localStorage.myProducts));

//imprimo las imagenes. 
myStore.showProducts('indumentaria');
myStore.showProducts('varita');
myStore.showProducts('estudiantil');


