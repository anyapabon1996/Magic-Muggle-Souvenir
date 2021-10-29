let magicMuggleSouvenir = new potterProducts(); 

//forma con JQUERY
// $.get('../products.json', function(response, status){
//     magicMuggleSouvenir.addProducts(response);
// });


//Forma con fetch para llamar todos los productos del json
async function callProducts(){
    const answer = await fetch('../products.json');
    const data = await answer.json(); 
    magicMuggleSouvenir.addProducts(data);
}

callProducts()





