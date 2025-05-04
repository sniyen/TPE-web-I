document.getElementById("switch-light-dark").addEventListener("click", switchDarkMode);
switchDarkMode();

function switchDarkMode(){
    let checked = document.getElementById("switch-light-dark").checked;

    if(check == true) {
        //Añadir a cada elemento su dark mode. Con toggle()
    } else {
        //Añadir a cada elemento su light mode. Con toggle()
        //por defecto está en modo claro, porque no está chequeado el checkbox. 
    }
}