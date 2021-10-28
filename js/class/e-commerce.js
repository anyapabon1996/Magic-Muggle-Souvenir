class potterProducts {
    constructor () {
        this.products = [];
        this.coupon = {codex: 'mago', percentage: 15};
        this.extraGif = {minimo: 5000, descuento: 15};
        this.send = [{buho:300}, {redFlu:500}, {mago:0}]; 
    }

    /**
     * 
     * @param {*} allProducts allProducts será un array con todos los productos de la tienda.
     */
    addProducts(allProducts) {
        this.products = this.products.concat(allProducts); //agregamos todos los productos. VITAL USAR CONCAT EN VEZ DE PUSH
        localStorage.myProducts = JSON.stringify(allProducts); // guardamos todos los productos en el localStorage. 
    }

    showProducts (category) {
        let acumulador = ``;
        this.products.forEach(element => {
            if (category == element.category) {
                acumulador += `
                    <div class="card selling-image" style="width: 18rem;">
                        <img src='${element.src}' class="card-img-top goTo" alt='${element.alt}' data-id='${element.id}'>
                        <div class="card-body">
                            <p class="card-text">${element.description}</p>
                        </div>
                    </div>`
            }
       })
        console.log(document.getElementById(category));
        document.getElementById(category).innerHTML = acumulador; 

        this.goToDescription();
    }

    goToDescription(){
        Array.from(document.getElementsByClassName('goTo')).forEach(element => {
            element.onclick = (event) => {
                let idImageClick = event.target.getAttribute('data-id'); //obtengo el id del producto. 
                let objectClick = this.products.find(element => element.id == idImageClick); //guardo el objeto click en una variable
                localStorage.objectClick = JSON.stringify(objectClick);//guardo en el local el objeto al que le di click. 
                location.href = 'description.html#aqui';//me voy a la pagina que tiene la descripcion del producto 
            }
        })
    }

    //baja de stock 
    controlStock(id, quantity) {
        //busco donde está el producto
        let index = this.products.findIndex(element => 
            element.id == id
        );
        //bajo la cantidad de stock
        this.products[index].stock -= quantity; 

        //guardo en el local 
        localStorage.myProducts = JSON.stringify(this.products);
    }

    toPay(coupon, method, total, cash){
        //descuenot a aplicar según cupon
        let descuento = (100-this.coupon.percentage)/100;

        //apliacion de decuento de cupon
        total = (coupon == this.coupon.codex) ? total*descuento : total; 
        
        //aplicacion de sobrecarga por envío, o no. 
        total += (method=='Buho') ? this.send[0].buho : (method=='Red Flu') ? this.send[1].redFlu : this.send[2].mago;

        //aplicacion de descuento por una compra mayor a minimo.
        total = (total>this.extraGif.minimo) ? total*((100-this.extraGif.descuento)/100) : total; 

        cash -= total; 

        let auxiliar = JSON.parse(localStorage.getItem('myMoney')); 

        auxiliar.total = parseInt(cash/182); 

        localStorage.myMoney =JSON.stringify(auxiliar); 

        console.log('Ha pagado un total de '+total+'$. Su capital actual es: '+cash+'$. Gracias por su compra'); 
    }
}