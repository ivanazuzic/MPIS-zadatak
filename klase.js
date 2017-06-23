class elementpostrojenja {
	constructor(ime, vrsta, stanje, slika) {
        this.ime = ime;
        this.vrsta = vrsta;
		this.varijable = {};
        if (stanje != undefined) this.stanje = stanje;
        if (slika != undefined) {
            this.slika = slika;
            document.getElementById(this.slika).src = "Slike/"+this.vrsta+"_"+this.stanje+".png";
        }
	}
    
    to_string(){
        var str = "Ime: " + this.ime + "<br>";
        for (var key in this.varijable) {
            str += upcaseFirst(key) + ": " + this[key] + "<br>";
        }
        return str;
	}
    
    ispis_signala(p, koliko) {
        var tablica = "<table> <tr><td>Postrojenje</td><td>Napon</td><td>Dio postrojenja</td><td>Uređaj</td><td>Varijabla</td><td>Stanje</td></tr>";
		
		var uvod = "<td>TS-J</td><td>"+p.napon+"</td><td>"+p.vrsta+"</td><td>" + this.vrsta + "</td>";
		
        tablica += "<tr>" + uvod + "<td>ime</td><td>" + this.ime +"</td></tr>";
		for (var kljuc in this.varijable) {
			if (koliko == "svi_signali") {
                var count = this.varijable[kljuc].length;
                for(var i = 0; i < count; i++) {
                    tablica += "<tr>" + uvod + "<td>" + kljuc.replace(/_/g , " ").trim() +"</td><td>" + this.varijable[kljuc][i] +"</td></tr>";
                }
            } else {
                tablica += "<tr>" + uvod + "<td>" + kljuc.replace(/_/g , " ").trim() +"</td><td>" + this[kljuc] +"</td></tr>";
            }
		}
		tablica = tablica + "</table><br>";
		return tablica;
    }
    
	prikazi_stanje(){
		document.getElementById("elem_stat").innerHTML = this.to_string();
		document.getElementById("elem_stat").style.visibility = "visible";
	}
}

class mjerni_pretvornik {
	constructor(ime, r_snaga, napon) {
		this.ime = ime;
		this.radna_snaga = r_snaga;
		this.napon = napon; 
	}
}

class brojilo extends elementpostrojenja {
	constructor(ime, r_energija, alarm) {
        super(ime, "brojilo");
		this.radna_energija = r_energija;
		this.alarm = alarm;
		this.varijable = {alarm: ["prorada", "prestanak"]};
	}
}

class APU extends elementpostrojenja {
	constructor(ime, onep, threep, blokada){
		super(ime, "APU");
		this.onep = onep;
		this.threep = threep;
		this.blokada = blokada;
		this.varijable = {_1p: ["prorada", "prestanak"], _2p: ["prorada", "prestanak"], blokada: ["prorada", "prestanak"]};
	}
}

class rastavljač extends elementpostrojenja {
	constructor(ime, vrsta, stanje, slika){
        super(ime, vrsta, stanje, slika);
		this.varijable = {stanje: ["međupoložaj", "uključen", "isključen", "kvar signalizacije"]};
	}
}

class rastavljač_linijski extends rastavljač{
	constructor(ime, vrsta, stanje, komanda, slika){
        super(ime, vrsta, stanje, slika);
        this.varijable.komanda =  ["uklop", "isklop"];
		this.komanda = komanda;
	}	
}

class rastavljač_sabirnički extends rastavljač{
	constructor(ime, vrsta, stanje, komanda, slika){
        super(ime, vrsta, stanje, slika);
        this.varijable.komanda =  ["uklop", "isklop"];
		this.komanda = komanda;
	}	
}

class rastavljač_uzemljenja extends rastavljač{
	constructor(ime, vrsta, stanje, slika){
        super(ime, vrsta, stanje, slika);
    }
}

class zaštita extends elementpostrojenja {
	constructor(ime, vrsta){
        super(ime, vrsta);
	}
}

