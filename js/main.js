document.getElementById("switch-light-dark").addEventListener("click", switchDarkMode);
switchDarkMode();

function switchDarkMode(){
    let check = document.getElementById("switch-light-dark").checked;

    if(check == true) {
        document.getElementById("fondo").classList.add("oscuro");
        document.getElementById("fondo").classList.remove("claro");
        
        //Añadir a cada elemento su dark mode. Con toggle()
    } else {
        document.getElementById("fondo").classList.add("claro");
        document.getElementById("fondo").classList.remove("oscuro");
        
        //Añadir a cada elemento su light mode. Con toggle()
        //por defecto está en modo claro, porque no está chequeado el checkbox. 
    }
}