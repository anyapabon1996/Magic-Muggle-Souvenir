let magicMuggleSouvenir = new potterProducts(); 

$.get('../products.json', function(response, status){
    console.log(response);

    magicMuggleSouvenir.addProducts(response);
})