class distantna_zaštita extends zaštita{
	constructor(ime, isklj, lone_pot, ltwo_pot, lthree_pot, zemljospoj_pot, stagetwo_pot, stagethree_pot, tkprijem, tkslanje, osjetljiva_zs){
        super(ime, "distantna zaštita");
		this.isključenje = isklj;
		this.faza_L1_poticaj = lone_pot;
		this.faza_L2_poticaj = ltwo_pot;
		this.faza_L3_poticaj = lthree_pot;
		this.zemljospoj_pot = zemljospoj_pot;
		this._2_stupanj_poticaj = stagetwo_pot;
		this._3_stupanj_poticaj = stagethree_pot;
		this.TK_prijem_signala = tkprijem;
		this.TK_slanje_signala = tkslanje;
		this.osjetljiva_zemljospojna = osjetljiva_zs;
		this.varijable = {isključenje: ["prorada", "prestanak"], faza_L1_poticaj: ["prorada", "prestanak"], faza_L2_poticaj: ["prorada", "prestanak"], faza_L3_poticaj: ["prorada", "prestanak"], zemljospoj_poticaj: ["prorada", "prestanak"], _2_stupanj_poticaj: ["prorada", "prestanak"], _3_stupanj_poticaj: ["prorada", "prestanak"], TK_prijem_signala: ["prorada", "prestanak"], TK_slanje_signala: ["prorada", "prestanak"], osjetljiva_zemljospojna: ["prorada", "prestanak"]};
	}
}

class nadstrujna_zaštita extends zaštita{
	constructor(ime, isklj){
        super(ime, "nadstrujna zaštita");
		this.isključenje = isklj;
		this.varijable = {isključenje: ["prorada", "prestanak"]};
	}
}

class zaštita_zatajenje extends zaštita{
	constructor(ime, prvistup_isklj, drugistup_isklj, rastavljač_kvar, pomocnonap_off, u_testu){
        super(ime, "zaštita zatajenje");
		this._1_stupanj_isključenje = prvistup_isklj;
		this._2_stupanj_isključenje = drugistup_isklj;
		this.rastavljač_kvar = rastavljač_kvar;
		this.pomoćno_napajanje_nestanak = pomocnonap_off;
		this.u_testu = u_testu;
		this.varijable = {_1_stupanj_isključenje: ["prorada", "prestanak"], _2_stupanj_isključenje: ["prorada", "prestanak"], rastavljač_kvar: ["prorada", "prestanak"], pomoćno_napajanje_nestanak: ["prorada", "prestanak"], u_testu: ["prorada", "prestanak"]};
	}
}

