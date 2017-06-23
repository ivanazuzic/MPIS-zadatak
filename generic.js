function upcaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* error log gluposti */
var isErrVisible = false, errTimeout;

function hideErr() {
    document.getElementById("error_log").style.visibility = "hidden";
    document.getElementById("error_log").innerHTML= "";
    isErrVisible = false;
    clearTimeout(errTimeout);
}

function err_visible(errmsg, seconds) {
    document.getElementById("error_log").innerHTML += errmsg + ".<br>";
    document.getElementById("error_log").style.visibility = "visible";
    if (!isErrVisible) {
        isErrVisible = true;
        errTimeout = setTimeout(hideErr, seconds*1000);
    }
}

document.getElementById("error_log").addEventListener("click", hideErr);

/* about i help */

var help = "<h1>Help</h1><h2>Izbornik</h2>U izborniku se nalazi:<br>• About koji sadrži općenite podatke o aplikaciji,<br>• Help koji sadrži upute o korištenju,<br>• Dalekovodno polje koje omogućuje ispis listi za njega te mogućnost paljenja i gašenja,<br>• Spojno polje koje omogućuje ispis listi za njega te mogućnost paljenja i gašenja.<br><h2>Prikaz jednopolne sheme</h2>Na jednopolnoj shemi prikazani su dalekovodno i spojno polje. Na prekidače i rastavljače može se kliknuti lijevim ili desnim klikom. Lijevim klikom uključuje se ili isključuje element, a desnim se otvaraju detalji o elementu. <h2>Prikaz grešaka pri nedozvoljenim operacijama</h2>Ukoliko se dogodi nedozvoljeni način paljennja ili gašenja nekog elementa ispisuje se poruka o greški u crvenom okviru.";
var about = "<h1>O aplikaciji</h1><h3>Autori:</h3> <div class='alright'>Matija Dizdar, Karlo Žirovec, Ivana Žužić</div><h3>Fakultet:</h3> <div class='alright'>Tehnički Fakultet Sveučilišta u Rijeci</div><h3>Kolegij:</h3> <div class='alright'>Modeliranje procesnih informacijskih sustava</div><h2>Zadatak koji je trebalo ispuniti:</h2>Izraditi programsku podršku za upravljanje zadanim sustavom. Istu izraditi na osnovu modela razrađenog pomoću dijagrama klasa, odnosno dijagrama slijeda u nekom od objektno orijentiranih programskih jezika. ";
var cur = "";


function toggleVisible(id) {
    var a = document.getElementById("popup");
    if (id == "help")
        a.innerHTML = help;
    if (id == "about")
        a.innerHTML = about;
    
    if(cur == id) {
        a.style.visibility = "hidden";
        cur = "";
    } else {
        a.style.visibility = "visible";
        cur = id;
    }
}