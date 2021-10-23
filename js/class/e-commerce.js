class potterProducts {
    constructor () {
        this.products = [];
        this.Send = {method: '', price: 0};
        this.coupon = {codex: 'mago', percentage: 15};
        this.extraGif = 5000;
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
                        <img src='${element.src}' class="card-img-top" alt='${element.alt}' data-id='${element.id}'>
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
        Array.from(document.getElementsByClassName('selling-image')).forEach(element => {
            element.onclick = (event) => {
                let idImageClick = event.target.getAttribute('data-id'); //obtengo el id del producto. 
                let objectClick = this.products.find(element => element.id == idImageClick); //guardo el objeto click en una variable
                localStorage.objectClick = JSON.stringify(objectClick);//guardo en el local el objeto al que le di click. 
                location.href = 'description.html#aqui';//me voy a la pagina que tiene la descripcion del producto 
            }
        })
    }
}