class prekidač extends elementpostrojenja {
	constructor(ime, vrsta, stanje, komanda, gubitakSF6_upoz, gubitakN2_blok, mintlak_blok, gubitakSF6_blok, gubitakulja_blok, APU_blok, kvar_grijanja, slika){
        super(ime, vrsta, stanje, slika);
        this.komanda = komanda;
		this.gubitakSF6_upoz = gubitakSF6_upoz;
		this.gubitakN2_blok = gubitakN2_blok;
		this.mintlak_blok = mintlak_blok;
		this.gubitakSF6_blok = gubitakSF6_blok;
		this.gubitakulja_blok = gubitakulja_blok;
		this.APU_blok = APU_blok;
		this.kvar_grijanja = kvar_grijanja;
		this.varijable = {stanje: ["međupoložaj", "uključen", "isključen", "kvar signalizacije"], komanda: ["uklop", "isklop"], gubitakSF6_upoz: ["prorada", "prestanak"], gubitakN2_blok: ["prorada", "prestanak"], mintlak_blok: ["prorada", "prestanak"], gubitakSF6_blok: ["prorada", "prestanak"], gubitakulja_blok: ["prorada", "prestanak"], APU_blok: ["prorada", "prestanak"], kvar_grijanja: ["prorada", "prestanak"]};
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
                lista += this[obj].ispis_signala(this, koliko);
            }
        }
        lista += "</body></html>";
        var opened = window.open("");
        opened.document.write(lista);
    }
    
    poljeUključeno() {}
    
    provjeraZastite(zastita) {
        for (var key in zastita.varijable) {
            if (zastita.varijable[key][0] == "prorada" && zastita[key] == "prorada")
                return 1;
        }
        return 0;
    }
    
    rekur(p, fje, arg, i) {
        setTimeout(function() {
            if (fje[i] == 0)
                p.ugasiElem(arg[i]);
            else 
                p.upaliElem(arg[i]);
            ++i;
            p.poljeUključeno();
            if (i < fje.length) p.rekur(p, fje, arg, i);
        }, i*200);
    }
    
    smije_se_gasiti(predmet_promjene){}
	smije_se_paliti(predmet_promjene){}
    
    ugasiElem(el) {
        if (this.smije_se_gasiti(el)) {
            el.stanje = "isključen";
            if ("komanda" in el) {
                el.komanda = "isklop";
            }
            document.getElementById(el.slika).src = "Slike/"+el.vrsta+"_"+el.stanje+".png";
        }
    }
    
    upaliElem(el) {
        if (this.smije_se_paliti(el)) {
            el.stanje = "uključen";
            if ("komanda" in el) {
                el.komanda = "uklop"; 
            }
            document.getElementById(el.slika).src = "Slike/"+el.vrsta+"_"+el.stanje+".png";
        }
    }
    
    ugasi_polje(){}
    upali_polje(){}
    
    ugasiBotun(btn){
        this.stanje = "isključeno";
        document.getElementById(btn).style.backgroundColor = "#0f0";
        document.getElementById(btn).style.color = "black";
        document.getElementById(btn).innerHTML = "Uključi";
    }
    
    upaliBotun(btn){
        this.stanje = "uključeno";
        document.getElementById(btn).style.backgroundColor = "#f00";
        document.getElementById(btn).style.color = "white";
        document.getElementById(btn).innerHTML = "Isključi";
    }
    
    pali_gasi_polje(tren_btn){
        if (this.stanje == "uključeno") {
            this.ugasiBotun(tren_btn);
            this.ugasi_polje();
        } else {
            this.upaliBotun(tren_btn);
            this.upali_polje();
        }
        this.poljeUključeno();
    }
    
    promijeni_stanje(predmet_promjene){
		if (predmet_promjene.stanje == "uključen") {
			if (this.smije_se_gasiti(predmet_promjene)){
				predmet_promjene.stanje = "isključen";
				if ("komanda" in predmet_promjene) {
					predmet_promjene.komanda = "isklop";
                }
                document.getElementById(predmet_promjene.slika).src = "Slike/"+predmet_promjene.vrsta+"_isključen.png";
			} else {
                err_visible("Nije moguće ugasiti " + predmet_promjene.vrsta, 5);
                return 1; // nešto ne valja
			}
		} else {
			if (this.smije_se_paliti(predmet_promjene)){
				predmet_promjene.stanje = "uključen";
				if ("komanda" in predmet_promjene) {
					predmet_promjene.komanda = "uklop"; 
                }
				document.getElementById(predmet_promjene.slika).src = "Slike/"+predmet_promjene.vrsta+"_uključen.png";
			} else {
                err_visible("Nije moguće upaliti " + predmet_promjene.vrsta, 5);
                return 1; // nešto ne valja
			}
		}
        this.poljeUključeno();
        return 0; // sve 5
	}
}

