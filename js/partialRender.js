document.addEventListener("DOMContentLoaded", iniciar);
function iniciar() {
    async function loadCards() {
        let container = document.querySelector("#use-ajax");
        container.innerHTML = "<h1> Cargando... <h1>";
        try {
            let response = await fetch("../sites/cursos.html");
            console.log("Cargando desde:", window.location.href);
            if (response.ok){
                let texto = await response.text();
                container.innerHTML = texto;
            }

        } catch (error) {
            container.innerHTML = "Ups! Algo fallo, pero no es tu culpa"
        }
    };
    
    loadCards();

}
