//EN ESTA PARTE SE MUESTRAN LOS RESULTADOS.
$('.mine-resuts').append(`
<div class="row results" style="display: none;">
    <div class="col d-flex align-items-center flex-column">
        <div class="shape galeon1"></div>
            <p class="result-paragraph galeon-paragraph" id="value-galeones1"></p>
            <p class="result-paragraph galeon-paragraph" id="value-galeones2"></p>
            <p class="result-paragraph galeon-paragraph" id="value-galeones3"></p>
    </div>

    <div class="col d-flex align-items-center flex-column">
        <div class="shape sickle1"></div>
            <p class="result-paragraph sickle-paragraph" id="value-sickle1"></p>
            <p class="result-paragraph sickle-paragraph" id="value-sickle2"></p>
            <p class="result-paragraph sickle-paragraph" id="value-sickle3"></p>
    </div>

    <div class="col d-flex align-items-center flex-column">
        <div class="shape knut1"></div>
            <p class="result-paragraph knut-paragraph" id="value-knut1"></p>
            <p class="result-paragraph knut-paragraph" id="value-knut2"></p>
            <p class="result-paragraph knut-paragraph" id="value-knut3"></p>
    </div>
</div>
<h3 id="subtitle-results" style="display: none">Total en Pesos Argentinos</h3>
<p class="result-paragraph final-paragraph"  style="display: none"></p>
`); 

//para convertir las monedas a dolares. 
activeToConvert(); 
