class elementpostrojenja {

	constructor() {
		
	}
	
	prikazi_stanje(){
		console.log("double-kliknut sam");
		document.getElementById("elem_stat").innerHTML = this.to_string();
		document.getElementById("elem_stat").style.visibility = "visible";
	}	
	
}


class mjerni_pretvornik{
	constructor(r_snaga, napon) {
		radna_snaga = r_snaga;
		napon = napon; 
	}
}

class brojilo{
	constructor(r_energija, alarm) {
		this.radna_energija = r_energija;
		this.alarm = alarm;
		this.varijable = {alarm: ["prorada", "prestanak"]};
	}
}

class APU{
	constructor(ime, onep, threep, blokada){
		this.ime = ime;
		this.onep = onep;
		this.threep = threep;
		this.blokada = blokada;
		this.varijable = {_1p: ["prorada", "prestanak"], _2p: ["prorada", "prestanak"], blokada: ["prorada", "prestanak"]};
	}
}

class rastavljac extends elementpostrojenja {
	constructor(ime, stanje, slika, vrsta){
        super();
		this.ime = ime;
		this.stanje = stanje;
		this.slika = slika;
		this.varijable = {komanda: ["uklop", "isklop"], stanje: ["međupoložaj", "uključen", "isključen", "kvar signalizacije"]};
		this.vrsta = vrsta;
		if (this.stanje == "uključen") {
			document.getElementById(this.slika).src = "Slike/rastavljac_ukljucen.png";
		} else {
			document.getElementById(this.slika).src = "Slike/rastavljac_iskljucen.png";
		}
	}	
	
	promijeni_stanje(){
		console.log("kliknut sam")
		if (this.stanje == "uklop") {
			this.stanje = "isklop";
			document.getElementById(this.slika).src = "Slike/rastavljac_iskljucen.png";
		} else {
			this.stanje = "uklop";
			document.getElementById(this.slika).src = "Slike/rastavljac_ukljucen.png";
		}
	}
		
	to_string(){
		return "Ime: " + this.ime + "<br>Komanda: " + this.komanda + "<br>Stanje: " + this.stanje + "<br>GubitakSF6 upozorenje: " + this.gubitakSF6_upoz + "<br>Gubitak N2 blokada: " + this.gubitakN2_blok + "<br>Minimalni tlak blokada: " + this.mintlak_blok + "<br>Gubitak SF6 blokada: " + this.gubitakSF6_blok + "<br>Gubitak ulja blokada: " + this.gubitakulja_blok + "<br>APU blokada: " + this.APU_blok + "<br>Kvar grijanja: " + this.kvar_grijanja + "<br>";
	}
	to_string2(){
		var tablica = "<table> <tr><td>Postrojenje</td><td>Napon</td><td>Dio postrojenja</td><td>Uređaj</td><td>Varijabla</td><td>Stanje</td></tr>";
		
		var uvod = "<td>TS-J</td><td>220</td><td>DV-J</td><td>rastavljač</td>";
		
		for (var property in this) {
			if (this.hasOwnProperty(property) && property != "slika") {
				tablica += "<tr>" + uvod + "<td>" + property+"</td><td>" + this[property]+"</td></tr>";
			}
		}
		tablica = tablica + "</table><br>";
		return tablica;
	}
	prikazi_stanje(){
		console.log("double-kliknut sam");
		document.getElementById("elem_stat").innerHTML = this.to_string();
		document.getElementById("elem_stat").style.visibility = "visible";
	}	
	
	svi_signali(){
		var tablica = "<table> <tr><td>Postrojenje</td><td>Napon</td><td>Dio postrojenja</td><td>Uređaj</td><td>Varijabla</td><td>Stanje</td></tr>";
		
		var uvod = "<td>TS-J</td><td>220</td><td>DV-J</td><td>rastavljač</td>";
		
		for (var kljuc in this.varijable) {
			var count = this.varijable[kljuc].length;
			for(var i = 0; i < count; i++) {
				tablica += "<tr>" + uvod + "<td>" + kljuc +"</td><td>" + this.varijable[kljuc][i] +"</td></tr>";
			}
		}
		tablica = tablica + "</table><br>";
		return tablica;
	}
}

class rastavljac_izlazni extends rastavljac{
	constructor(komanda){
		this.komanda = komanda;
	}	
}

