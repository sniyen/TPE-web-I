
setUserThemePreference();
document.getElementById("switch-light-dark").addEventListener("click", switchDarkMode);

function setUserThemePreference() {
    let userPreference = localStorage.getItem("userThemePreference");
    let icon = document.getElementById("theme-img");

    if (userPreference == null) {
        //no tiene una preferencia establecida
        userPreference = "claro";
    }
    else {
        //tiene una preferencia
        if (userPreference == "claro") {
            document.getElementById("fondo").classList.add("claro");
            document.getElementById("fondo").classList.remove("oscuro");
            icon.src = "../img/lunitauwu.png";
        }
        else {
            document.getElementById("fondo").classList.add("oscuro");
            document.getElementById("fondo").classList.remove("claro");
            icon.src = "../img/solcitouwu.png";
        }
    }

}

function switchDarkMode(){

    let userPreference = localStorage.getItem("userThemePreference");
    let icon = document.getElementById("theme-img");
 

    if (userPreference == "claro"){

        document.getElementById("fondo").classList.add("oscuro");
        document.getElementById("fondo").classList.remove("claro");
        icon.src = "../img/solcitouwu.png";

        localStorage.setItem("userThemePreference", "oscuro");

    } else {

        document.getElementById("fondo").classList.add("claro");
        document.getElementById("fondo").classList.remove("oscuro");
        icon.src = "../img/lunitauwu.png";

        localStorage.setItem("userThemePreference", "claro");


    }
    
}