class dalekovodno_polje extends polje{
	constructor(vrsta, stanje, napon) {
        super(vrsta, stanje, napon);
		this.p1 = new prekidač("Prekidač 1", "prekidač", "uključen", "uklop", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "pdal1");
		this.r1 = new rastavljač_sabirnički("Sabirnički rastavljač 1", "rastavljač", "isključen", "isklop", "rdal1");
		this.r2 = new rastavljač_sabirnički("Sabirnički rastavljač 2", "rastavljač", "uključen", "uklop", "rdal2");
		this.r3 = new rastavljač_linijski("Linijski rastavljač", "rastavljač", "uključen", "uklop", "rdal3");
		this.r6 = new rastavljač_uzemljenja("Rastavljač uzemljenja", "rastavljač", "isključen", "rdal6");
		this.mjerni_pretvornik1 = new mjerni_pretvornik("Mjerni pretvornik", 0, 0);
		this.brojilo1 = new brojilo("Brojilo 1", 0, "prestanak");
		this.APU1 = new APU("APU 1", "prestanak", "prestanak", "prestanak");
		this.zaštita_nadstr = new nadstrujna_zaštita("Zaštita nadstrujna 1", "prestanak");
		this.zaštita_dist = new distantna_zaštita("Zaštita distantna 1", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak");
		this.zaštita_od_zatajenja = new zaštita_zatajenje("Zaštita od zatajenja prekidača 1", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak");
	}
	
    poljeUključeno() {
        if ((this.r1.stanje == "uključen" || this.r2.stanje == "uključen") && this.p1.stanje == "uključen" && this.r3.stanje == "uključen") {
            document.getElementById("stanjeDV").style.backgroundColor = "#0f0";
            this.upaliBotun("btn1");
        } else if (this.r6.stanje == "uključen") {
            document.getElementById("stanjeDV").style.backgroundColor = "#f00";
            this.ugasiBotun("btn1");
        } else {
            document.getElementById("stanjeDV").style.backgroundColor = "#ff0";
        }
    }
    
	smije_se_gasiti(predmet_promjene){
        console.log(predmet_promjene, "gašenje");
        if (predmet_promjene.slika == "rdal6") {
            return this.p1.stanje == "isključen" && this.r1.stanje == "isključen" && this.r2.stanje == "isključen" && this.r3.stanje == "isključen";
        }
        return (predmet_promjene.vrsta == "prekidač") || (this.p1.stanje == "isključen");
	}
	
	smije_se_paliti(predmet_promjene){
        console.log(predmet_promjene, "paljenje");
        if (predmet_promjene.slika == "rdal6") {
            return this.p1.stanje == "isključen" && this.r1.stanje == "isključen" && this.r2.stanje == "isključen" && this.r3.stanje == "isključen";
        }
		if ((predmet_promjene.vrsta == "prekidač") || (this.p1.stanje == "isključen" && this.r1.stanje == "isključen" && this.r2.stanje == "isključen"))
			return this.r6.stanje == "isključen";
        return this.r6.stanje == "isključen" && predmet_promjene == this.r3 && this.p1.stanje == "isključen";
	}
    
    ugasi_polje() {
        if (this.provjeraZastite(this.zaštita_dist) ||
            this.provjeraZastite(this.zaštita_nadstr) ||
            this.provjeraZastite(this.zaštita_od_zatajenja)) {
            err_visible("Zaštita je u proradi i ne može se ugasiti polje", 5);
            return;
        }
        if (this.provjeraZastite(this.p1)) {
            err_visible("Prekidač ne radi te se ne može ugasiti polje", 5);
            return;
        }
        
        this.rekur(this, [0,0,0,0,1], [this.p1, this.r1, this.r2, this.r3, this.r6], 0);
    }
    
    upali_polje() {
        if (this.provjeraZastite(this.zaštita_dist) ||
            this.provjeraZastite(this.zaštita_nadstr) ||
            this.provjeraZastite(this.zaštita_od_zatajenja)) {
            err_visible("Zaštita je u proradi i ne može se upaliti polje", 5);
            return;
        }
        
        if (this.provjeraZastite(this.p1)) {
            err_visible("Prekidač ne radi te se ne može upaliti polje", 5);
            return;
        }

        this.rekur(this, [0,1,1,1], [this.r6, this.r1, this.r3, this.p1], 0);
    }
}

class spojno_polje extends polje{
	constructor(vrsta, stanje, napon) {
        super(vrsta, stanje, napon);
		this.p2 = new prekidač("Prekidač 2", "prekidač", "isključen", "isklop", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "prestanak", "psp1");
		this.r4 = new rastavljač_sabirnički("Sabirnički rastavljač 3", "rastavljač", "uključen", "uklop", "rsp1");
		this.r5 = new rastavljač_sabirnički("Sabirnički rastavljač 4", "rastavljač", "uključen", "uklop", "rsp2");
	}
    
    poljeUključeno() {
        if (this.p2.stanje == "uključen" && this.r4.stanje == "uključen" && this.r5.stanje == "uključen") {
            document.getElementById("stanjeSV").style.backgroundColor = "#0f0";
            this.upaliBotun("btn2");
        } else if (this.p2.stanje == "isključen") {
            document.getElementById("stanjeSV").style.backgroundColor = "#f00";
            this.ugasiBotun("btn2");
        } else {
            document.getElementById("stanjeSV").style.backgroundColor = "#ff0";
        }
    }
    
	smije_se_gasiti(predmet_promjene){
        return (predmet_promjene.vrsta == "prekidač") || (this.p2.stanje != "uključen");
	}
	
	smije_se_paliti(predmet_promjene){
        return (predmet_promjene.vrsta == "prekidač") || (this.p2.stanje == "isključen");
	}
    
    ugasi_polje() {
        this.ugasiElem(this.p2);
    }
    
    upali_polje() {
        this.upaliElem(this.p2);
    }
}

dvp = new dalekovodno_polje("DV_J", "uključeno", 220);
spp = new spojno_polje("SP_J", "isključeno", 220);