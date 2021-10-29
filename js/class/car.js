class car {
    constructor() {
        this.carrito = [];
        this.favorites = [];
        this.products = []; 
    }

    addFromLocal(){
        if(localStorage.myProducts != null) {
            this.products = this.products.concat(JSON.parse(localStorage.myProducts)); 
        }

        if(localStorage.clientFavorites != null) {
            this.favorites =  this.favorites.concat(JSON.parse(localStorage.clientFavorites));}
    

        if(localStorage.clientCar != null) {
            this.carrito =  this.carrito.concat(JSON.parse(localStorage.clientCar));}
    }

    /**
     * Esta funcion agrega al carrito, checando que la cantidad 
     * @param {*} id del producto a agregar
     * @param {*} quantity de producto.
     */
    addCar(id, quantity){
        let index = this.products.findIndex(element=>id==element.id);
        let productToAdd = {...this.products[index]}

        //valido que haya ingresado un valor correcto y que esté en stock 
        let validation = (quantity <= this.products[index].stock) && (quantity>0); 

        let alreadyInCar = this.carrito.findIndex(element => element.id == id); 
        let validation2 = alreadyInCar==-1; 
   
        
        if(validation2 && validation) {
            //si el producto no estaba en el carrito, le creo una nueva propiedad q exprese la cantidad q ha comprado el el cliente, y la misma cantidad.
            productToAdd.newQuantity = quantity; 
            
            this.carrito.push(productToAdd); 

            //funcion que muestra agregado al carrip
            alertAddorModifyStock('Añadido!', 'Se ha añadido a tu carrito');
        }
        else if (!validation){
            alertStock();
        }
        else {
            //si el producto ya el cliente lo tenía agregado en el carrito, le sumo la cantidad q tenia. 
            this.carrito[alreadyInCar].newQuantity += quantity; 

            //funcion que muestra añadido extra
            alertAddorModifyStock('Re-agregado!','Se ha re-agregado a tu carrito');

        }
        //guardo lo que tiene el carrito en el local
        localStorage.clientCar = JSON.stringify(this.carrito);
    }

    addFavorites(id){
        let index = this.products.findIndex(element=>id==element.id);
        let productToAdd = this.products[index]; 

        //checho si ya esta el producto en favoritos. 
        let index2 = this.favorites.findIndex (element => id==element.id); 

        if (index2 == -1) {
            //lo agrego a favoritos 
            this.favorites.push(productToAdd); 

            //lo paso al local. 
            localStorage.clientFavorites = JSON.stringify(this.favorites);

            Swal.fire({
                title: '<h3 class="alert-title">Añadido a favoritos!</h3>', //titulo de la alerta
                html: '<span class="alert-text">Se ha agregado a tus favoritos</span>', // cuerpo o descripcion, podriamos usar text en vez de html, pero no la podríamos editar
                icon: 'success', //tipo de icono 
                backdrop: true, //que el fondo se oscurezca al salir     
                timer: 2000, // tiempo de duracion de la alerta   
                showConfirmButton: false, //para que no me muestre el botón  
            });
        }
        else {
            Swal.fire({
                title: '<h3 class="alert-title">Existente!</h3>', //titulo de la alerta
                html: '<span class="alert-text">Ya tienes este producto marcado como favorito</span>', // cuerpo o descripcion, podriamos usar text en vez de html, pero no la podríamos editar
                icon: 'warning', //tipo de icono 
                backdrop: true, //que el fondo se oscurezca al salir     
                timer: 2000, // tiempo de duracion de la alerta   
                showConfirmButton: false, //para que no me muestre el botón  
            });
        }
    }

    //función para eliminar un producto del carrito. 
    deleteFromCar(id) {
        let index = this.carrito.findIndex(element => element.id == id);

        if (index !=- 1) {
            this.carrito.splice(index, 1);
            Swal.fire({
                title: '<h3 class="alert-title">Eliminado!</h3>',
                html: '<span class="alert-text"> Se ha eliminado el producto de tu carrito </span>',
                icon: 'success',
                backdrop: true,
                timer: 2000,
                showConfirmButton: false, 
            });
        }
              

        localStorage.clientCar = JSON.stringify(this.carrito);
    }

    //Funcion para varciar el carrito. 
    emptyCar() {
        localStorage.removeItem('clientCar');
    }

}