class elementpostrojenja {
	constructor(ime, vrsta) {
        this.ime = ime;
        this.vrsta = vrsta;
		this.varijable = {};
	}
    
    to_string(){
        var str = "Ime: " + this.ime + "<br>";
        for (var key in this.varijable) {
            str += upcaseFirst(key) + ": " + this[key] + "<br>";
        }
        return str;
	}
    
    tren(p){
		var tablica = "<table> <tr><td>Postrojenje</td><td>Napon</td><td>Dio postrojenja</td><td>Uređaj</td><td>Varijabla</td><td>Stanje</td></tr>";
		
		var uvod = "<td>TS-J</td><td>"+p.napon+"</td><td>"+p.vrsta+"</td><td>" + this.vrsta + "</td>";
		
        tablica += "<tr>" + uvod + "<td>ime</td><td>" + this.ime+"</td></tr>";
		for (var property in this.varijable) {
            tablica += "<tr>" + uvod + "<td>" + property+"</td><td>" + this[property]+"</td></tr>";
		}
		tablica = tablica + "</table><br>";
		return tablica;
	}
    
    svi_signali(p){
		var tablica = "<table> <tr><td>Postrojenje</td><td>Napon</td><td>Dio postrojenja</td><td>Uređaj</td><td>Varijabla</td><td>Stanje</td></tr>";
		
		var uvod = "<td>TS-J</td><td>"+p.napon+"</td><td>"+p.vrsta+"</td><td>" + this.vrsta + "</td>";
		
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
		console.log("desno-kliknut sam");
		document.getElementById("elem_stat").innerHTML = this.to_string();
		document.getElementById("elem_stat").style.visibility = "visible";
	}
}

class mjerni_pretvornik{
	constructor(ime, r_snaga, napon) {
		this.ime = ime;
		this.radna_snaga = r_snaga;
		this.napon = napon; 
	}
}

