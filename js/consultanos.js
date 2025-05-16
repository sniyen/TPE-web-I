document.getElementById("formulario").addEventListener("submit", verifyCaptcha);
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
            "aguila", 
            "narval", 
            "vombátido", 
            "castor", 
            "ornitorrinco", 
            "mamut", 
            "avestruz", 
            "ciervo", 
            "liebre", 
            "mara", 
            "ostrero", 
            "tiburon", 
            "ballena", 
            "caballo", 
            "polilla", 
            "raton", 
            "escarabajo", 
            "foca", 
            "pinguino", 
            "gallina", 
            "vaca", 
            "gallo", 
            "oveja", 
            "toro", 
            "camaleon", 
            "iguana", 
            "rinoceronte", 
            "cebra", 
            "hornero", 
            "gorrion", 
            "benteveo", 
            "paloma", 
            "zorro", 
            "lobo", 
            "tigre", 
            "puma", 
            "armadillo", 
            "pantera", 
            "carpincho", 
            "cuis", 
            "llama", 
            "yaguarete", 
            "hiena", 
            "jabali", 
            "oso hormiguero", 
            "hormiga", 
            "lechuza", 
            "buho", 
            "loro", 
            "cotorra", 
            "lemur", 
            "topo", 
            "comadreja", 
            "zarigueya",
            "mono", 
            "chimpance", 
            "orangutan",
            "erizo", 
            "tortuga", 
            "abeja", 
            "abejorro", 
            "avispa", 
            "pato", 
            "cisne", 
            "renacuajo", 
            "rana", 
            "sapo", 
            "cangrejo", 
            "pulpo", 
            "estrella de mar", 
            "pez linterna", 
            "mariquita", 
            "ajolote",
            "libelula", 
            "cuervo", 
            "condor", 
            "oso", 
            "panda", 
            "remora", 
            "pez espada", 
            "caballito de mar", 
            "dragon de komodo", 
            "oruga", 
            "gaviota", 
            "cerdito",
            "camello", 
            "caracol", 
            "bicho bolita", 
            "grillo", 
            "saltamontes", 
            "nutria", 
            "ardilla", 
            "alacran", 
            "escorpion", 
            "chinchilla",
            "mantarraya", 
            "polilla atlas", 
            "clamidosaurio", 
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
/*
function verifyNotEmptyInputs(){
    //esta función sólo verifica que el usuario no ingrese " " en los campos requeridos que no te obligan a escribir un caracter distinto
    let userQuestionTopic = String(document.getElementById("question-topic").value).trim();
    let userQuestion  = String(document.getElementById("user-question").value).trim();
    let passed = false; 

    if (( userQuestionTopic != " ") && (userQuestion != " ")){
        console.log("Te dejo un espaciecito");  //HACE ESTO EL TRIM SI SON TODOS ESPACIOS. Te deja un espaciecito, no los elimina todos. 
    } 
    else {
        console.log("pasaste");
        passed = true;
    }
    return passed;
}

function verifyForm(event) {
    event.preventDefault();

    if (verifyNotEmptyInputs()) {
        console.log("salio todo biennnnnn");
    }
    else {
        console.log("todo mallllll");
    }
}*/