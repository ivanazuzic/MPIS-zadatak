class prekidac{
	constructor(ime, komanda, stanje, gubitakSF6_upoz, gubitakN2_blok, mintlak_blok, gubitakSF6_blok, gubitakulja_blok, APU_blok, kvar_grijanja){
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
	}
}

p1 = new prekidac("P1", "uklop", 1, 2, 3, 4, 5, 6, 7, 8);

document.getElementById("test").innerHTML = 
"Stanje prekidaca " + p1.stanje + ", u položaju " + p1.komanda;


class APU{
	constructor(ime, onep, threep, blokada)
	this.ime = ime;
	this.onep = onep;
	this.threep = threep;
	this.blokada = blokada;
	
}

class rastavljac{
	constructor(ime, stanje)
	this.ime = ime;
	this.stanje = stanje;
	
}

class rastavljac_izlazni extends rastavljac{
	constructor(komanda)
	this.komanda = komanda;
	
}

class rastavljac_sabirnicki extends rastavljac{
	constructor(komanda)
	this.komanda = komanda;
	
}

class rastavljac_uzemljenja extends rastavljac{
	constructor()
}

class zastita{
	constructor(ime)
	this.ime = ime;
	
}

class distantna_zastita extends zastita{
	constructor()
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
	
}

class nadstrujna_zastita extends zastita{
	constructor(isklj)
	this.isklj = isklj;
}

class zastita_zatajenje extends zastita{
	constructor(prvistup_isklj, drugistup_isklj, rastavljac_kvar, pomocnonap_off, test)
	this.prvistup_isklj = prvistup_isklj;
	this.drugistup_isklj = drugistup_isklj;
	this.rastavljac_kvar = rastavljac_kvar;
	this.pomocnonap_off = pomocnonap_off;
	this.test = test;
}