class rastavljac_sabirnicki extends rastavljac{
	constructor(komanda){
		this.komanda = komanda;
	}	
}

class rastavljac_uzemljenja extends rastavljac{
	constructor(){}
	
	svi_signali(){
		var tablica = "<table> <tr><td>Postrojenje</td><td>Napon</td><td>Dio postrojenja</td><td>Uređaj</td><td>Varijabla</td><td>Stanje</td></tr>";
		
		var uvod = "<td>TS-J</td><td>220</td><td>DV-J</td><td>rastavljač</td>";
		
		for (var kljuc in this.varijable) {
			var count = this.varijable[kljuc].length;
			for(var i = 0; i < count; i++) {
				if (kljuc == "stanje") {
					tablica += "<tr>" + uvod + "<td>" + kljuc +"</td><td>" + this.varijable[kljuc][i] +"</td></tr>";
				}
			}
		}
		tablica = tablica + "</table><br>";
		return tablica;
	}
}

class zastita{
	constructor(ime){
		this.ime = ime;
	}
}

class distantna_zastita extends zastita{
	constructor(ime, isklj, lone_pot, ltwo_pot, lthree_pot, zemljospoj_pot, stagetwo_pot, stagethree_pot, tkprijem, tkslanje, osjetljiva_zs){
        super(ime);
		this.ime = ime;
		this.isklj = isklj;
		this.lone_pot = lone_pot;
		this.ltwo_pot = ltwo_pot;
		this.lthree_pot = lthree_pot;
		this.zemljospoj_pot = zemljospoj_pot;
		this.stagetwo_pot = stagetwo_pot;
		this.stagethree_pot = stagethree_pot;
		this.tkprijem = tkprijem;
		this.tkslanje = tkslanje;
		this.osjetljiva_zs = osjetljiva_zs;
		this.varijable = {isključenje: ["prorada", "prestanak"], faza_L1_poticaj: ["prorada", "prestanak"], faza_L2_poticaj: ["prorada", "prestanak"], faza_L3_poticaj: ["prorada", "prestanak"], zemljospoj_poticaj: ["prorada", "prestanak"], _2_stupanj_poticaj: ["prorada", "prestanak"], _3_stupanj_poticaj: ["prorada", "prestanak"], TK_prijem_signala: ["prorada", "prestanak"], osjetljiva_zemljospojna: ["prorada", "prestanak"]};
	}
}

class nadstrujna_zastita extends zastita{
	constructor(ime, isklj){
        super(ime);
		this.ime = ime;
		this.isklj = isklj;
		this.varijable = {isključenje: ["prorada", "prestanak"]};
	}
}

class zastita_zatajenje extends zastita{
	constructor(ime, prvistup_isklj, drugistup_isklj, rastavljac_kvar, pomocnonap_off, test){
        super(ime);
		this.ime = ime;
		this.prvistup_isklj = prvistup_isklj;
		this.drugistup_isklj = drugistup_isklj;
		this.rastavljac_kvar = rastavljac_kvar;
		this.pomocnonap_off = pomocnonap_off;
		this.test = test;
		this.varijable = {_1_stupanj_isključenje: ["prorada", "prestanak"], _2_stupanj_isključenje: ["prorada", "prestanak"], rastavljač_kvar: ["prorada", "prestanak"], pomoćno_napajanje_nestanak: ["prorada", "prestanak"], u_testu: ["prorada", "prestanak"]};
	}
}

class prekidac extends elementpostrojenja {
	constructor(ime, komanda, stanje, gubitakSF6_upoz, gubitakN2_blok, mintlak_blok, gubitakSF6_blok, gubitakulja_blok, APU_blok, kvar_grijanja, slika, vrsta){
        super();
		this.ime = ime;
		this.komanda = komanda;
		this.stanje = stanje;
		this.gubitakSF6_upoz = gubitakSF6_upoz;
		this.gubitakN2_blok = gubitakN2_blok;
		this.mintlak_blok = mintlak_blok;
		this.gubitakSF6_blok = gubitakSF6_blok;
		this.gubitakulja_blok = gubitakulja_blok;
		this.APU_blok = APU_blok;
		this.kvar_grijanja = kvar_grijanja;
		this.slika = slika;
		this.varijable = {komanda: ["uklop", "isklop"], stanje: ["međupoložaj", "uključen", "isključen", "kvar signalizacije"], gubitakSF6_upoz: ["prorada", "prestanak"], gubitakN2_blok: ["prorada", "prestanak"], mintlak_blok: ["prorada", "prestanak"], gubitakSF6_blok: ["prorada", "prestanak"], gubitakulja_blok: ["prorada", "prestanak"], APU_blok: ["prorada", "prestanak"], kvar_grijanja: ["prorada", "prestanak"]};
		this.vrsta = vrsta;
		document.getElementById(this.slika).src = "Slike/prekidac_ukljucen.png";
	}
	