class brojilo{
	constructor(ime, r_energija, alarm) {
		this.ime = ime;
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

class rastavljač extends elementpostrojenja {
	constructor(ime, stanje, slika, vrsta){
        super(ime, vrsta);
		this.stanje = stanje;
		this.slika = slika;
		this.varijable = {stanje: ["međupoložaj", "uključen", "isključen", "kvar signalizacije"]};
		if (this.stanje == "uključen") {
			document.getElementById(this.slika).src = "Slike/rastavljač_ukljucen.png";
		} else {
			document.getElementById(this.slika).src = "Slike/rastavljač_iskljucen.png";
		}
	}	
	
	promijeni_stanje(){
		console.log("kliknut sam")
		if (this.stanje == "uklop") {
			this.stanje = "isklop";
			document.getElementById(this.slika).src = "Slike/rastavljač_iskljucen.png";
		} else {
			this.stanje = "uklop";
			document.getElementById(this.slika).src = "Slike/rastavljač_ukljucen.png";
		}
	}
}

class rastavljač_linijski extends rastavljač{
	constructor(ime, stanje, komanda, slika, vrsta){
        super(ime, stanje, slika, vrsta);
        this.varijable.komanda =  ["uklop", "isklop"];
		this.komanda = komanda;
	}	
}

class rastavljač_sabirnicki extends rastavljač{
	constructor(ime, stanje, komanda, slika, vrsta){
        super(ime, stanje, slika, vrsta);
        this.varijable.komanda =  ["uklop", "isklop"];
		this.komanda = komanda;
	}	
}

class rastavljač_uzemljenja extends rastavljač{
	constructor(ime, stanje, slika, vrsta){
        super(ime, stanje, slika, vrsta);
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
	constructor(ime, prvistup_isklj, drugistup_isklj, rastavljač_kvar, pomocnonap_off, test){
        super(ime);
		this.ime = ime;
		this.prvistup_isklj = prvistup_isklj;
		this.drugistup_isklj = drugistup_isklj;
		this.rastavljač_kvar = rastavljač_kvar;
		this.pomocnonap_off = pomocnonap_off;
		this.test = test;
		this.varijable = {_1_stupanj_isključenje: ["prorada", "prestanak"], _2_stupanj_isključenje: ["prorada", "prestanak"], rastavljač_kvar: ["prorada", "prestanak"], pomoćno_napajanje_nestanak: ["prorada", "prestanak"], u_testu: ["prorada", "prestanak"]};
	}
}

class prekidač extends elementpostrojenja {
	constructor(ime, komanda, stanje, gubitakSF6_upoz, gubitakN2_blok, mintlak_blok, gubitakSF6_blok, gubitakulja_blok, APU_blok, kvar_grijanja, slika, vrsta){
        super(ime, vrsta);
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
		document.getElementById(this.slika).src = "Slike/prekidač_ukljucen.png";
	}
}

class polje {
	constructor(vrsta, stanje, napon) {
		this.stanje = stanje;
        this.vrsta = vrsta;
        this.napon = napon;
	}
    
    izlistaj(koliko) {
        var lista = "<html><head><title>"+koliko+" "+this.vrsta+"</title><meta charset=\"UTF-8\"></head><body>";
        for (var obj in this) {
            if (this[obj] instanceof elementpostrojenja) {
                lista += this[obj][koliko](this);
            }
        }
        lista += "</body></html>";
        var opened = window.open("");
        opened.document.write(lista);
    }
    
    pali_gasi_polje(tren_btn){
        if (this.stanje == "ukljuceno") {
            this.stanje = "iskljuceno";
            document.getElementById(tren_btn).style.backgroundColor = "#f00";
        } else {
            this.stanje = "ukljuceno";
            document.getElementById(tren_btn).style.backgroundColor = "#0f0";
        }
    }
    
    smije_se_gasiti(predmet_promjene){
	}
	
	smije_se_paliti(predmet_promjene){
	}
    
    promijeni_stanje(predmet_promjene){
		console.log("kliknut sam");
		console.log(predmet_promjene.stanje, predmet_promjene.ime, predmet_promjene.vrsta);
		if (predmet_promjene.stanje == "uključen") {
			if (this.smije_se_gasiti(predmet_promjene)){
				predmet_promjene.stanje = "isključen";
				if ("komanda" in predmet_promjene) {
					predmet_promjene.komanda = "isklop";
                }
                document.getElementById(predmet_promjene.slika).src = "Slike/"+predmet_promjene.vrsta+"_iskljucen.png";
			} else {
				console.log("smeć");
                err_visible("Nije moguće ugasiti " + predmet_promjene.vrsta, 5);
			}
		} else {
			if (this.smije_se_paliti(predmet_promjene)){
				predmet_promjene.stanje = "uključen";
				if ("komanda" in predmet_promjene) {
					predmet_promjene.komanda = "uklop"; 
                }
				document.getElementById(predmet_promjene.slika).src = "Slike/"+predmet_promjene.vrsta+"_ukljucen.png";
			} else {
				console.log("antismeć");
                err_visible("Nije moguće upaliti " + predmet_promjene.vrsta, 5);
			}
		}
	}
}

class dalekovodno_polje extends polje{
	constructor(vrsta, stanje, napon) {
        super(vrsta, stanje, napon);
		this.p1 = new prekidač("Prekidač 1", "uklop", "uključen", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "pdal1", "prekidač");
		this.r1 = new rastavljač("Rastavljač 1", "isključen", "rdal1", "rastavljač");
		this.r2 = new rastavljač("Rastavljač 2", "uključen", "rdal2", "rastavljač");
		this.r3 = new rastavljač("Rastavljač 3", "uključen", "rdal3", "rastavljač");
		this.mjerni_pretvornik1 = new mjerni_pretvornik("Mjerni pretvornik", 0, 0);
		this.brojilo1 = new brojilo("Brojilo 1", 0, "prestanak");
		this.APU1 = new APU("APU 1", "prestanak", "prestanak", "prestanak");
		this.zastita_nadstr = new nadstrujna_zastita("Zaštita nadstrujna 1", "prestanak");
		this.zastita_dist = new distantna_zastita("Zaštita distantna 1", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak");
		this.zastita_od_zatajenja = new zastita_zatajenje("Zaštita od zatajenja prekidača 1", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak");
	}
	
	smije_se_gasiti(predmet_promjene){
        return (predmet_promjene.vrsta == "prekidač") || (this.p1.stanje == "isključen");
	}
	
	smije_se_paliti(predmet_promjene){
		if ((predmet_promjene.vrsta == "prekidač") || (this.p1.stanje == "isključen" && this.r1.stanje == "isključen" && this.r2.stanje == "isključen"))
			return 1;
        return (predmet_promjene == this.r3 && this.p1.stanje == "isključen");
	}
}

class spojno_polje extends polje{
	constructor(vrsta, stanje, napon) {
        super(vrsta, stanje, napon);
		this.p2 = new prekidač("Prekidač 2", "uklop", "uključen", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "psp1", "prekidač");
		this.r4 = new rastavljač_linijski("Rastavljač 4", "isključen", "uklop", "rsp1", "rastavljač");
		this.r5 = new rastavljač_uzemljenja("Rastavljač 5", "uključen", "rsp2", "rastavljač");
	}
    
	smije_se_gasiti(predmet_promjene){
        return (predmet_promjene.vrsta == "prekidač") || (this.p2.stanje != "uključen");
	}
	
	smije_se_paliti(predmet_promjene){
        return (predmet_promjene.vrsta == "prekidač") || (this.p2.stanje == "isključen" && this.r4.stanje == "isključen" && this.r5.stanje == "isključen");
	}
}

dvp = new dalekovodno_polje("DV_J", "uključeno", 220);
spp = new spojno_polje("SP_J", "uključeno", 220);