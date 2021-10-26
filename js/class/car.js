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

            alert('añadido con éxito');
        }
        else if (!validation){
            alert('Ha ingresado una cantidad fuera de stock o menor que 1'); 
        }
        else {
            //si el producto ya el cliente lo tenía agregado en el carrito, le sumo la cantidad q tenia. 
            this.carrito[alreadyInCar].newQuantity += quantity; 

            alert('Re agregado al carrito');
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

            alert('Añadido a favoritos');
        }
        else {
            alert('Este producto ya existe en sus favoritos.');
        }
    }

    //función para eliminar un producto del carrito. 
    deleteFromCar(id) {
        let index = this.carrito.findIndex(element => element.id == id);

        (index !=- 1) ? this.carrito.splice(index, 1) && alert('Hemos eliminado el producto') : alert('Ud no tenía ese producto en el carrito'); 

        localStorage.clientCar = JSON.stringify(this.carrito);
    }

    //Funcion para varciar el carrito. 
    emptyCar() {
        localStorage.removeItem('clientCar');
    }

}