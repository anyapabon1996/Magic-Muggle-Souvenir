let magicMuggleSouvenir = new potterProducts(); 

$.get('../products.json', function(response, status){
    magicMuggleSouvenir.addProducts(response);
});