	to_string(){
		return "Ime: " + this.ime + "<br>Komanda: " + this.komanda + "<br>Stanje: " + this.stanje + "<br>GubitakSF6 upozorenje: " + this.gubitakSF6_upoz + "<br>Gubitak N2 blokada: " + this.gubitakN2_blok + "<br>Minimalni tlak blokada: " + this.mintlak_blok + "<br>Gubitak SF6 blokada: " + this.gubitakSF6_blok + "<br>Gubitak ulja blokada: " + this.gubitakulja_blok + "<br>APU blokada: " + this.APU_blok + "<br>Kvar grijanja: " + this.kvar_grijanja + "<br>";
	}
	
	to_string2(){
		var tablica = "<table> <tr><td>Postrojenje</td><td>Napon</td><td>Dio postrojenja</td><td>Uređaj</td><td>Varijabla</td><td>Stanje</td></tr>";
		
		var uvod = "<td>TS-J</td><td>220</td><td>DV-J</td><td>prekidač</td>";
		
		for (var property in this) {
			if (this.hasOwnProperty(property) && property != "slika") {
				tablica += "<tr>" + uvod + "<td>" + property+"</td><td>" + this[property]+"</td></tr>";
			}
		}
		tablica = tablica + "</table><br>";
		return tablica;
	}
	
	svi_signali(){
		var tablica = "<table> <tr><td>Postrojenje</td><td>Napon</td><td>Dio postrojenja</td><td>Uređaj</td><td>Varijabla</td><td>Stanje</td></tr>";
		
		var uvod = "<td>TS-J</td><td>220</td><td>DV-J</td><td>prekidač</td>";
		
		for (var kljuc in this.varijable) {
			var count = this.varijable[kljuc].length;
			for(var i = 0; i < count; i++) {
				tablica += "<tr>" + uvod + "<td>" + kljuc +"</td><td>" + this.varijable[kljuc][i] +"</td></tr>";
			}
		}
		tablica = tablica + "</table><br>";
		return tablica;
	}
	
	prikazi_stanje(){
		console.log("double-kliknut sam");
		document.getElementById("elem_stat").innerHTML = this.to_string();
		document.getElementById("elem_stat").style.visibility = "visible";
	}	
}

class polje {
	constructor() {
		this.stanje = "ukljuceno";
	}
}

class dalekovodno_polje extends polje{
	constructor() {
        super();
		this.p1 = new prekidac("P1", "uklop", "uključen", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "pdal1", "prekidac");
		this.r1 = new rastavljac("R1", "isključen", "rdal1", "rastavljac");
		this.r2 = new rastavljac("R2", "uključen", "rdal2", "rastavljac");
		this.r3 = new rastavljac("R3", "uključen", "rdal3", "rastavljac");
	}
	
	smije_se_gasiti(predmet_promjene){
		if (predmet_promjene.vrsta == "prekidac") {
			return 1;
		} else {
			if (this.p1.stanje == "isključen") {
				return 1;
			} else {
				return 0;
			}
		}
	}
	
	smije_se_paliti(predmet_promjene){
		if (predmet_promjene.vrsta == "prekidac") {
			return 1;
		} else {
			if (this.p1.stanje == "isključen" && this.r1.stanje == "isključen" && this.r2.stanje == "isključen") {
				return 1;
			} else {
				if (predmet_promjene == this.r3 && this.p1.stanje == "isključen") {
					return 1;
				} else {
					return 0;
				}
			}
		}
	}
	
