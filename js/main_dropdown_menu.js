document.addEventListener("DOMContentLoaded", start);
function start (){
    document.getElementById("open-menu").addEventListener("click", menuDesplegablePrincipal);

    function menuDesplegablePrincipal() {
        document.querySelector(".nav-menu").classList.toggle("show");
    }
}