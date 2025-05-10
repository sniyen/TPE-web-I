
document.getElementById("submit-button").addEventListener("click", verifyCaptcha);
let indice; 
const arr = [ 
            "gato",
            "perro",
            "colibri", 
            "hamster",
            "burro", 
            "delfin", 
            "elefante", 
            "jirafa", 
            "leon",
            "conejo", 
            "koala", 
            "canguro", 
            "hipopotamo", 
            "mariposa", 
            "murcielago", 
            "aguila" 
            ];
captchaGenerator();
function captchaGenerator (){

    const minIndex = 0;
    const maxIndex = arr.length - 1;

    indice = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    console.log(indice);
    console.log(arr[indice]);

    document.getElementById("captcha").innerHTML = arr[indice];
}

function verifyCaptcha(event) {
    event.preventDefault();
    let userReply = document.getElementById("user-reply").value;
    if (arr[indice] === userReply) {
        console.log("todo ok");
        document.getElementById("captcha-inform").classList.remove("captcha-result-incorrect");
        document.getElementById("captcha-inform").innerHTML="Captcha correcto. Mensaje enviado";
   
    }
    else {
        document.getElementById("user-reply").value = "";
        document.getElementById("captcha-inform").innerHTML="Captcha incorrecto. Vuelva a intentarlo";
        document.getElementById("captcha-inform").classList.add("captcha-result-incorrect");
        captchaGenerator();
    }
    
}