	promijeni_stanje(predmet_promjene){
		console.log("kliknut sam");
		console.log(predmet_promjene.stanje, predmet_promjene.ime, predmet_promjene.vrsta);
		if (predmet_promjene.stanje == "uključen") {
			if (this.smije_se_gasiti(predmet_promjene)){
				predmet_promjene.stanje = "isključen";
				if (predmet_promjene.vrsta == "prekidac") {
					predmet_promjene.komanda = "isklop";
					document.getElementById(predmet_promjene.slika).src = "Slike/prekidac_iskljucen.png";
				} else {
					document.getElementById(predmet_promjene.slika).src = "Slike/rastavljac_iskljucen.png";
				}
			} else {
				console.log("smeć");
                document.getElementById("error_log").innerHTML = "Nije moguće ugasiti " + predmet_promjene.vrsta + ".<br>";
                document.getElementById("error_log").style.visibility = "visible";
			}
		} else {
			if (this.smije_se_paliti(predmet_promjene)){
				predmet_promjene.stanje = "uključen";
				if (predmet_promjene.vrsta == "prekidac") {
					predmet_promjene.komanda = "uklop"; 
					document.getElementById(predmet_promjene.slika).src = "Slike/prekidac_ukljucen.png";
				} else {
					document.getElementById(predmet_promjene.slika).src = "Slike/rastavljac_ukljucen.png";
				}
			} else {
				console.log("antismeć");
                document.getElementById("error_log").innerHTML = "Nije moguće upaliti " + predmet_promjene.vrsta + ".<br>";
                document.getElementById("error_log").style.visibility = "visible";
			}
		}
	}
}

class spojno_polje extends polje{
	constructor() {
        super();
		this.p2 = new prekidac("P2", "uklop", "uključen", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "psp1", "prekidac");
		this.r4 = new rastavljac("R4", "isljučen", "rsp1", "rastavljac");
		this.r5 = new rastavljac("R5", "uključen", "rsp2", "rastavljac");
	}
	smije_se_gasiti(predmet_promjene){
		if (predmet_promjene.vrsta == "prekidac") {
			return 1;
		} else {
			if (this.p2.stanje == "uključen") {
				return 0;
			} else {
				return 1;
			}
		}
	}
	
	smije_se_paliti(predmet_promjene){
		if (predmet_promjene.vrsta == "prekidac") {
			return 1;
		} else {
			if (this.p2.stanje == "isključen" && this.r4.stanje == "isključen" && this.r5.stanje == "isključen") {
				return 1;
			} else {
				return 0;
			}
		}
	}
	
	promijeni_stanje(predmet_promjene){
		console.log("kliknut sam");
		console.log(predmet_promjene.stanje, predmet_promjene.ime, predmet_promjene.vrsta);
		if (predmet_promjene.stanje == "uključen") {
			if (this.smije_se_gasiti(predmet_promjene)){
				predmet_promjene.stanje = "isključen";
				if (predmet_promjene.vrsta == "prekidac") {
					predmet_promjene.komanda = "isklop";
					document.getElementById(predmet_promjene.slika).src = "Slike/prekidac_iskljucen.png";
				} else {
					document.getElementById(predmet_promjene.slika).src = "Slike/rastavljac_iskljucen.png";
				}
			} else {
				console.log("smeć");
                document.getElementById("error_log").innerHTML = "Nije moguće ugasiti " + predmet_promjene.vrsta + ".<br>";
                document.getElementById("error_log").style.visibility = "visible";
			}
		} else {
			if (this.smije_se_paliti(predmet_promjene)){
				predmet_promjene.stanje = "uključen";
				if (predmet_promjene.vrsta == "prekidac") {
					predmet_promjene.komanda = "uklop"; 
					document.getElementById(predmet_promjene.slika).src = "Slike/prekidac_ukljucen.png";
				} else {
					document.getElementById(predmet_promjene.slika).src = "Slike/rastavljac_ukljucen.png";
				}
			} else {
				console.log("antismeć");
                document.getElementById("error_log").innerHTML = "Nije moguće upaliti " + predmet_promjene.vrsta + ".<br>";
                document.getElementById("error_log").style.visibility = "visible";
			}
		}
	}
}

dvp = new dalekovodno_polje("DV_P_J", "uključeno", 220);
spp = new spojno_polje("SP_P_J", "uključeno", 220);

//constructor(ime, komanda, stanje, gubitakSF6_upoz, gubitakN2_blok, mintlak_blok, gubitakSF6_blok, gubitakulja_blok, APU_blok, kvar_grijanja, slika)


//document.getElementById("test").innerHTML = "Stanje prekidaca " + p1.stanje + ", u položaju " + p1.komanda;
